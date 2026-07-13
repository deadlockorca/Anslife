import type { FormEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminModuleTabs from '../components/admin/AdminModuleTabs';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import useSiteI18n from '../hooks/useSiteI18n';
import {
  createInternalRecruitmentJob,
  getCurrentUser,
  listInternalRecruitmentApplications,
  listInternalRecruitmentJobs,
  logoutInternal,
  updateInternalRecruitmentJob,
  type AppRole,
  type AuthUser,
  type InternalRecruitmentApplication,
  type InternalRecruitmentJob,
  type InternalRecruitmentStatus,
} from '../lib/internalAuth';

interface RecruitmentJobFormState {
  groupCode: string;
  groupTitle: string;
  groupBody: string;
  marketName: string;
  marketStatus: InternalRecruitmentStatus;
  title: string;
  summary: string;
  description: string;
  requirementsText: string;
  benefitsText: string;
  location: string;
  workType: string;
  status: InternalRecruitmentStatus;
  sortOrder: string;
  isPublic: boolean;
}

interface EditRecruitmentJobState extends RecruitmentJobFormState {
  jobId: number;
}

type FormState =
  | { status: 'idle'; message: '' }
  | { status: 'loading'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

const RECRUITMENT_MANAGE_ROLES: AppRole[] = ['super_admin', 'system_admin', 'data_controller'];

const statusOptions: Array<{ value: InternalRecruitmentStatus; label: string }> = [
  { value: 'open', label: 'Đang tuyển' },
  { value: 'receiving', label: 'Đang tiếp nhận hồ sơ' },
  { value: 'paused', label: 'Tạm dừng tuyển dụng' },
  { value: 'closed', label: 'Đã đóng tuyển dụng' },
];

const defaultForm: RecruitmentJobFormState = {
  groupCode: 'INT',
  groupTitle: '',
  groupBody: '',
  marketName: '',
  marketStatus: 'open',
  title: '',
  summary: '',
  description: '',
  requirementsText: '',
  benefitsText: '',
  location: '',
  workType: '',
  status: 'open',
  sortOrder: '0',
  isPublic: true,
};

const idleState: FormState = { status: 'idle', message: '' };

function canManageRecruitment(actor: AuthUser | null): boolean {
  return Boolean(actor?.roles.some((role) => RECRUITMENT_MANAGE_ROLES.includes(role)));
}

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

function splitLines(value: string): string[] {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function toFormState(job: InternalRecruitmentJob): EditRecruitmentJobState {
  return {
    jobId: job.id,
    groupCode: job.groupCode,
    groupTitle: job.groupTitle,
    groupBody: job.groupBody ?? '',
    marketName: job.marketName,
    marketStatus: job.marketStatus,
    title: job.title,
    summary: job.summary,
    description: job.description ?? '',
    requirementsText: job.requirements.join('\n'),
    benefitsText: job.benefits.join('\n'),
    location: job.location ?? '',
    workType: job.workType ?? '',
    status: job.status,
    sortOrder: String(job.sortOrder),
    isPublic: job.isPublic,
  };
}

function buildPayload(form: RecruitmentJobFormState) {
  return {
    groupCode: form.groupCode.trim().toUpperCase(),
    groupTitle: form.groupTitle.trim(),
    groupBody: form.groupBody.trim() || null,
    marketName: form.marketName.trim(),
    marketStatus: form.marketStatus,
    title: form.title.trim(),
    summary: form.summary.trim(),
    description: form.description.trim() || null,
    requirements: splitLines(form.requirementsText),
    benefits: splitLines(form.benefitsText),
    location: form.location.trim() || null,
    workType: form.workType.trim() || null,
    status: form.status,
    sortOrder: Number(form.sortOrder) || 0,
    isPublic: form.isPublic,
  };
}

export default function AdminRecruitmentPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const loginPath = useMemo(
    () => toLocalizedPath(`/admin/login?next=${encodeURIComponent('/admin/recruitment')}`),
    [toLocalizedPath],
  );

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);
  const [jobs, setJobs] = useState<InternalRecruitmentJob[]>([]);
  const [applications, setApplications] = useState<InternalRecruitmentApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [createForm, setCreateForm] = useState<RecruitmentJobFormState>(defaultForm);
  const [createState, setCreateState] = useState<FormState>(idleState);
  const [editForm, setEditForm] = useState<EditRecruitmentJobState | null>(null);
  const [editState, setEditState] = useState<FormState>(idleState);

  const actorCanManage = useMemo(() => canManageRecruitment(actor), [actor]);

  const loadRecruitment = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [nextJobs, nextApplications] = await Promise.all([
        listInternalRecruitmentJobs(500),
        listInternalRecruitmentApplications(100),
      ]);
      setJobs(nextJobs);
      setApplications(nextApplications);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : t('Không thể tải dữ liệu tuyển dụng.'));
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
        await loadRecruitment();
      } catch (bootstrapError) {
        if (!isMounted) {
          return;
        }

        setError(
          bootstrapError instanceof Error
            ? bootstrapError.message
            : t('Không thể kiểm tra quyền truy cập.'),
        );
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
  }, [loadRecruitment, loginPath, navigate, t]);

  async function handleLogout() {
    try {
      await logoutInternal();
    } catch {
      // no-op
    } finally {
      navigate(loginPath, { replace: true });
    }
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreateState({ status: 'loading', message: t('Đang tạo vị trí...') });

    try {
      const created = await createInternalRecruitmentJob(buildPayload(createForm));
      setJobs((previous) => [created, ...previous]);
      setCreateForm(defaultForm);
      setCreateState({ status: 'success', message: t('Tạo vị trí tuyển dụng thành công.') });
    } catch (saveError) {
      setCreateState({
        status: 'error',
        message: saveError instanceof Error ? saveError.message : t('Không thể tạo vị trí tuyển dụng.'),
      });
    }
  }

  async function handleEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editForm) {
      return;
    }

    setEditState({ status: 'loading', message: t('Đang cập nhật vị trí...') });
    try {
      const updated = await updateInternalRecruitmentJob(editForm.jobId, buildPayload(editForm));
      setJobs((previous) => previous.map((job) => (job.id === updated.id ? updated : job)));
      setEditForm(null);
      setEditState({ status: 'success', message: t('Cập nhật vị trí tuyển dụng thành công.') });
    } catch (saveError) {
      setEditState({
        status: 'error',
        message:
          saveError instanceof Error ? saveError.message : t('Không thể cập nhật vị trí tuyển dụng.'),
      });
    }
  }

  function renderJobForm(
    form: RecruitmentJobFormState,
    setForm: (updater: (previous: RecruitmentJobFormState) => RecruitmentJobFormState) => void,
    disabled: boolean,
  ) {
    return (
      <>
        <label>
          {t('Mã nhóm')}
          <input
            value={form.groupCode}
            onChange={(event) => setForm((previous) => ({ ...previous, groupCode: event.target.value }))}
            required
            disabled={disabled}
          />
        </label>
        <label>
          {t('Nhóm nghề')}
          <input
            value={form.groupTitle}
            onChange={(event) => setForm((previous) => ({ ...previous, groupTitle: event.target.value }))}
            required
            disabled={disabled}
          />
        </label>
        <label>
          {t('Mô tả nhóm')}
          <input
            value={form.groupBody}
            onChange={(event) => setForm((previous) => ({ ...previous, groupBody: event.target.value }))}
            disabled={disabled}
          />
        </label>
        <label>
          {t('Khu vực / bộ phận')}
          <input
            value={form.marketName}
            onChange={(event) => setForm((previous) => ({ ...previous, marketName: event.target.value }))}
            required
            disabled={disabled}
          />
        </label>
        <label>
          {t('Trạng thái khu vực')}
          <select
            value={form.marketStatus}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                marketStatus: event.target.value as InternalRecruitmentStatus,
              }))
            }
            disabled={disabled}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.label)}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t('Tên vị trí')}
          <input
            value={form.title}
            onChange={(event) => setForm((previous) => ({ ...previous, title: event.target.value }))}
            required
            disabled={disabled}
          />
        </label>
        <label>
          {t('Tóm tắt')}
          <textarea
            value={form.summary}
            onChange={(event) => setForm((previous) => ({ ...previous, summary: event.target.value }))}
            required
            disabled={disabled}
            rows={3}
          />
        </label>
        <label>
          {t('Mô tả công việc')}
          <textarea
            value={form.description}
            onChange={(event) => setForm((previous) => ({ ...previous, description: event.target.value }))}
            disabled={disabled}
            rows={4}
          />
        </label>
        <label>
          {t('Yêu cầu')}
          <textarea
            value={form.requirementsText}
            onChange={(event) =>
              setForm((previous) => ({ ...previous, requirementsText: event.target.value }))
            }
            disabled={disabled}
            rows={4}
            placeholder={t('Mỗi dòng là một yêu cầu')}
          />
        </label>
        <label>
          {t('Quyền lợi')}
          <textarea
            value={form.benefitsText}
            onChange={(event) => setForm((previous) => ({ ...previous, benefitsText: event.target.value }))}
            disabled={disabled}
            rows={4}
            placeholder={t('Mỗi dòng là một quyền lợi')}
          />
        </label>
        <label>
          {t('Địa điểm')}
          <input
            value={form.location}
            onChange={(event) => setForm((previous) => ({ ...previous, location: event.target.value }))}
            disabled={disabled}
          />
        </label>
        <label>
          {t('Hình thức')}
          <input
            value={form.workType}
            onChange={(event) => setForm((previous) => ({ ...previous, workType: event.target.value }))}
            disabled={disabled}
            placeholder={t('Full-time / Hybrid / Remote')}
          />
        </label>
        <label>
          {t('Trạng thái vị trí')}
          <select
            value={form.status}
            onChange={(event) =>
              setForm((previous) => ({ ...previous, status: event.target.value as InternalRecruitmentStatus }))
            }
            disabled={disabled}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.label)}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t('Thứ tự')}
          <input
            type="number"
            value={form.sortOrder}
            onChange={(event) => setForm((previous) => ({ ...previous, sortOrder: event.target.value }))}
            disabled={disabled}
          />
        </label>
        <label className="admin-checkbox">
          <input
            type="checkbox"
            checked={form.isPublic}
            onChange={(event) => setForm((previous) => ({ ...previous, isPublic: event.target.checked }))}
            disabled={disabled}
          />
          <span>{t('Hiển thị ngoài website')}</span>
        </label>
      </>
    );
  }

  if (authChecking) {
    return (
      <>
        <Seo title={t('Quản trị tuyển dụng')} description={t('Quản trị tuyển dụng')} />
        <LoadingBlock />
      </>
    );
  }

  return (
    <>
      <Seo title={t('Quản trị tuyển dụng')} description={t('Quản trị tuyển dụng')} />

      <section className="page-hero">
        <p className="kicker">{t('QUẢN TRỊ')}</p>
        <h1>{t('Quản trị tuyển dụng')}</h1>
        <p>{t('Quản lý vị trí tuyển dụng, trạng thái, khu vực và hồ sơ ứng tuyển.')}</p>
      </section>

      <section className="admin-toolbar">
        <div>
          <strong>{actor?.fullName ?? '-'}</strong>
          <p>{actor?.email ?? ''}</p>
        </div>
        <div className="admin-toolbar-actions">
          <button type="button" className="button-ghost" onClick={() => void loadRecruitment()} disabled={loading}>
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

      {!actorCanManage && <ErrorBlock message={t('Tài khoản hiện tại không có quyền quản trị tuyển dụng.')} />}
      {error && <ErrorBlock message={error} />}
      {createState.status === 'success' && <div className="state-block success-text">{createState.message}</div>}
      {editState.status === 'success' && <div className="state-block success-text">{editState.message}</div>}

      <section className="admin-layout-grid admin-layout-grid-wide">
        <article className="form-card">
          <h2>{t('Tạo vị trí tuyển dụng')}</h2>
          {actorCanManage ? (
            <form onSubmit={handleCreate}>
              {renderJobForm(createForm, setCreateForm, createState.status === 'loading')}
              <button type="submit" className="button-solid" disabled={createState.status === 'loading'}>
                {createState.status === 'loading' ? t('Đang xử lý...') : t('Tạo vị trí')}
              </button>
              {createState.status === 'error' && <ErrorBlock message={createState.message} />}
            </form>
          ) : (
            <p className="admin-empty">{t('Bạn không có quyền tạo vị trí tuyển dụng.')}</p>
          )}
        </article>

        <article className="form-card admin-users-card">
          <h2>{t('Danh sách vị trí')}</h2>
          {loading && <LoadingBlock />}
          {!loading && jobs.length === 0 && <p className="admin-empty">{t('Chưa có vị trí tuyển dụng trong DB.')}</p>}
          {!loading && jobs.length > 0 && (
            <div className="admin-table-wrap">
              <table className="admin-users-table admin-orders-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{t('Vị trí')}</th>
                    <th>{t('Nhóm')}</th>
                    <th>{t('Khu vực')}</th>
                    <th>{t('Trạng thái')}</th>
                    <th>{t('Hiển thị')}</th>
                    <th>{t('Thao tác')}</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td>{job.id}</td>
                      <td>{job.title}</td>
                      <td>{job.groupTitle}</td>
                      <td>{job.marketName}</td>
                      <td>
                        <span className={`admin-status-pill is-${job.status === 'open' ? 'success' : 'info'}`}>
                          {t(statusOptions.find((option) => option.value === job.status)?.label ?? job.status)}
                        </span>
                      </td>
                      <td>{job.isPublic ? t('Có') : t('Không')}</td>
                      <td>
                        <button
                          type="button"
                          className="button-ghost admin-row-action"
                          onClick={() => {
                            setEditState(idleState);
                            setEditForm(toFormState(job));
                          }}
                          disabled={!actorCanManage}
                        >
                          {t('Sửa')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>
      </section>

      <section className="form-card admin-users-card">
        <h2>{t('Hồ sơ ứng tuyển mới nhất')}</h2>
        {!loading && applications.length === 0 && (
          <p className="admin-empty">{t('Chưa có hồ sơ ứng tuyển nào trong DB.')}</p>
        )}
        {!loading && applications.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-users-table admin-orders-table">
              <thead>
                <tr>
                  <th>{t('Thời gian')}</th>
                  <th>{t('Ứng viên')}</th>
                  <th>{t('Email')}</th>
                  <th>{t('Vị trí')}</th>
                  <th>{t('Khu vực')}</th>
                  <th>{t('CV')}</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.id}>
                    <td>{formatDate(application.createdAt)}</td>
                    <td>{application.name ?? '-'}</td>
                    <td>{application.email ?? '-'}</td>
                    <td>{application.jobTitle ?? '-'}</td>
                    <td>{application.careerMarket ?? '-'}</td>
                    <td>
                      {application.cvLink ? (
                        <a href={application.cvLink} target="_blank" rel="noreferrer">
                          {t('Mở CV')}
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {editForm && actorCanManage && (
        <section className="admin-edit-overlay" role="dialog" aria-modal="true">
          <button
            type="button"
            className="admin-edit-backdrop"
            onClick={() => setEditForm(null)}
            aria-label={t('Đóng')}
          />
          <article className="admin-edit-panel">
            <div className="admin-edit-head">
              <h2>
                {t('Chỉnh sửa vị trí')} #{editForm.jobId}
              </h2>
              <button type="button" className="admin-edit-close" onClick={() => setEditForm(null)}>
                ×
              </button>
            </div>
            <form onSubmit={handleEdit} className="admin-edit-form">
              {renderJobForm(
                editForm,
                (updater) =>
                  setEditForm((previous) => (previous ? { ...previous, ...updater(previous) } : previous)),
                editState.status === 'loading',
              )}
              <div className="admin-edit-actions">
                <button
                  type="button"
                  className="button-ghost"
                  onClick={() => setEditForm(null)}
                  disabled={editState.status === 'loading'}
                >
                  {t('Hủy')}
                </button>
                <button type="submit" className="button-solid" disabled={editState.status === 'loading'}>
                  {editState.status === 'loading' ? t('Đang xử lý...') : t('Lưu thay đổi')}
                </button>
              </div>
              {editState.status === 'error' && <ErrorBlock message={editState.message} />}
            </form>
          </article>
        </section>
      )}
    </>
  );
}
