export const LANGUAGE_CODES = ['vn', 'en', 'jp', 'kr', 'sv', 'fr', 'ru', 'es', 'zh'] as const;
export type LanguageCode = (typeof LANGUAGE_CODES)[number];

export const LANGUAGE_STORAGE_KEY = 'anslife_selected_language';
export const LANGUAGE_SELECTOR_STORAGE_KEY = 'anslife_language_selector';
export const DEFAULT_LANGUAGE: LanguageCode = 'en';

export function isLanguageCode(value: string | null | undefined): value is LanguageCode {
  if (!value) {
    return false;
  }

  return LANGUAGE_CODES.includes(value as LanguageCode);
}

export function getLanguageFromPath(pathname: string): LanguageCode | null {
  const segment = pathname.split('/').filter(Boolean)[0] ?? '';
  return isLanguageCode(segment) ? segment : null;
}

export function getStoredLanguage(): LanguageCode | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (isLanguageCode(saved)) {
    return saved;
  }

  const selected = window.localStorage.getItem(LANGUAGE_SELECTOR_STORAGE_KEY);
  return isLanguageCode(selected) ? selected : null;
}

export function getPreferredLanguage(): LanguageCode {
  return getStoredLanguage() ?? DEFAULT_LANGUAGE;
}

export function withLanguagePath(path: string, language: LanguageCode): string {
  if (/^(https?:\/\/|mailto:|tel:)/i.test(path) || path.startsWith('#')) {
    return path;
  }

  const [pathAndQuery, hashFragment = ''] = path.split('#');
  const [rawPathname, queryString = ''] = pathAndQuery.split('?');
  const normalizedPathname = rawPathname.startsWith('/')
    ? rawPathname
    : `/${rawPathname}`;

  const segments = normalizedPathname.split('/').filter(Boolean);
  const hasLanguagePrefix = isLanguageCode(segments[0]);
  const withoutLanguagePrefix = hasLanguagePrefix
    ? `/${segments.slice(1).join('/')}`
    : normalizedPathname;
  const cleanedPathname =
    withoutLanguagePrefix === '/' ? '' : withoutLanguagePrefix;

  return `/${language}${cleanedPathname}${queryString ? `?${queryString}` : ''}${
    hashFragment ? `#${hashFragment}` : ''
  }`;
}
