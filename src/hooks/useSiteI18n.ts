import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getLanguageFromPath,
  getPreferredLanguage,
  withLanguagePath,
} from '../i18n/language';
import { translateText } from '../i18n/translations';

export default function useSiteI18n() {
  const location = useLocation();
  const language = getLanguageFromPath(location.pathname) ?? getPreferredLanguage();

  const t = useCallback(
    (text: string) => translateText(language, text),
    [language],
  );
  const toLocalizedPath = useCallback(
    (path: string) => withLanguagePath(path, language),
    [language],
  );

  return { language, t, toLocalizedPath };
}
