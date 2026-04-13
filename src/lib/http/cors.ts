const DEFAULT_ALLOWED_ORIGINS = [
  'https://anslife.net',
  'https://www.anslife.net',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

function normalizeOrigin(value: string): string {
  return value.trim().replace(/\/$/, '');
}

function getAllowedOrigins(): Set<string> {
  const configuredOrigins = (process.env.CORS_ALLOW_ORIGINS ?? '')
    .split(',')
    .map((item) => normalizeOrigin(item))
    .filter(Boolean);

  const allOrigins = configuredOrigins.length > 0
    ? configuredOrigins
    : DEFAULT_ALLOWED_ORIGINS;

  return new Set(allOrigins);
}

export function getCorsHeaders(
  requestOrigin: string | null,
  methods: string,
): HeadersInit {
  if (!requestOrigin) {
    return {
      'Access-Control-Allow-Methods': methods,
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      Vary: 'Origin',
    };
  }

  const normalizedOrigin = normalizeOrigin(requestOrigin);
  const allowedOrigins = getAllowedOrigins();
  if (!allowedOrigins.has(normalizedOrigin)) {
    return {
      'Access-Control-Allow-Methods': methods,
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      Vary: 'Origin',
    };
  }

  return {
    'Access-Control-Allow-Origin': normalizedOrigin,
    'Access-Control-Allow-Methods': methods,
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}
