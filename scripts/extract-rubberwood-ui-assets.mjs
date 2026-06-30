import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const REFERENCE = {
  width: 2048,
  height: 2732,
};

const DEFAULT_OUTPUT_ROOT = 'Nguyên liệu/Gỗ tự nhiên/Gỗ cao su';

const crops = [
  {
    folder: '1. Tổng quan vật liệu',
    name: 'ten-thuong-mai-rubberwood.png',
    box: [78, 735, 120, 105],
  },
  {
    folder: '1. Tổng quan vật liệu',
    name: 'nguon-goc-cay-cao-su.png',
    box: [455, 735, 120, 105],
  },
  {
    folder: '1. Tổng quan vật liệu',
    name: 'mau-sac-tu-nhien.png',
    box: [830, 735, 120, 105],
  },
  {
    folder: '1. Tổng quan vật liệu',
    name: 'dac-diem-van-go.png',
    box: [1185, 735, 120, 105],
  },
  {
    folder: '1. Tổng quan vật liệu',
    name: 'kha-nang-gia-cong.png',
    box: [1570, 735, 120, 105],
  },
  {
    folder: '2. Đặc điểm nổi bật',
    name: 'nguon-cung-on-dinh.png',
    box: [95, 925, 165, 145],
  },
  {
    folder: '2. Đặc điểm nổi bật',
    name: 'de-gia-cong.png',
    box: [490, 920, 170, 150],
  },
  {
    folder: '2. Đặc điểm nổi bật',
    name: 'hoan-thien-linh-hoat.png',
    box: [850, 920, 170, 150],
  },
  {
    folder: '2. Đặc điểm nổi bật',
    name: 'mau-sac-sang.png',
    box: [1210, 920, 170, 150],
  },
  {
    folder: '2. Đặc điểm nổi bật',
    name: 'thich-hop-san-xuat-hang-loat.png',
    box: [1555, 920, 190, 150],
  },
  {
    folder: '2. Đặc điểm nổi bật',
    name: 'gia-tri-kinh-te-tot.png',
    box: [1845, 925, 160, 145],
  },
  {
    folder: '3. Ứng dụng trong nội thất',
    name: 'ghe.png',
    box: [75, 1280, 250, 180],
  },
  {
    folder: '3. Ứng dụng trong nội thất',
    name: 'ban.png',
    box: [365, 1280, 270, 180],
  },
  {
    folder: '3. Ứng dụng trong nội thất',
    name: 'tu-luu-tru.png',
    box: [700, 1280, 260, 180],
  },
  {
    folder: '3. Ứng dụng trong nội thất',
    name: 'giuong.png',
    box: [1030, 1280, 270, 180],
  },
  {
    folder: '3. Ứng dụng trong nội thất',
    name: 'cau-kien-noi-that.png',
    box: [1365, 1280, 270, 180],
  },
  {
    folder: '3. Ứng dụng trong nội thất',
    name: 'noi-that-du-an.png',
    box: [1695, 1280, 270, 180],
  },
  {
    folder: '4. Khả năng hoàn thiện bề mặt',
    name: 'stain.png',
    box: [80, 1660, 155, 130],
  },
  {
    folder: '4. Khả năng hoàn thiện bề mặt',
    name: 'natural-finish.png',
    box: [465, 1660, 155, 130],
  },
  {
    folder: '4. Khả năng hoàn thiện bề mặt',
    name: 'lacquer.png',
    box: [850, 1660, 155, 130],
  },
  {
    folder: '4. Khả năng hoàn thiện bề mặt',
    name: 'matte-finish.png',
    box: [1235, 1660, 155, 130],
  },
  {
    folder: '4. Khả năng hoàn thiện bề mặt',
    name: 'color-finish.png',
    box: [1605, 1660, 210, 130],
  },
  {
    folder: '6. Gỗ cao su trong hệ thống cung ứng của ANSLIFE',
    name: 'xuong-san-xuat.png',
    box: [945, 1930, 330, 190],
  },
  {
    folder: '7. Liên kết với các nội dung liên quan',
    name: 'noi-that-hoan-thien.png',
    box: [80, 2285, 210, 125],
  },
  {
    folder: '7. Liên kết với các nội dung liên quan',
    name: 'cau-kien-noi-that.png',
    box: [530, 2285, 210, 125],
  },
  {
    folder: '7. Liên kết với các nội dung liên quan',
    name: 'son-hoan-thien-be-mat.png',
    box: [1025, 2285, 210, 125],
  },
  {
    folder: '7. Liên kết với các nội dung liên quan',
    name: 'kiem-soat-do-am.png',
    box: [1525, 2285, 210, 125],
  },
  {
    folder: '8. Trao đổi về vật liệu gỗ cao su cho dự án của bạn',
    name: 'ghe-minh-hoa.png',
    box: [65, 2490, 330, 215],
  },
  {
    folder: '8. Trao đổi về vật liệu gỗ cao su cho dự án của bạn',
    name: 'ban-ve-du-an.png',
    box: [1625, 2490, 360, 215],
  },
];

function usage() {
  console.log(`Usage:
  node scripts/extract-rubberwood-ui-assets.mjs <input-image> [output-root]

Example:
  node scripts/extract-rubberwood-ui-assets.mjs ~/Downloads/go-cao-su-fullpage.png

Default output root:
  ${DEFAULT_OUTPUT_ROOT}
`);
}

function scaleBox([x, y, width, height], imageWidth, imageHeight) {
  const sx = imageWidth / REFERENCE.width;
  const sy = imageHeight / REFERENCE.height;

  return {
    left: Math.max(0, Math.round(x * sx)),
    top: Math.max(0, Math.round(y * sy)),
    width: Math.max(1, Math.round(width * sx)),
    height: Math.max(1, Math.round(height * sy)),
  };
}

async function removeLightBackground(inputBuffer) {
  const image = sharp(inputBuffer).ensureAlpha();
  const { width = 0, height = 0 } = await image.metadata();
  const raw = await image.raw().toBuffer();
  const channels = 4;

  const borderPixels = [];
  const pushPixel = (x, y) => {
    const index = (y * width + x) * channels;
    borderPixels.push([raw[index], raw[index + 1], raw[index + 2]]);
  };

  for (let x = 0; x < width; x += Math.max(1, Math.floor(width / 40))) {
    pushPixel(x, 0);
    pushPixel(x, height - 1);
  }
  for (let y = 0; y < height; y += Math.max(1, Math.floor(height / 40))) {
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

    if ((distance < 52 && brightness > 196) || (brightness > 232 && chroma < 32)) {
      raw[i + 3] = 0;
    } else if (distance < 78 && brightness > 180) {
      raw[i + 3] = Math.min(raw[i + 3], Math.round(((distance - 52) / 26) * 255));
    }
  }

  return sharp(raw, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function processCrop(input, outputRoot, crop, imageWidth, imageHeight) {
  const outputDir = path.join(outputRoot, crop.folder);
  await fs.mkdir(outputDir, { recursive: true });

  const box = scaleBox(crop.box, imageWidth, imageHeight);
  const cropped = await sharp(input)
    .extract(box)
    .resize({ width: box.width * 2, kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.8, m1: 1.1, m2: 1.6 })
    .png()
    .toBuffer();

  const transparent = await removeLightBackground(cropped);
  await fs.writeFile(path.join(outputDir, crop.name), transparent);
}

async function main() {
  const input = process.argv[2];
  const outputRoot = process.argv[3] ?? DEFAULT_OUTPUT_ROOT;

  if (!input || input === '--help' || input === '-h') {
    usage();
    process.exit(input ? 0 : 1);
  }

  const metadata = await sharp(input).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error(`Cannot read image dimensions: ${input}`);
  }

  for (const crop of crops) {
    await processCrop(input, outputRoot, crop, metadata.width, metadata.height);
  }

  console.log(`Done. Exported ${crops.length} PNG assets to: ${outputRoot}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
