import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import useSiteI18n from '../hooks/useSiteI18n';
import { isLanguageCode } from '../i18n/language';
import {
  getCurrentUser,
  isQcAttendanceOnlyUser,
  loginInternal,
} from '../lib/internalAuth';

type LoginState =
  | { status: 'idle'; message: '' }
  | { status: 'loading'; message: string }
  | { status: 'error'; message: string };

const idleState: LoginState = { status: 'idle', message: '' };
const DEFAULT_ADMIN_NEXT_PATH = '/admin/dashboard';
const QC_ATTENDANCE_NEXT_PATH = '/admin/attendance';

function resolveAdminNextPath(rawValue: string): string {
  const trimmed = rawValue.trim();
  if (!trimmed.startsWith('/')) {
    return DEFAULT_ADMIN_NEXT_PATH;
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed, 'http://localhost');
  } catch {
    return DEFAULT_ADMIN_NEXT_PATH;
  }

  const segments = parsed.pathname.split('/').filter(Boolean);
  const normalizedSegments = isLanguageCode(segments[0]) ? segments.slice(1) : segments;
  if (normalizedSegments[0] !== 'admin' || normalizedSegments.length < 2) {
    return DEFAULT_ADMIN_NEXT_PATH;
  }

  const normalizedPathname = `/${normalizedSegments.join('/')}`;
  return `${normalizedPathname}${parsed.search}${parsed.hash}`;
}

export default function AdminLoginPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('admin@anslife.com');
  const [password, setPassword] = useState('');
  const [checkingSession, setCheckingSession] = useState(true);
  const [state, setState] = useState<LoginState>(idleState);

  const nextPath = useMemo(() => {
    const rawValue = searchParams.get('next') ?? '';
    return resolveAdminNextPath(rawValue);
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      try {
        const currentUser = await getCurrentUser();
        if (!isMounted) {
          return;
        }

        if (currentUser) {
          const targetPath = isQcAttendanceOnlyUser(currentUser)
            ? QC_ATTENDANCE_NEXT_PATH
            : nextPath;
          navigate(toLocalizedPath(targetPath), { replace: true });
          return;
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : t('Không thể kiểm tra phiên đăng nhập.');
        setState({ status: 'error', message });
      } finally {
        if (isMounted) {
          setCheckingSession(false);
        }
      }
    }

    void checkSession();
    return () => {
      isMounted = false;
    };
  }, [navigate, nextPath, t, toLocalizedPath]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: 'loading', message: t('Đang đăng nhập...') });

    try {
      const user = await loginInternal({
        email: email.trim().toLowerCase(),
        password,
      });

      const targetPath = isQcAttendanceOnlyUser(user)
        ? QC_ATTENDANCE_NEXT_PATH
        : nextPath;
      navigate(toLocalizedPath(targetPath), { replace: true });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t('Đăng nhập thất bại.');
      setState({ status: 'error', message });
    }
  }

  return (
    <>
      <Seo
        title={t('Đăng nhập quản trị')}
        description={t('Đăng nhập hệ thống quản trị người dùng nội bộ ANSLIFE.')}
      />
      <section className="page-hero">
        <p className="kicker">{t('QUẢN TRỊ')}</p>
        <h1>{t('Đăng nhập quản trị')}</h1>
        <p>
          {t(
            'Sử dụng tài khoản đã được cấp quyền để truy cập trang quản trị người dùng nội bộ.',
          )}
        </p>
      </section>

      {checkingSession && <LoadingBlock />}

      {!checkingSession && (
        <section className="admin-auth-page">
          <article className="admin-auth-card">
            <h2>{t('Thông tin đăng nhập')}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                {t('Email')}
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>

              <label>
                {t('Mật khẩu')}
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>

              <button
                type="submit"
                className="button-solid admin-submit-button"
                disabled={state.status === 'loading'}
              >
                {state.status === 'loading' ? t('Đang xử lý...') : t('Đăng nhập')}
              </button>

              {state.status === 'error' && <ErrorBlock message={state.message} />}
            </form>
          </article>

          <aside className="admin-auth-note">
            <h3>{t('Gợi ý')}</h3>
            <p>
              {t(
                'Nếu đây là lần đầu chạy hệ thống, tài khoản bootstrap sẽ được tạo khi gọi API đăng nhập.',
              )}
            </p>
            <p>
              <Link to={toLocalizedPath('/')}>{t('Quay lại trang chủ')}</Link>
            </p>
          </aside>
        </section>
      )}
    </>
  );
}
