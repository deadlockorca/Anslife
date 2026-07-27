import type { ChangeEvent, FormEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminModuleTabs from '../components/admin/AdminModuleTabs';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import useSiteI18n from '../hooks/useSiteI18n';
import {
  checkInInternalAttendance,
  checkOutInternalAttendance,
  getCurrentUser,
  listInternalAttendanceLogs,
  logoutInternal,
  uploadInternalAttendanceWorkPhotos,
  type AppRole,
  type AuthUser,
  type InternalAttendanceLog,
  type InternalAttendanceWorkPhoto,
} from '../lib/internalAuth';

interface AttendanceFilters {
  fromDate: string;
  toDate: string;
  userId: string;
}

type ActionState =
  | { status: 'idle'; message: '' }
  | { status: 'loading'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

const defaultFilters: AttendanceFilters = {
  fromDate: '',
  toDate: '',
  userId: '',
};

const ATTENDANCE_MANAGE_ROLES: AppRole[] = [
  'super_admin',
  'system_admin',
  'data_controller',
  'sale_trading',
];

function canManageAttendance(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }
  return actor.roles.some((role) => ATTENDANCE_MANAGE_ROLES.includes(role));
}

function formatDateTime(value: string | null): string {
  if (!value) {
    return '-';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

function formatWorkingTime(minutes: number | null): string {
  if (minutes == null || minutes < 0) {
    return '-';
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

function formatFileSize(bytes: number | null): string {
  if (bytes == null || bytes < 0) {
    return '-';
  }
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDateLabel(value: string): string {
  if (!value) {
    return '-';
  }
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'medium',
  }).format(date);
}

function getTodayStatus(log: InternalAttendanceLog | null): {
  label: string;
  className: string;
} {
  if (!log?.checkInAt) {
    return {
      label: 'Chưa check-in',
      className: 'is-order-draft',
    };
  }
  if (!log.checkOutAt) {
    return {
      label: 'Đang làm việc',
      className: 'is-order-pending_review',
    };
  }
  return {
    label: 'Đã hoàn thành ca',
    className: 'is-order-approved_internal',
  };
}

type LocationErrorReason =
  | 'unsupported'
  | 'insecure_context'
  | 'permission_denied'
  | 'timeout'
  | 'unavailable';

type LocationSnapshotResult =
  | {
      ok: true;
      latitude: number;
      longitude: number;
    }
  | {
      ok: false;
      reason: LocationErrorReason;
    };

type CameraErrorReason =
  | 'unsupported'
  | 'permission_denied'
  | 'busy'
  | 'unavailable';

function normalizeLocationErrorReason(
  error: GeolocationPositionError,
): LocationErrorReason {
  if (error.code === error.PERMISSION_DENIED) {
    return 'permission_denied';
  }
  if (error.code === error.TIMEOUT) {
    return 'timeout';
  }
  return 'unavailable';
}

async function getLocationSnapshot(): Promise<LocationSnapshotResult> {
  if (typeof window !== 'undefined' && !window.isSecureContext) {
    return {
      ok: false,
      reason: 'insecure_context',
    };
  }

  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    return {
      ok: false,
      reason: 'unsupported',
    };
  }

  return new Promise((resolve) => {
    const timeoutId = window.setTimeout(
      () =>
        resolve({
          ok: false,
          reason: 'timeout',
        }),
      10000,
    );
    navigator.geolocation.getCurrentPosition(
      (position) => {
        window.clearTimeout(timeoutId);
        resolve({
          ok: true,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        window.clearTimeout(timeoutId);
        resolve({
          ok: false,
          reason: normalizeLocationErrorReason(error),
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0,
      },
    );
  });
}

function resolveImageUrl(url: string | null): string | null {
  if (!url) {
    return null;
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (url.startsWith('/')) {
    return url;
  }
  return `/${url}`;
}

export default function AdminAttendancePage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const loginPath = useMemo(
    () => toLocalizedPath(`/admin/login?next=${encodeURIComponent('/admin/attendance')}`),
    [toLocalizedPath],
  );

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);
  const [filters, setFilters] = useState<AttendanceFilters>(defaultFilters);
  const [logs, setLogs] = useState<InternalAttendanceLog[]>([]);
  const [todayDate, setTodayDate] = useState('');
  const [todayLog, setTodayLog] = useState<InternalAttendanceLog | null>(null);
  const [todayWorkPhotos, setTodayWorkPhotos] = useState<InternalAttendanceWorkPhoto[]>([]);
  const [canManageFromApi, setCanManageFromApi] = useState(false);
  const [clockNote, setClockNote] = useState('');
  const [workPhotoFiles, setWorkPhotoFiles] = useState<File[]>([]);
  const [gpsPermission, setGpsPermission] = useState<
    'unknown' | 'prompt' | 'granted' | 'denied' | 'unsupported'
  >('unknown');
  const [gpsSnapshot, setGpsSnapshot] = useState<{
    latitude: number;
    longitude: number;
    capturedAt: string;
  } | null>(null);
  const [gpsMessage, setGpsMessage] = useState('');
  const [photoDataUrl, setPhotoDataUrl] = useState('');
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [actionState, setActionState] = useState<ActionState>({
    status: 'idle',
    message: '',
  });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const workPhotoInputRef = useRef<HTMLInputElement | null>(null);

  const actorCanManage = useMemo(
    () => canManageFromApi || canManageAttendance(actor),
    [actor, canManageFromApi],
  );
  const todayStatus = useMemo(() => getTodayStatus(todayLog), [todayLog]);
  const getLocationErrorMessage = useCallback(
    (reason: LocationErrorReason) => {
      if (reason === 'insecure_context') {
        return t('GPS chỉ hoạt động trên HTTPS hoặc localhost. Vui lòng mở đúng domain bảo mật.');
      }
      if (reason === 'permission_denied') {
        return t('Bạn đã từ chối quyền vị trí. Hãy bật GPS và cho phép truy cập vị trí để báo cáo công việc.');
      }
      if (reason === 'timeout') {
        return t('Không lấy được vị trí kịp thời gian. Hãy kiểm tra GPS rồi thử lại.');
      }
      if (reason === 'unsupported') {
        return t('Thiết bị/trình duyệt không hỗ trợ định vị GPS.');
      }
      return t('Không lấy được vị trí GPS. Vui lòng thử lại.');
    },
    [t],
  );
  const getGpsPermissionLabel = useCallback(
    (permission: 'unknown' | 'prompt' | 'granted' | 'denied' | 'unsupported') => {
      if (permission === 'granted') {
        return t('Đã cho phép');
      }
      if (permission === 'denied') {
        return t('Đang bị chặn');
      }
      if (permission === 'prompt') {
        return t('Chưa quyết định');
      }
      if (permission === 'unsupported') {
        return t('Không hỗ trợ');
      }
      return t('Chưa rõ');
    },
    [t],
  );
  const refreshGpsPermission = useCallback(async () => {
    if (typeof navigator === 'undefined' || !('permissions' in navigator) || !navigator.permissions?.query) {
      setGpsPermission('unsupported');
      return;
    }

    try {
      const result = await navigator.permissions.query({
        name: 'geolocation',
      });
      setGpsPermission(result.state);
    } catch {
      setGpsPermission('unsupported');
    }
  }, []);
  const getCameraErrorMessage = useCallback(
    (reason: CameraErrorReason) => {
      if (reason === 'permission_denied') {
        return t('Bạn đã từ chối quyền camera. Hãy cho phép camera để báo cáo công việc.');
      }
      if (reason === 'busy') {
        return t('Camera đang được ứng dụng khác sử dụng. Vui lòng đóng ứng dụng đó và thử lại.');
      }
      if (reason === 'unsupported') {
        return t('Thiết bị/trình duyệt không hỗ trợ camera.');
      }
      return t('Không thể mở camera. Vui lòng thử lại.');
    },
    [t],
  );

  const stopCamera = useCallback(() => {
    const stream = streamRef.current;
    if (stream) {
      for (const track of stream.getTracks()) {
        track.stop();
      }
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraOpen(false);
  }, []);

  const handleOpenCamera = useCallback(async () => {
    setCameraError('');

    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setCameraError(getCameraErrorMessage('unsupported'));
      return;
    }

    stopCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraOpen(true);
    } catch (cameraOpenError) {
      const errorName =
        cameraOpenError && typeof cameraOpenError === 'object' && 'name' in cameraOpenError
          ? String((cameraOpenError as { name?: unknown }).name ?? '')
          : '';

      if (errorName === 'NotAllowedError' || errorName === 'PermissionDeniedError') {
        setCameraError(getCameraErrorMessage('permission_denied'));
        return;
      }
      if (errorName === 'NotReadableError' || errorName === 'TrackStartError') {
        setCameraError(getCameraErrorMessage('busy'));
        return;
      }
      setCameraError(getCameraErrorMessage('unavailable'));
    }
  }, [getCameraErrorMessage, stopCamera]);

  const handleCapturePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.videoWidth <= 0 || video.videoHeight <= 0) {
      setCameraError(t('Chưa lấy được khung hình camera. Vui lòng thử lại.'));
      return;
    }

    const maxWidth = 960;
    const scale = Math.min(1, maxWidth / video.videoWidth);
    const width = Math.max(1, Math.round(video.videoWidth * scale));
    const height = Math.max(1, Math.round(video.videoHeight * scale));

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (!context) {
      setCameraError(t('Không thể xử lý ảnh camera. Vui lòng thử lại.'));
      return;
    }

    context.drawImage(video, 0, 0, width, height);
    const captured = canvas.toDataURL('image/jpeg', 0.84);
    if (!captured || !captured.startsWith('data:image/')) {
      setCameraError(t('Ảnh chụp không hợp lệ. Vui lòng chụp lại.'));
      return;
    }

    setPhotoDataUrl(captured);
    setCameraError('');
    stopCamera();
  }, [stopCamera, t]);

  const captureGpsSnapshot = useCallback(async () => {
    setGpsMessage(t('Đang lấy vị trí GPS...'));
    const location = await getLocationSnapshot();
    if (!location.ok) {
      const message = getLocationErrorMessage(location.reason);
      setGpsSnapshot(null);
      setGpsMessage(message);
      await refreshGpsPermission();
      return {
        ok: false as const,
        message,
      };
    }

    setGpsSnapshot({
      latitude: location.latitude,
      longitude: location.longitude,
      capturedAt: new Date().toISOString(),
    });
    setGpsMessage(t('Đã lấy vị trí GPS thành công.'));
    await refreshGpsPermission();

    return {
      ok: true as const,
      latitude: location.latitude,
      longitude: location.longitude,
    };
  }, [getLocationErrorMessage, refreshGpsPermission, t]);

  const loadAttendance = useCallback(
    async (nextFilters: AttendanceFilters, allowUserFilter: boolean) => {
      setLoading(true);
      setError('');
      try {
        const parsedUserId = Number(nextFilters.userId);
        const result = await listInternalAttendanceLogs({
          perPage: 250,
          fromDate: nextFilters.fromDate.trim() || undefined,
          toDate: nextFilters.toDate.trim() || undefined,
          userId:
            allowUserFilter && Number.isInteger(parsedUserId) && parsedUserId > 0
              ? parsedUserId
              : undefined,
        });

        setLogs(result.logs);
        setTodayDate(result.todayDate);
        setTodayLog(result.todayLog);
        setTodayWorkPhotos(result.todayWorkPhotos);
        setCanManageFromApi(result.canManage);
      } catch (loadError) {
        const message =
          loadError instanceof Error
            ? loadError.message
            : t('Không thể tải dữ liệu báo cáo công việc.');
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

        setActor(currentUser);
        await loadAttendance(defaultFilters, canManageAttendance(currentUser));
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
  }, [loadAttendance, loginPath, navigate, t]);

  useEffect(() => () => stopCamera(), [stopCamera]);

  useEffect(() => {
    void refreshGpsPermission();
  }, [refreshGpsPermission]);

  useEffect(() => {
    if (!cameraOpen) {
      return;
    }

    const videoElement = videoRef.current;
    const stream = streamRef.current;
    if (!videoElement || !stream) {
      return;
    }

    if (videoElement.srcObject !== stream) {
      videoElement.srcObject = stream;
    }

    const startPlayback = () => {
      void videoElement.play().catch(() => {
        // no-op: người dùng có thể cần tương tác thêm trên một số trình duyệt.
      });
    };

    if (videoElement.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      startPlayback();
      return;
    }

    const onLoadedMetadata = () => {
      startPlayback();
    };

    videoElement.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
    return () => {
      videoElement.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [cameraOpen]);

  async function handleLogout() {
    try {
      await logoutInternal();
    } catch {
      // no-op
    } finally {
      navigate(loginPath, { replace: true });
    }
  }

  async function handleApplyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loadAttendance(filters, actorCanManage);
  }

  async function handleResetFilters() {
    setFilters(defaultFilters);
    await loadAttendance(defaultFilters, actorCanManage);
  }

  function handleWorkPhotoFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);
    setWorkPhotoFiles(selectedFiles);
  }

  async function handleUploadWorkPhotos() {
    if (workPhotoFiles.length === 0) {
      setActionState({
        status: 'error',
        message: t('Vui lòng chọn ít nhất một ảnh công việc.'),
      });
      return;
    }

    setActionState({
      status: 'loading',
      message: t('Đang tải ảnh công việc lên Drive...'),
    });
    try {
      const uploadedPhotos = await uploadInternalAttendanceWorkPhotos(workPhotoFiles);
      setTodayWorkPhotos((previous) => [...uploadedPhotos, ...previous]);
      setTodayLog((previous) =>
        previous
          ? {
              ...previous,
              workPhotos: [...uploadedPhotos, ...previous.workPhotos],
            }
          : previous,
      );
      setWorkPhotoFiles([]);
      if (workPhotoInputRef.current) {
        workPhotoInputRef.current.value = '';
      }
      setActionState({
        status: 'success',
        message: t('Tải ảnh công việc lên Drive thành công. Ảnh sẽ được tổng hợp trong email check-out.'),
      });
      await loadAttendance(filters, actorCanManage);
    } catch (uploadError) {
      const message =
        uploadError instanceof Error ? uploadError.message : t('Không thể tải ảnh công việc.');
      setActionState({
        status: 'error',
        message,
      });
    }
  }

  async function handleCheckIn() {
    setActionState({
      status: 'loading',
      message: t('Đang check-in...'),
    });
    try {
      const gps = await captureGpsSnapshot();
      if (!gps.ok) {
        throw new Error(gps.message);
      }

      if (!photoDataUrl) {
        throw new Error(t('Bạn cần chụp ảnh camera trước khi check-in.'));
      }

      const log = await checkInInternalAttendance({
        note: clockNote.trim() || undefined,
        latitude: gps.latitude,
        longitude: gps.longitude,
        photoDataUrl,
      });
      setTodayLog(log);
      setClockNote('');
      setPhotoDataUrl('');
      setActionState({
        status: 'success',
        message: t('Check-in thành công.'),
      });
      await loadAttendance(filters, actorCanManage);
    } catch (clockError) {
      const message =
        clockError instanceof Error ? clockError.message : t('Không thể check-in.');
      setActionState({
        status: 'error',
        message,
      });
    }
  }

  async function handleCheckOut() {
    setActionState({
      status: 'loading',
      message: t('Đang check-out...'),
    });
    try {
      if (todayWorkPhotos.length === 0 && workPhotoFiles.length === 0) {
        throw new Error(t('Bạn cần chọn và tải ảnh công việc lên Drive trước khi check-out.'));
      }

      if (workPhotoFiles.length > 0) {
        setActionState({
          status: 'loading',
          message: t('Đang tải ảnh công việc lên Drive trước khi check-out...'),
        });
        const uploadedPhotos = await uploadInternalAttendanceWorkPhotos(workPhotoFiles);
        setTodayWorkPhotos((previous) => [...uploadedPhotos, ...previous]);
        setTodayLog((previous) =>
          previous
            ? {
                ...previous,
                workPhotos: [...uploadedPhotos, ...previous.workPhotos],
              }
            : previous,
        );
        setWorkPhotoFiles([]);
        if (workPhotoInputRef.current) {
          workPhotoInputRef.current.value = '';
        }
      }

      setActionState({
        status: 'loading',
        message: t('Đang check-out...'),
      });
      const gps = await captureGpsSnapshot();
      if (!gps.ok) {
        throw new Error(gps.message);
      }

      if (!photoDataUrl) {
        throw new Error(t('Bạn cần chụp ảnh camera trước khi check-out.'));
      }

      const log = await checkOutInternalAttendance({
        note: clockNote.trim() || undefined,
        latitude: gps.latitude,
        longitude: gps.longitude,
        photoDataUrl,
      });
      setTodayLog(log);
      setClockNote('');
      setPhotoDataUrl('');
      setActionState({
        status: 'success',
        message: t('Check-out thành công.'),
      });
      await loadAttendance(filters, actorCanManage);
    } catch (clockError) {
      const message =
        clockError instanceof Error ? clockError.message : t('Không thể check-out.');
      setActionState({
        status: 'error',
        message,
      });
    }
  }

  if (authChecking) {
    return (
      <>
        <Seo
          title={t('Báo cáo công việc')}
          description={t('Theo dõi check-in/check-out và ảnh công việc theo ngày của nhân viên.')}
        />
        <LoadingBlock />
      </>
    );
  }

  return (
    <>
      <Seo
        title={t('Báo cáo công việc')}
        description={t('Theo dõi check-in/check-out và ảnh công việc theo ngày của nhân viên.')}
      />

      <section className="page-hero">
        <p className="kicker">{t('QUẢN TRỊ')}</p>
        <h1>{t('Báo cáo công việc')}</h1>
        <p>{t('Check-in/check-out trên web, theo dõi lịch sử và ảnh công việc theo ngày.')}</p>
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
            onClick={() => void loadAttendance(filters, actorCanManage)}
            disabled={loading || actionState.status === 'loading'}
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

      <AdminModuleTabs actor={actor} />

      {error && <ErrorBlock message={error} />}
      {actionState.status === 'error' && <ErrorBlock message={actionState.message} />}
      {actionState.status === 'success' && (
        <div className="state-block success-text">{actionState.message}</div>
      )}

      <div className="attendance-report-grid">
        <section className="form-card attendance-clock-card">
          <div>
            <h2>{t('Báo cáo công việc hôm nay')}</h2>
            <p className="admin-empty">
              {t('Bắt buộc bật GPS và cho phép quyền vị trí khi check-in/check-out.')}
            </p>
            <p className="admin-empty">
              {t('Ngày')}: <strong>{formatDateLabel(todayDate)}</strong>
            </p>
            <p className="admin-empty">
              {t('Trạng thái')}{' '}
              <span className={`admin-status-pill ${todayStatus.className}`}>
                {t(todayStatus.label)}
              </span>
            </p>
            <p className="admin-empty">
              {t('Check-in')}: {formatDateTime(todayLog?.checkInAt ?? null)} | {t('Check-out')}:{' '}
              {formatDateTime(todayLog?.checkOutAt ?? null)}
            </p>
          </div>

          <div className="attendance-clock-actions">
            <label>
              {t('Ghi chú (tuỳ chọn)')}
              <input
                value={clockNote}
                onChange={(event) => setClockNote(event.target.value)}
                placeholder={t('Ví dụ: Đi công tác, vào ca chiều...')}
                disabled={actionState.status === 'loading'}
              />
            </label>

            <div className="attendance-gps-card">
              <p className="attendance-gps-title">{t('Vị trí GPS (bắt buộc)')}</p>
              <p className="attendance-gps-meta">
                {t('Trạng thái quyền')}: <strong>{getGpsPermissionLabel(gpsPermission)}</strong>
              </p>
              {gpsSnapshot ? (
                <p className="attendance-gps-meta">
                  {t('Tọa độ gần nhất')}: {gpsSnapshot.latitude.toFixed(6)}, {gpsSnapshot.longitude.toFixed(6)} ·{' '}
                  {formatDateTime(gpsSnapshot.capturedAt)}
                </p>
              ) : (
                <p className="attendance-gps-hint">{t('Chưa có tọa độ GPS. Bấm "Kiểm tra GPS" để yêu cầu quyền vị trí.')}</p>
              )}
              {gpsMessage ? <p className="attendance-gps-message">{gpsMessage}</p> : null}
              <button
                type="button"
                className="button-ghost"
                onClick={() => void captureGpsSnapshot()}
                disabled={actionState.status === 'loading'}
              >
                {t('Kiểm tra GPS')}
              </button>
            </div>

            <div className="attendance-camera-card">
              <p className="attendance-camera-title">{t('Ảnh check (bắt buộc)')}</p>
              {cameraError && <p className="attendance-camera-error">{cameraError}</p>}
              {photoDataUrl ? (
                <div className="attendance-photo-preview">
                  <img src={photoDataUrl} alt={t('Ảnh báo cáo công việc')} />
                </div>
              ) : (
                <p className="attendance-camera-hint">{t('Chưa có ảnh. Hãy mở camera và chụp ảnh.')}</p>
              )}

              {cameraOpen && (
                <div className="attendance-camera-live">
                  <video ref={videoRef} autoPlay muted playsInline />
                </div>
              )}

              <div className="attendance-camera-actions">
                {!cameraOpen ? (
                  <button
                    type="button"
                    className="button-ghost"
                    onClick={() => void handleOpenCamera()}
                    disabled={actionState.status === 'loading'}
                  >
                    {photoDataUrl ? t('Mở lại camera') : t('Mở camera')}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="button-solid"
                      onClick={handleCapturePhoto}
                      disabled={actionState.status === 'loading'}
                    >
                      {t('Chụp ảnh')}
                    </button>
                    <button
                      type="button"
                      className="button-ghost"
                      onClick={stopCamera}
                      disabled={actionState.status === 'loading'}
                    >
                      {t('Đóng camera')}
                    </button>
                  </>
                )}
                {photoDataUrl && !cameraOpen && (
                  <button
                    type="button"
                    className="button-ghost"
                    onClick={() => setPhotoDataUrl('')}
                    disabled={actionState.status === 'loading'}
                  >
                    {t('Xóa ảnh')}
                  </button>
                )}
              </div>

              <canvas ref={canvasRef} className="attendance-camera-canvas" />
            </div>

            <div className="admin-order-form-actions">
              <button
                type="button"
                className="button-solid"
                onClick={() => void handleCheckIn()}
                disabled={Boolean(todayLog?.checkInAt) || actionState.status === 'loading'}
              >
                {t('Check-in')}
              </button>
              <button
                type="button"
                className="button-ghost"
                onClick={() => void handleCheckOut()}
                disabled={!todayLog?.checkInAt || Boolean(todayLog?.checkOutAt) || actionState.status === 'loading'}
              >
                {t('Check-out')}
              </button>
            </div>
          </div>
        </section>

        <section className="form-card attendance-work-photo-card">
          <div className="attendance-work-photo-head">
            <div>
              <h2>{t('Ảnh công việc hôm nay')}</h2>
              <p className="admin-empty">
                {t('Tải ảnh công việc trong ngày lên thư mục Google Drive của ANSLIFE. Bắt buộc có ảnh công việc trước khi check-out. Mỗi ảnh tối đa 8MB.')}
              </p>
            </div>
            <div className="attendance-work-photo-actions">
              <input
                ref={workPhotoInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleWorkPhotoFileChange}
                disabled={actionState.status === 'loading'}
              />
              <button
                type="button"
                className="button-solid"
                onClick={() => void handleUploadWorkPhotos()}
                disabled={workPhotoFiles.length === 0 || actionState.status === 'loading'}
              >
                {t('Tải ảnh lên Drive')}
              </button>
            </div>
          </div>

          {workPhotoFiles.length > 0 && (
            <div className="attendance-work-photo-selected">
              <strong>{t('Ảnh đã chọn')}</strong>
              <ul>
                {workPhotoFiles.map((file) => (
                  <li key={`${file.name}-${file.size}-${file.lastModified}`}>
                    {file.name} · {formatFileSize(file.size)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {todayWorkPhotos.length === 0 ? (
            <p className="admin-empty">{t('Chưa có ảnh công việc nào được tải lên hôm nay.')}</p>
          ) : (
            <div className="attendance-work-photo-list">
              {todayWorkPhotos.map((photo) => (
                <a
                  key={photo.id}
                  href={photo.driveWebViewLink ?? '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="attendance-work-photo-item"
                >
                  <span>{photo.originalFileName ?? photo.fileName}</span>
                  <small>
                    {formatFileSize(photo.fileSize)} · {formatDateTime(photo.uploadedAt)}
                  </small>
                </a>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="filter-bar admin-order-filter">
        <form onSubmit={handleApplyFilters} className="admin-filter-form admin-filter-form-compact">
          <label>
            {t('Từ ngày')}
            <input
              type="date"
              value={filters.fromDate}
              onChange={(event) =>
                setFilters((previous) => ({
                  ...previous,
                  fromDate: event.target.value,
                }))
              }
            />
          </label>

          <label>
            {t('Đến ngày')}
            <input
              type="date"
              value={filters.toDate}
              onChange={(event) =>
                setFilters((previous) => ({
                  ...previous,
                  toDate: event.target.value,
                }))
              }
            />
          </label>

          {actorCanManage && (
            <label>
              {t('User ID')}
              <input
                value={filters.userId}
                onChange={(event) =>
                  setFilters((previous) => ({
                    ...previous,
                    userId: event.target.value,
                  }))
                }
                placeholder="12"
              />
            </label>
          )}

          <div className="admin-filter-actions">
            <button type="submit" className="button-solid" disabled={loading}>
              {loading ? t('Đang tải...') : t('Lọc dữ liệu')}
            </button>
            <button
              type="button"
              className="button-ghost"
              onClick={() => void handleResetFilters()}
              disabled={loading}
            >
              {t('Đặt lại')}
            </button>
          </div>
        </form>
      </section>

      <section className="form-card admin-users-card">
        <h2>{t('Lịch sử báo cáo công việc')}</h2>
        {loading && <LoadingBlock />}
        {!loading && logs.length === 0 && (
          <p className="admin-empty">{t('Chưa có dữ liệu báo cáo công việc phù hợp.')}</p>
        )}
        {!loading && logs.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-users-table admin-orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{t('Ngày')}</th>
                  <th>{t('Nhân sự')}</th>
                  <th>{t('Check-in')}</th>
                  <th>{t('Check-out')}</th>
                  <th>{t('Giờ công')}</th>
                  <th>{t('Ảnh vào')}</th>
                  <th>{t('Ảnh ra')}</th>
                  <th>{t('Ảnh công việc')}</th>
                  <th>{t('IP vào')}</th>
                  <th>{t('IP ra')}</th>
                  <th>{t('Ghi chú')}</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{formatDateLabel(log.attendanceDate)}</td>
                    <td>
                      {log.userFullName}
                      <br />
                      <small>{log.userEmail}</small>
                    </td>
                    <td>{formatDateTime(log.checkInAt)}</td>
                    <td>{formatDateTime(log.checkOutAt)}</td>
                    <td>{formatWorkingTime(log.workMinutes)}</td>
                    <td>
                      {resolveImageUrl(log.checkInPhotoUrl) ? (
                        <a
                          href={resolveImageUrl(log.checkInPhotoUrl) ?? '#'}
                          target="_blank"
                          rel="noreferrer"
                          className="attendance-log-photo-link"
                        >
                          <img
                            src={resolveImageUrl(log.checkInPhotoUrl) ?? ''}
                            alt={t('Ảnh check-in')}
                            className="attendance-log-photo-thumb"
                          />
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>
                      {resolveImageUrl(log.checkOutPhotoUrl) ? (
                        <a
                          href={resolveImageUrl(log.checkOutPhotoUrl) ?? '#'}
                          target="_blank"
                          rel="noreferrer"
                          className="attendance-log-photo-link"
                        >
                          <img
                            src={resolveImageUrl(log.checkOutPhotoUrl) ?? ''}
                            alt={t('Ảnh check-out')}
                            className="attendance-log-photo-thumb"
                          />
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>
                      {log.workPhotos.length > 0 ? (
                        <div className="attendance-work-photo-table-list">
                          {log.workPhotos.slice(0, 3).map((photo) => (
                            <a
                              key={photo.id}
                              href={photo.driveWebViewLink ?? '#'}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {photo.originalFileName ?? photo.fileName}
                            </a>
                          ))}
                          {log.workPhotos.length > 3 && (
                            <span>+{log.workPhotos.length - 3}</span>
                          )}
                        </div>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>{log.checkInIp ?? '-'}</td>
                    <td>{log.checkOutIp ?? '-'}</td>
                    <td>{log.note ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
