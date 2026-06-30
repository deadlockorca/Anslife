import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

function usage() {
  console.log(`Usage:
  node scripts/clean-cropped-assets.mjs <input-file-or-folder> [output-folder]

Examples:
  node scripts/clean-cropped-assets.mjs "Nguyên liệu/Gỗ tự nhiên/Gỗ cao su/3. Ứng dụng trong nội thất/raw"
  node scripts/clean-cropped-assets.mjs input.png output

Behavior:
  - Sharpens lightly.
  - Preserves original colors.
  - Removes light/cream paper backgrounds into alpha PNG.
  - Does not overwrite originals. Output files get "-clean.png".
`);
}

function isImage(filePath) {
  return IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

async function collectImages(inputPath) {
  const stat = await fs.stat(inputPath);

  if (stat.isFile()) {
    return isImage(inputPath) ? [inputPath] : [];
  }

  const entries = await fs.readdir(inputPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(inputPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectImages(fullPath)));
    } else if (entry.isFile() && isImage(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
}

function outputPathFor(inputFile, inputRoot, outputRoot) {
  const parsed = path.parse(inputFile);
  const cleanName = `${parsed.name}-clean.png`;

  if (!outputRoot) {
    return path.join(parsed.dir, cleanName);
  }

  const relativeDir = path.relative(inputRoot, parsed.dir);
  return path.join(outputRoot, relativeDir, cleanName);
}

async function removeLightBackground(inputBuffer) {
  const image = sharp(inputBuffer).ensureAlpha();
  const { width = 0, height = 0 } = await image.metadata();
  const raw = await image.raw().toBuffer();
  const channels = 4;

  const borderPixels = [];
  const stepX = Math.max(1, Math.floor(width / 56));
  const stepY = Math.max(1, Math.floor(height / 56));

  const pushPixel = (x, y) => {
    const index = (y * width + x) * channels;
    borderPixels.push([raw[index], raw[index + 1], raw[index + 2]]);
  };

  for (let x = 0; x < width; x += stepX) {
    pushPixel(x, 0);
    pushPixel(x, height - 1);
  }

  for (let y = 0; y < height; y += stepY) {
    pushPixel(0, y);
    pushPixel(width - 1, y);
  }

  const bg = [0, 1, 2].map((channel) => {
    const values = borderPixels.map((pixel) => pixel[channel]).sort((a, b) => a - b);
    return values[Math.floor(values.length / 2)] ?? 245;
  });

  for (let i = 0; i < raw.length; i += channels) {
    const r = raw[i];
    const g = raw[i + 1];
    const b = raw[i + 2];
    const distance = Math.hypot(r - bg[0], g - bg[1], b - bg[2]);
    const brightness = (r + g + b) / 3;
    const chroma = Math.max(r, g, b) - Math.min(r, g, b);

    if ((distance < 54 && brightness > 194) || (brightness > 232 && chroma < 34)) {
      raw[i + 3] = 0;
    } else if (distance < 82 && brightness > 178) {
      raw[i + 3] = Math.min(raw[i + 3], Math.round(((distance - 54) / 28) * 255));
    }
  }

  return sharp(raw, { raw: { width, height, channels } })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 8 })
    .extend({
      top: 8,
      right: 8,
      bottom: 8,
      left: 8,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function cleanImage(inputFile, inputRoot, outputRoot) {
  const outputFile = outputPathFor(inputFile, inputRoot, outputRoot);
  await fs.mkdir(path.dirname(outputFile), { recursive: true });

  const base = sharp(inputFile).rotate();
  const metadata = await base.metadata();
  const width = metadata.width ?? 0;

  const sharpened = await base
    .resize({
      width: width > 0 && width < 900 ? width * 2 : undefined,
      withoutEnlargement: false,
      kernel: sharp.kernel.lanczos3,
    })
    .modulate({ brightness: 1, saturation: 1 })
    .sharpen({ sigma: 0.75, m1: 1.05, m2: 1.45 })
    .png()
    .toBuffer();

  const cleaned = await removeLightBackground(sharpened);
  await fs.writeFile(outputFile, cleaned);
  return outputFile;
}

async function main() {
  const input = process.argv[2];
  const output = process.argv[3];

  if (!input || input === '-h' || input === '--help') {
    usage();
    process.exit(input ? 0 : 1);
  }

  const inputStat = await fs.stat(input);
  const inputRoot = inputStat.isDirectory() ? input : path.dirname(input);
  const images = await collectImages(input);

  if (images.length === 0) {
    console.log(`No images found: ${input}`);
    return;
  }

  const outputs = [];
  for (const image of images) {
    outputs.push(await cleanImage(image, inputRoot, output));
  }

  console.log(`Done. Cleaned ${outputs.length} image(s).`);
  for (const file of outputs) {
    console.log(file);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
