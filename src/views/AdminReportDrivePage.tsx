import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminModuleTabs from '../components/admin/AdminModuleTabs';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import useSiteI18n from '../hooks/useSiteI18n';
import {
  getCurrentUser,
  getInternalReportDriveFileContentUrl,
  getInternalReportDriveFolder,
  getInternalReportDriveTablePreview,
  isAdminManager,
  logoutInternal,
  type AuthUser,
  type InternalDrivePortalFolder,
  type InternalDrivePortalItem,
  type InternalDriveTablePreview,
} from '../lib/internalAuth';

interface BreadcrumbItem {
  id: string;
  name: string;
}

function formatDate(dateString: string | null): string {
  if (!dateString) {
    return '-';
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

function formatFileSize(value: string | null): string {
  const bytes = Number(value);
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '-';
  }

  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function getFileBadge(item: InternalDrivePortalItem): string {
  if (item.kind === 'folder') {
    return 'DIR';
  }
  if (item.mimeType === 'application/pdf') {
    return 'PDF';
  }
  if (item.mimeType.startsWith('image/')) {
    return 'IMG';
  }
  if (item.mimeType.includes('spreadsheet')) {
    return 'XLS';
  }
  if (item.mimeType.includes('document')) {
    return 'DOC';
  }
  if (item.mimeType.includes('presentation')) {
    return 'PPT';
  }
  return 'FILE';
}

function isImageFile(item: InternalDrivePortalItem): boolean {
  return item.mimeType.startsWith('image/');
}

function isSpreadsheetFile(item: InternalDrivePortalItem): boolean {
  const filename = item.name.toLowerCase();
  return (
    item.mimeType === 'application/vnd.google-apps.spreadsheet' ||
    item.mimeType === 'application/vnd.ms-excel' ||
    item.mimeType === 'application/vnd.ms-excel.sheet.macroEnabled.12' ||
    item.mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    filename.endsWith('.xlsx') ||
    filename.endsWith('.xls') ||
    filename.endsWith('.xlsm') ||
    filename.endsWith('.csv')
  );
}

export default function AdminReportDrivePage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const loginPath = useMemo(
    () =>
      toLocalizedPath(
        `/admin/login?next=${encodeURIComponent(`/admin/report-data${location.search}`)}`,
      ),
    [location.search, toLocalizedPath],
  );

  const initialFolderId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('folder_id')?.trim() || null;
  }, [location.search]);

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);
  const [folder, setFolder] = useState<InternalDrivePortalFolder | null>(null);
  const [items, setItems] = useState<InternalDrivePortalItem[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState<InternalDrivePortalItem | null>(null);
  const [tablePreview, setTablePreview] = useState<InternalDriveTablePreview | null>(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableError, setTableError] = useState('');

  const selectedContentUrl = selectedItem
    ? getInternalReportDriveFileContentUrl(selectedItem.id)
    : '';

  const loadFolder = useCallback(
    async (folderId?: string | null, nextBreadcrumbs?: BreadcrumbItem[]) => {
      setLoading(true);
      setError('');
      try {
        const listing = await getInternalReportDriveFolder(folderId);
        setFolder(listing.folder);
        setItems(listing.items);
        setSelectedItem(null);
        setTablePreview(null);
        setTableError('');
        setBreadcrumbs(
          nextBreadcrumbs ?? [
            {
              id: listing.folder.id,
              name: folderId ? listing.folder.name : 'Dữ liệu báo cáo',
            },
          ],
        );
      } catch (loadError) {
        const message =
          loadError instanceof Error ? loadError.message : t('Không thể tải dữ liệu báo cáo.');
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [t],
  );

  useEffect(() => {
    let isMounted = true;

    async function bootstrapPage() {
      try {
        const currentUser = await getCurrentUser();
        if (!isMounted) {
          return;
        }

        if (!currentUser) {
          navigate(loginPath, { replace: true });
          return;
        }

        if (!isAdminManager(currentUser)) {
          setActor(currentUser);
          setError(t('Bạn không có quyền xem dữ liệu báo cáo.'));
          return;
        }

        setActor(currentUser);
        await loadFolder(initialFolderId);
      } catch (bootstrapError) {
        if (!isMounted) {
          return;
        }

        const message =
          bootstrapError instanceof Error
            ? bootstrapError.message
            : t('Không thể kiểm tra quyền truy cập.');
        setError(message);
      } finally {
        if (isMounted) {
          setAuthChecking(false);
        }
      }
    }

    void bootstrapPage();
    return () => {
      isMounted = false;
    };
  }, [initialFolderId, loadFolder, loginPath, navigate, t]);

  const loadTablePreview = useCallback(
    async (item: InternalDrivePortalItem, sheetName?: string | null) => {
      setTableLoading(true);
      setTableError('');
      try {
        const preview = await getInternalReportDriveTablePreview(item.id, sheetName);
        setTablePreview(preview);
      } catch (previewError) {
        const message =
          previewError instanceof Error
            ? previewError.message
            : t('Không thể xem trước bảng tính.');
        setTableError(message);
        setTablePreview(null);
      } finally {
        setTableLoading(false);
      }
    },
    [t],
  );

  useEffect(() => {
    if (!selectedItem || !isSpreadsheetFile(selectedItem)) {
      setTablePreview(null);
      setTableError('');
      setTableLoading(false);
      return;
    }

    void loadTablePreview(selectedItem);
  }, [loadTablePreview, selectedItem]);

  async function handleLogout() {
    try {
      await logoutInternal();
    } catch {
      // no-op
    } finally {
      navigate(loginPath, { replace: true });
    }
  }

  function handleOpenFolder(item: InternalDrivePortalItem) {
    const nextBreadcrumbs = [
      ...breadcrumbs,
      {
        id: item.id,
        name: item.name,
      },
    ];
    void loadFolder(item.id, nextBreadcrumbs);
  }

  function handleOpenBreadcrumb(index: number) {
    const target = breadcrumbs[index];
    if (!target) {
      return;
    }
    void loadFolder(target.id, breadcrumbs.slice(0, index + 1));
  }

  if (authChecking) {
    return <LoadingBlock label={t('Đang kiểm tra đăng nhập...')} />;
  }

  return (
    <main className="drive-portal-page">
      <Seo
        title="ANSLIFE Work Report Drive"
        description="Cổng xem dữ liệu báo cáo công việc Google Drive của ANSLIFE."
      />

      <section className="drive-portal-shell">
        <header className="drive-portal-header">
          <div>
            <p className="drive-portal-eyebrow">ANSLIFE ADMIN PORTAL</p>
            <h1>Dữ liệu báo cáo</h1>
            <p>Xem trực tiếp thư mục ảnh và tài liệu báo cáo công việc trên Google Drive.</p>
          </div>
          <div className="drive-portal-user">
            <span>{actor?.fullName || actor?.email}</span>
            <button type="button" onClick={handleLogout}>
              Đăng xuất
            </button>
          </div>
        </header>

        <AdminModuleTabs actor={actor} />

        {error ? <ErrorBlock message={error} /> : null}

        <div className="drive-portal-toolbar">
          <nav className="drive-portal-breadcrumbs" aria-label="Drive breadcrumb">
            <button type="button" onClick={() => void loadFolder(null)}>
              Dữ liệu báo cáo
            </button>
            {breadcrumbs.map((breadcrumb, index) => (
              <button
                key={`${breadcrumb.id}-${index}`}
                type="button"
                disabled={index === breadcrumbs.length - 1}
                onClick={() => handleOpenBreadcrumb(index)}
              >
                {breadcrumb.name}
              </button>
            ))}
          </nav>
          <button type="button" onClick={() => void loadFolder(folder?.id ?? null, breadcrumbs)}>
            Làm mới
          </button>
        </div>

        <div className="drive-portal-layout">
          <section className="drive-portal-file-panel" aria-label="Danh sách file báo cáo">
            <div className="drive-portal-panel-heading">
              <h2>{folder?.name ?? 'Google Drive'}</h2>
              <span>{items.length} mục</span>
            </div>

            {loading ? (
              <LoadingBlock label={t('Đang tải dữ liệu...')} />
            ) : (
              <div className="drive-portal-file-list">
                {items.length === 0 ? (
                  <p className="drive-portal-empty">Thư mục này chưa có tài liệu.</p>
                ) : (
                  items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`drive-portal-file-row ${
                        selectedItem?.id === item.id ? 'is-selected' : ''
                      }`}
                      onClick={() => {
                        if (item.kind === 'folder') {
                          handleOpenFolder(item);
                        } else {
                          setSelectedItem(item);
                          setTablePreview(null);
                          setTableError('');
                        }
                      }}
                    >
                      <span className={`drive-portal-file-badge is-${item.kind}`}>
                        {getFileBadge(item)}
                      </span>
                      <span className="drive-portal-file-main">
                        <strong>{item.name}</strong>
                        <small>{item.kind === 'folder' ? 'Thư mục' : item.mimeType}</small>
                      </span>
                      <span>{formatFileSize(item.size)}</span>
                      <span>{formatDate(item.modifiedTime)}</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </section>

          <aside className="drive-portal-preview-panel" aria-label="Xem trước file báo cáo">
            {selectedItem ? (
              <>
                <div className="drive-portal-preview-heading">
                  <div>
                    <span className="drive-portal-file-badge is-file">
                      {getFileBadge(selectedItem)}
                    </span>
                    <h2>{selectedItem.name}</h2>
                  </div>
                  <a
                    href={getInternalReportDriveFileContentUrl(selectedItem.id, true)}
                    className="drive-portal-download-link"
                  >
                    Tải xuống
                  </a>
                </div>

                {isSpreadsheetFile(selectedItem) ? (
                  <div className="drive-portal-table-preview">
                    <div className="drive-portal-table-toolbar">
                      <div>
                        <strong>{tablePreview?.sheetName ?? 'Bảng tính'}</strong>
                        {tablePreview?.truncated ? (
                          <small>
                            Đang hiển thị tối đa {tablePreview.maxRows} dòng và{' '}
                            {tablePreview.maxColumns} cột.
                          </small>
                        ) : null}
                      </div>
                      {tablePreview && tablePreview.sheetNames.length > 1 ? (
                        <select
                          value={tablePreview.sheetName}
                          onChange={(event) =>
                            void loadTablePreview(selectedItem, event.target.value)
                          }
                        >
                          {tablePreview.sheetNames.map((sheetName) => (
                            <option key={sheetName} value={sheetName}>
                              {sheetName}
                            </option>
                          ))}
                        </select>
                      ) : null}
                    </div>

                    {tableLoading ? (
                      <LoadingBlock label={t('Đang đọc bảng tính...')} />
                    ) : tableError ? (
                      <ErrorBlock message={tableError} />
                    ) : tablePreview && tablePreview.rows.length > 0 ? (
                      <div className="drive-portal-table-scroll">
                        <table>
                          <tbody>
                            {tablePreview.rows.map((row, rowIndex) => (
                              <tr key={`${tablePreview.sheetName}-${rowIndex}`}>
                                {row.map((cell, cellIndex) =>
                                  rowIndex === 0 ? (
                                    <th key={`${rowIndex}-${cellIndex}`}>{cell}</th>
                                  ) : (
                                    <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                                  ),
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="drive-portal-preview-empty">
                        <p>Sheet này chưa có dữ liệu để xem trước.</p>
                      </div>
                    )}
                  </div>
                ) : selectedItem.canPreview ? (
                  <div className="drive-portal-preview-frame">
                    {isImageFile(selectedItem) ? (
                      <img src={selectedContentUrl} alt={selectedItem.name} />
                    ) : (
                      <iframe title={selectedItem.name} src={selectedContentUrl} />
                    )}
                  </div>
                ) : (
                  <div className="drive-portal-preview-empty">
                    <p>File này chưa hỗ trợ xem trực tiếp trên web.</p>
                    <a href={getInternalReportDriveFileContentUrl(selectedItem.id, true)}>
                      Tải file để xem
                    </a>
                  </div>
                )}
              </>
            ) : (
              <div className="drive-portal-preview-empty">
                <p>Chọn một file để xem trước nội dung.</p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
