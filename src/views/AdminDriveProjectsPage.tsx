import type { FormEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminModuleTabs from '../components/admin/AdminModuleTabs';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import useSiteI18n from '../hooks/useSiteI18n';
import {
  createInternalDriveProject,
  getCurrentUser,
  grantInternalDriveProjectMember,
  isAdminManager,
  listInternalDriveProjectsForAdmin,
  listInternalUsers,
  logoutInternal,
  revokeInternalDriveProjectMember,
  updateInternalDriveProject,
  type AuthUser,
  type InternalDriveProjectAdmin,
  type UserProfile,
} from '../lib/internalAuth';

interface ProjectFormState {
  projectId: number | null;
  name: string;
  driveFolderValue: string;
  description: string;
  isActive: boolean;
}

interface GrantDraftState {
  userId: string;
  canView: boolean;
  canDownload: boolean;
}

type FormState =
  | { status: 'idle'; message: '' }
  | { status: 'loading'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

const idleFormState: FormState = { status: 'idle', message: '' };

const defaultProjectForm: ProjectFormState = {
  projectId: null,
  name: '',
  driveFolderValue: '',
  description: '',
  isActive: true,
};

const defaultGrantDraft: GrantDraftState = {
  userId: '',
  canView: true,
  canDownload: true,
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

function getProjectUserOptions(
  users: UserProfile[],
  project: InternalDriveProjectAdmin,
): UserProfile[] {
  const grantedUserIds = new Set(project.members.map((member) => member.userId));
  return users.filter((user) => user.isActive && !grantedUserIds.has(user.id));
}

export default function AdminDriveProjectsPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const loginPath = useMemo(
    () => toLocalizedPath(`/admin/login?next=${encodeURIComponent('/admin/drive-projects')}`),
    [toLocalizedPath],
  );

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);
  const [projects, setProjects] = useState<InternalDriveProjectAdmin[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [projectForm, setProjectForm] = useState<ProjectFormState>(defaultProjectForm);
  const [projectState, setProjectState] = useState<FormState>(idleFormState);
  const [grantDrafts, setGrantDrafts] = useState<Record<number, GrantDraftState>>({});
  const [memberState, setMemberState] = useState<FormState>(idleFormState);
  const [busyMemberKey, setBusyMemberKey] = useState('');

  const canManage = isAdminManager(actor);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [nextProjects, nextUsers] = await Promise.all([
        listInternalDriveProjectsForAdmin(),
        listInternalUsers(),
      ]);
      setProjects(nextProjects);
      setUsers(nextUsers);
      setGrantDrafts((previous) => {
        const nextDrafts: Record<number, GrantDraftState> = {};
        for (const project of nextProjects) {
          nextDrafts[project.id] = previous[project.id] ?? defaultGrantDraft;
        }
        return nextDrafts;
      });
    } catch (loadError) {
      const message =
        loadError instanceof Error ? loadError.message : t('Không thể tải dữ liệu dự án Drive.');
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [t]);

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

        setActor(currentUser);
        await loadData();
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
  }, [loadData, loginPath, navigate, t]);

  async function handleLogout() {
    try {
      await logoutInternal();
    } catch {
      // no-op
    } finally {
      navigate(loginPath, { replace: true });
    }
  }

  async function handleSaveProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!projectForm.name.trim() || !projectForm.driveFolderValue.trim()) {
      setProjectState({
        status: 'error',
        message: t('Tên dự án và folder/link Google Drive là bắt buộc.'),
      });
      return;
    }

    setProjectState({ status: 'loading', message: t('Đang lưu dự án Drive...') });
    try {
      const payload = {
        name: projectForm.name.trim(),
        driveFolderUrl: projectForm.driveFolderValue.trim(),
        description: projectForm.description.trim() || null,
        isActive: projectForm.isActive,
      };

      if (projectForm.projectId) {
        await updateInternalDriveProject(projectForm.projectId, payload);
      } else {
        await createInternalDriveProject(payload);
      }

      setProjectForm(defaultProjectForm);
      setProjectState({
        status: 'success',
        message: projectForm.projectId
          ? t('Đã cập nhật dự án Drive.')
          : t('Đã tạo dự án Drive.'),
      });
      await loadData();
    } catch (saveError) {
      const message =
        saveError instanceof Error ? saveError.message : t('Không thể lưu dự án Drive.');
      setProjectState({ status: 'error', message });
    }
  }

  function startEditProject(project: InternalDriveProjectAdmin) {
    setProjectForm({
      projectId: project.id,
      name: project.name,
      driveFolderValue: project.driveFolderId,
      description: project.description ?? '',
      isActive: project.isActive,
    });
    setProjectState(idleFormState);
  }

  async function handleGrantProject(project: InternalDriveProjectAdmin) {
    const draft = grantDrafts[project.id] ?? defaultGrantDraft;
    const userId = Number(draft.userId);
    if (!Number.isInteger(userId) || userId <= 0) {
      setMemberState({
        status: 'error',
        message: t('Chọn tài khoản cần cấp quyền.'),
      });
      return;
    }

    setBusyMemberKey(`grant:${project.id}`);
    setMemberState({ status: 'loading', message: t('Đang cấp quyền dự án...') });
    try {
      await grantInternalDriveProjectMember(project.id, {
        userId,
        canView: draft.canView,
        canDownload: draft.canDownload,
      });
      setGrantDrafts((previous) => ({
        ...previous,
        [project.id]: defaultGrantDraft,
      }));
      setMemberState({
        status: 'success',
        message: t('Đã cấp quyền dự án.'),
      });
      await loadData();
    } catch (grantError) {
      const message =
        grantError instanceof Error ? grantError.message : t('Không thể cấp quyền dự án.');
      setMemberState({ status: 'error', message });
    } finally {
      setBusyMemberKey('');
    }
  }

  async function handleRevokeProject(projectId: number, userId: number) {
    const confirmed = window.confirm(t('Thu hồi quyền xem dự án của tài khoản này?'));
    if (!confirmed) {
      return;
    }

    setBusyMemberKey(`revoke:${projectId}:${userId}`);
    setMemberState({ status: 'loading', message: t('Đang thu hồi quyền dự án...') });
    try {
      await revokeInternalDriveProjectMember(projectId, userId);
      setMemberState({
        status: 'success',
        message: t('Đã thu hồi quyền dự án.'),
      });
      await loadData();
    } catch (revokeError) {
      const message =
        revokeError instanceof Error ? revokeError.message : t('Không thể thu hồi quyền dự án.');
      setMemberState({ status: 'error', message });
    } finally {
      setBusyMemberKey('');
    }
  }

  if (authChecking) {
    return (
      <>
        <Seo title={t('Quản trị dự án Drive')} description={t('Quản lý dữ liệu dự án Drive.')} />
        <LoadingBlock />
      </>
    );
  }

  return (
    <>
      <Seo title={t('Quản trị dự án Drive')} description={t('Quản lý dữ liệu dự án Drive.')} />

      <section className="page-hero">
        <p className="kicker">{t('QUẢN TRỊ')}</p>
        <h1>{t('Quản trị dự án Drive')}</h1>
        <p>{t('Tạo project Drive và cấp tài khoản được xem tài liệu dự án.')}</p>
      </section>

      <section className="admin-toolbar">
        <div>
          <strong>{actor?.fullName ?? '-'}</strong>
          <p>{actor?.email ?? ''}</p>
        </div>
        <div className="admin-toolbar-actions">
          <button
            type="button"
            className="button-ghost"
            onClick={() => void loadData()}
            disabled={loading}
          >
            {loading ? t('Đang tải...') : t('Làm mới danh sách')}
          </button>
          <button type="button" className="button-ghost" onClick={handleLogout}>
            {t('Đăng xuất')}
          </button>
          <Link to={toLocalizedPath('/')} className="button-ghost">
            {t('Về trang chủ')}
          </Link>
        </div>
      </section>

      <AdminModuleTabs />

      {!canManage && (
        <ErrorBlock message={t('Tài khoản hiện tại không có quyền quản trị dự án Drive.')} />
      )}
      {error ? <ErrorBlock message={error} /> : null}
      {projectState.status === 'success' ? (
        <div className="state-block success-text">{projectState.message}</div>
      ) : null}
      {memberState.status === 'success' ? (
        <div className="state-block success-text">{memberState.message}</div>
      ) : null}
      {memberState.status === 'error' ? <ErrorBlock message={memberState.message} /> : null}

      <section className="admin-layout-grid admin-drive-project-layout">
        <article className="form-card">
          <h2>
            {projectForm.projectId ? t('Chỉnh sửa dự án Drive') : t('Tạo dự án Drive')}
          </h2>
          <form onSubmit={handleSaveProject}>
            <label>
              {t('Tên dự án')}
              <input
                value={projectForm.name}
                onChange={(event) =>
                  setProjectForm((previous) => ({
                    ...previous,
                    name: event.target.value,
                  }))
                }
                required
                disabled={!canManage || projectState.status === 'loading'}
              />
            </label>

            <label>
              {t('Google Drive folder link / ID')}
              <input
                value={projectForm.driveFolderValue}
                onChange={(event) =>
                  setProjectForm((previous) => ({
                    ...previous,
                    driveFolderValue: event.target.value,
                  }))
                }
                placeholder="https://drive.google.com/drive/folders/..."
                required
                disabled={!canManage || projectState.status === 'loading'}
              />
            </label>

            <label>
              {t('Mô tả')}
              <textarea
                value={projectForm.description}
                onChange={(event) =>
                  setProjectForm((previous) => ({
                    ...previous,
                    description: event.target.value,
                  }))
                }
                rows={4}
                disabled={!canManage || projectState.status === 'loading'}
              />
            </label>

            <label className="admin-checkbox">
              <input
                type="checkbox"
                checked={projectForm.isActive}
                onChange={(event) =>
                  setProjectForm((previous) => ({
                    ...previous,
                    isActive: event.target.checked,
                  }))
                }
                disabled={!canManage || projectState.status === 'loading'}
              />
              <span>{t('Kích hoạt dự án')}</span>
            </label>

            <div className="admin-row-actions">
              <button
                type="submit"
                className="button-solid"
                disabled={!canManage || projectState.status === 'loading'}
              >
                {projectState.status === 'loading'
                  ? t('Đang xử lý...')
                  : projectForm.projectId
                    ? t('Cập nhật dự án')
                    : t('Tạo dự án')}
              </button>
              {projectForm.projectId ? (
                <button
                  type="button"
                  className="button-ghost"
                  onClick={() => {
                    setProjectForm(defaultProjectForm);
                    setProjectState(idleFormState);
                  }}
                  disabled={projectState.status === 'loading'}
                >
                  {t('Hủy sửa')}
                </button>
              ) : null}
            </div>

            {projectState.status === 'error' ? <ErrorBlock message={projectState.message} /> : null}
          </form>
        </article>

        <article className="form-card admin-drive-project-list-card">
          <h2>{t('Danh sách dự án Drive')}</h2>
          {loading ? <LoadingBlock /> : null}
          {!loading && projects.length === 0 ? (
            <p className="admin-empty">{t('Chưa có dự án Drive nào.')}</p>
          ) : null}

          {!loading && projects.length > 0 ? (
            <div className="admin-drive-project-list">
              {projects.map((project) => {
                const draft = grantDrafts[project.id] ?? defaultGrantDraft;
                const userOptions = getProjectUserOptions(users, project);

                return (
                  <section key={project.id} className="admin-drive-project-card">
                    <div className="admin-drive-project-head">
                      <div>
                        <h3>{project.name}</h3>
                        <p>{project.description || t('Không có mô tả.')}</p>
                        <small>{project.driveFolderId}</small>
                      </div>
                      <div className="admin-row-actions">
                        <span
                          className={`admin-status-pill ${project.isActive ? 'is-active' : 'is-inactive'}`}
                        >
                          {project.isActive ? t('Đang bật') : t('Đang tắt')}
                        </span>
                        <button
                          type="button"
                          className="button-ghost admin-row-action"
                          onClick={() => startEditProject(project)}
                          disabled={!canManage}
                        >
                          {t('Sửa')}
                        </button>
                      </div>
                    </div>

                    <div className="admin-drive-grant-row">
                      <select
                        value={draft.userId}
                        onChange={(event) =>
                          setGrantDrafts((previous) => ({
                            ...previous,
                            [project.id]: {
                              ...draft,
                              userId: event.target.value,
                            },
                          }))
                        }
                        disabled={!canManage || busyMemberKey === `grant:${project.id}`}
                      >
                        <option value="">
                          {userOptions.length > 0
                            ? t('Chọn tài khoản để cấp quyền')
                            : t('Tất cả tài khoản đã được cấp quyền')}
                        </option>
                        {userOptions.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.fullName} - {user.email}
                          </option>
                        ))}
                      </select>

                      <label className="admin-checkbox admin-drive-permission-check">
                        <input
                          type="checkbox"
                          checked={draft.canView}
                          onChange={(event) =>
                            setGrantDrafts((previous) => ({
                              ...previous,
                              [project.id]: {
                                ...draft,
                                canView: event.target.checked,
                              },
                            }))
                          }
                          disabled={!canManage || busyMemberKey === `grant:${project.id}`}
                        />
                        <span>{t('Cho xem')}</span>
                      </label>

                      <label className="admin-checkbox admin-drive-permission-check">
                        <input
                          type="checkbox"
                          checked={draft.canDownload}
                          onChange={(event) =>
                            setGrantDrafts((previous) => ({
                              ...previous,
                              [project.id]: {
                                ...draft,
                                canDownload: event.target.checked,
                              },
                            }))
                          }
                          disabled={!canManage || busyMemberKey === `grant:${project.id}`}
                        />
                        <span>{t('Cho tải xuống')}</span>
                      </label>

                      <button
                        type="button"
                        className="button-solid"
                        onClick={() => void handleGrantProject(project)}
                        disabled={!canManage || busyMemberKey === `grant:${project.id}`}
                      >
                        {busyMemberKey === `grant:${project.id}` ? t('Đang cấp...') : t('Cấp quyền')}
                      </button>
                    </div>

                    <div className="admin-table-wrap">
                      <table className="admin-users-table">
                        <thead>
                          <tr>
                            <th>{t('Tài khoản')}</th>
                            <th>{t('Email')}</th>
                            <th>{t('Quyền')}</th>
                            <th>{t('Cập nhật')}</th>
                            <th>{t('Thao tác')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {project.members.length === 0 ? (
                            <tr>
                              <td colSpan={5}>{t('Chưa cấp tài khoản nào.')}</td>
                            </tr>
                          ) : (
                            project.members.map((member) => (
                              <tr key={member.id}>
                                <td>{member.userFullName}</td>
                                <td>{member.userEmail}</td>
                                <td>
                                  {member.canView ? t('Xem') : t('Không xem')}
                                  {' / '}
                                  {member.canDownload ? t('Tải xuống') : t('Không tải')}
                                </td>
                                <td>{formatDate(member.updatedAt)}</td>
                                <td>
                                  <button
                                    type="button"
                                    className="button-ghost admin-row-action is-danger"
                                    onClick={() =>
                                      void handleRevokeProject(project.id, member.userId)
                                    }
                                    disabled={
                                      !canManage ||
                                      busyMemberKey === `revoke:${project.id}:${member.userId}`
                                    }
                                  >
                                    {busyMemberKey === `revoke:${project.id}:${member.userId}`
                                      ? t('Đang thu hồi...')
                                      : t('Thu hồi')}
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </section>
                );
              })}
            </div>
          ) : null}
        </article>
      </section>
    </>
  );
}
