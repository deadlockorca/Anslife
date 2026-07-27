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
const RecruitmentPage = lazy(() => import('./views/RecruitmentPage'));
const SearchPage = lazy(() => import('./views/SearchPage'));
const DrivePortalPage = lazy(() => import('./views/DrivePortalPage'));
const AdminLoginPage = lazy(() => import('./views/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./views/AdminDashboardPage'));
const AdminUsersPage = lazy(() => import('./views/AdminUsersPage'));
const AdminAuditLogsPage = lazy(() => import('./views/AdminAuditLogsPage'));
const AdminAttendancePage = lazy(() => import('./views/AdminAttendancePage'));
const AdminRecruitmentPage = lazy(() => import('./views/AdminRecruitmentPage'));
const AdminDriveProjectsPage = lazy(() => import('./views/AdminDriveProjectsPage'));
const AdminReportDrivePage = lazy(() => import('./views/AdminReportDrivePage'));
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
              path={trimLeadingSlash(`${STATIC_PAGE_MAP.about.path}/what-we-do`)}
              element={<Navigate to={`/${language}/about-anslife/development-history`} replace />}
            />
            <Route
              path={trimLeadingSlash(`${STATIC_PAGE_MAP.about.path}/:sectionId`)}
              element={<CmsSubSectionPage config={STATIC_PAGE_MAP.about} />}
            />
            <Route
              path={trimLeadingSlash(STATIC_PAGE_MAP.productSolutions.path)}
              element={<CmsSectionPage config={STATIC_PAGE_MAP.productSolutions} />}
            />
            <Route
              path={trimLeadingSlash(`${STATIC_PAGE_MAP.productSolutions.path}/:sectionId`)}
              element={<CmsSubSectionPage config={STATIC_PAGE_MAP.productSolutions} />}
            />
            <Route
              path={trimLeadingSlash(`${STATIC_PAGE_MAP.productSolutions.path}/:sectionId/*`)}
              element={<CmsSubSectionPage config={STATIC_PAGE_MAP.productSolutions} />}
            />
            <Route
              path={trimLeadingSlash(STATIC_PAGE_MAP.materials.path)}
              element={<CmsSectionPage config={STATIC_PAGE_MAP.materials} />}
            />
            <Route
              path={trimLeadingSlash(`${STATIC_PAGE_MAP.materials.path}/:sectionId`)}
              element={<CmsSubSectionPage config={STATIC_PAGE_MAP.materials} />}
            />
            <Route
              path={trimLeadingSlash(`${STATIC_PAGE_MAP.materials.path}/:sectionId/*`)}
              element={<CmsSubSectionPage config={STATIC_PAGE_MAP.materials} />}
            />
            <Route
              path={trimLeadingSlash(STATIC_PAGE_MAP.manufacturing.path)}
              element={<CmsSectionPage config={STATIC_PAGE_MAP.manufacturing} />}
            />
            <Route
              path={trimLeadingSlash(`${STATIC_PAGE_MAP.manufacturing.path}/:sectionId`)}
              element={<CmsSubSectionPage config={STATIC_PAGE_MAP.manufacturing} />}
            />
            <Route
              path={trimLeadingSlash(`${STATIC_PAGE_MAP.manufacturing.path}/:sectionId/*`)}
              element={<CmsSubSectionPage config={STATIC_PAGE_MAP.manufacturing} />}
            />
            <Route
              path={trimLeadingSlash(STATIC_PAGE_MAP.supplyHub.path)}
              element={<CmsSectionPage config={STATIC_PAGE_MAP.supplyHub} />}
            />
            <Route
              path={trimLeadingSlash(`${STATIC_PAGE_MAP.supplyHub.path}/:sectionId`)}
              element={<CmsSubSectionPage config={STATIC_PAGE_MAP.supplyHub} />}
            />
            <Route
              path={trimLeadingSlash(`${STATIC_PAGE_MAP.supplyHub.path}/:sectionId/*`)}
              element={<CmsSubSectionPage config={STATIC_PAGE_MAP.supplyHub} />}
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
            <Route
              path={trimLeadingSlash(STATIC_PAGE_MAP.resources.path)}
              element={<CmsSectionPage config={STATIC_PAGE_MAP.resources} />}
            />
            <Route
              path={trimLeadingSlash(`${STATIC_PAGE_MAP.resources.path}/:sectionId`)}
              element={<CmsSubSectionPage config={STATIC_PAGE_MAP.resources} />}
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
            <Route path="search" element={<SearchPage />} />
            <Route path="recruitment" element={<RecruitmentPage />} />
            <Route path="portal/drive" element={<DrivePortalPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="contact/:section" element={<ContactPage />} />
            <Route path="admin/login" element={<AdminLoginPage />} />
            <Route path="admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="admin/users" element={<AdminUsersPage />} />
            <Route path="admin/audit-logs" element={<AdminAuditLogsPage />} />
            <Route path="admin/attendance" element={<AdminAttendancePage />} />
            <Route path="admin/report-data" element={<AdminReportDrivePage />} />
            <Route path="admin/recruitment" element={<AdminRecruitmentPage />} />
            <Route path="admin/drive-projects" element={<AdminDriveProjectsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        ))}

        <Route path="*" element={<LegacyPathRedirect />} />
      </Routes>
    </Suspense>
  );
}
