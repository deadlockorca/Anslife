import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LoadingBlock from './components/common/LoadingBlock';
import SiteLayout from './components/layout/SiteLayout';
import { STATIC_PAGE_MAP } from './config/site';
import {
  getPreferredLanguage,
  LANGUAGE_CODES,
  withLanguagePath,
} from './i18n/language';

const HomePage = lazy(() => import('./views/HomePage'));
const CmsSectionPage = lazy(() => import('./views/CmsSectionPage'));
const CmsSubSectionPage = lazy(() => import('./views/CmsSubSectionPage'));
const ProductsPage = lazy(() => import('./views/ProductsPage'));
const ProductDetailPage = lazy(() => import('./views/ProductDetailPage'));
const ProjectsPage = lazy(() => import('./views/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./views/ProjectDetailPage'));
const NewsPage = lazy(() => import('./views/NewsPage'));
const NewsDetailPage = lazy(() => import('./views/NewsDetailPage'));
const ContactPage = lazy(() => import('./views/ContactPage'));
const NotFoundPage = lazy(() => import('./views/NotFoundPage'));

function trimLeadingSlash(path: string): string {
  return path.replace(/^\//, '');
}

function RootLanguageRedirect() {
  const preferredLanguage = getPreferredLanguage();
  return <Navigate to={`/${preferredLanguage}`} replace />;
}

function LegacyPathRedirect() {
  const location = useLocation();
  const preferredLanguage = getPreferredLanguage();
  const targetPath = withLanguagePath(
    `${location.pathname}${location.search}${location.hash}`,
    preferredLanguage,
  );

  return <Navigate to={targetPath} replace />;
}

export default function App() {
  return (
    <Suspense fallback={<LoadingBlock />}>
      <Routes>
        <Route path="/" element={<RootLanguageRedirect />} />
        <Route path="/vi" element={<Navigate to="/vn" replace />} />
        <Route path="/vi/*" element={<Navigate to="/vn" replace />} />

        {LANGUAGE_CODES.map((language) => (
          <Route key={language} path={`/${language}`} element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route
              path={trimLeadingSlash(STATIC_PAGE_MAP.about.path)}
              element={<CmsSectionPage config={STATIC_PAGE_MAP.about} />}
            />
            <Route
              path={trimLeadingSlash(`${STATIC_PAGE_MAP.about.path}/:sectionId`)}
              element={<CmsSubSectionPage config={STATIC_PAGE_MAP.about} />}
            />
            <Route
              path={trimLeadingSlash(STATIC_PAGE_MAP.ecosystem.path)}
              element={<CmsSectionPage config={STATIC_PAGE_MAP.ecosystem} />}
            />
            <Route
              path={trimLeadingSlash(`${STATIC_PAGE_MAP.ecosystem.path}/:sectionId`)}
              element={<CmsSubSectionPage config={STATIC_PAGE_MAP.ecosystem} />}
            />
            <Route
              path={trimLeadingSlash(STATIC_PAGE_MAP.quality.path)}
              element={<CmsSectionPage config={STATIC_PAGE_MAP.quality} />}
            />
            <Route
              path={trimLeadingSlash(`${STATIC_PAGE_MAP.quality.path}/:sectionId`)}
              element={<CmsSubSectionPage config={STATIC_PAGE_MAP.quality} />}
            />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/category/:category" element={<ProductsPage />} />
            <Route path="products/:slug" element={<ProductDetailPage />} />
            <Route
              path="products/:category/:slug"
              element={<ProductDetailPage />}
            />
            <Route
              path={trimLeadingSlash(STATIC_PAGE_MAP.commercial.path)}
              element={<CmsSectionPage config={STATIC_PAGE_MAP.commercial} />}
            />
            <Route
              path={trimLeadingSlash(`${STATIC_PAGE_MAP.commercial.path}/:sectionId`)}
              element={<CmsSubSectionPage config={STATIC_PAGE_MAP.commercial} />}
            />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/type/:type" element={<ProjectsPage />} />
            <Route path="projects/:slug" element={<ProjectDetailPage />} />
            <Route
              path={trimLeadingSlash(STATIC_PAGE_MAP.global.path)}
              element={<CmsSectionPage config={STATIC_PAGE_MAP.global} />}
            />
            <Route
              path={trimLeadingSlash(`${STATIC_PAGE_MAP.global.path}/:sectionId`)}
              element={<CmsSubSectionPage config={STATIC_PAGE_MAP.global} />}
            />
            <Route
              path={trimLeadingSlash(STATIC_PAGE_MAP.scholarship.path)}
              element={<CmsSectionPage config={STATIC_PAGE_MAP.scholarship} />}
            />
            <Route
              path={trimLeadingSlash(`${STATIC_PAGE_MAP.scholarship.path}/:sectionId`)}
              element={<CmsSubSectionPage config={STATIC_PAGE_MAP.scholarship} />}
            />
            <Route path="news" element={<NewsPage />} />
            <Route path="news/category/:category" element={<NewsPage />} />
            <Route path="news/:slug" element={<NewsDetailPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="contact/:section" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        ))}

        <Route path="*" element={<LegacyPathRedirect />} />
      </Routes>
    </Suspense>
  );
}
