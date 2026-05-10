import type { FormEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminModuleTabs from '../components/admin/AdminModuleTabs';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import useSiteI18n from '../hooks/useSiteI18n';
import { getCurrentUser, logoutInternal, type AuthUser } from '../lib/internalAuth';

type ProductTab = 'NEW' | 'BEST' | 'SALE';

type AdminCategory = {
  id: string;
  name: string;
  slug: string;
};

type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  imageUrls: string[];
  shortDescription: string | null;
  description: string | null;
  specs: Array<{
    id: string;
    name: string;
    value: string;
    sortOrder: number;
  }>;
  showContactPrice: boolean;
  price: number;
  originalPrice: number | null;
  badge: string | null;
  tab: ProductTab;
  inStock: boolean;
  isFeatured: boolean;
  categoryId: string | null;
  categoryName: string | null;
  createdAt: string;
};

type AdminListResponse = {
  ok: boolean;
  products?: AdminProduct[];
  categories?: AdminCategory[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters?: {
    search: string;
    categoryId: string;
    tab: ProductTab | null;
  };
  message?: string;
  error?: string;
};

type UploadImageResponse = {
  ok?: boolean;
  url?: string;
  message?: string;
  error?: string;
};

type ProductFormState = {
  name: string;
  slug: string;
  imageUrls: string[];
  shortDescription: string;
  description: string;
  specs: Array<{
    name: string;
    value: string;
  }>;
  showContactPrice: boolean;
  price: string;
  originalPrice: string;
  badge: string;
  tab: ProductTab;
  inStock: boolean;
  isFeatured: boolean;
  categoryId: string;
};

const MAX_PRODUCT_IMAGES = 5;
const MAX_PRODUCT_SPECS = 30;

const tabOptions: Array<{ value: ProductTab; label: string }> = [
  { value: 'NEW', label: 'Sản phẩm mới' },
  { value: 'BEST', label: 'Bán chạy nhất' },
  { value: 'SALE', label: 'Đang giảm giá' },
];

const emptyFormState: ProductFormState = {
  name: '',
  slug: '',
  imageUrls: [''],
  shortDescription: '',
  description: '',
  specs: [{ name: '', value: '' }],
  showContactPrice: false,
  price: '',
  originalPrice: '',
  badge: '',
  tab: 'NEW',
  inStock: true,
  isFeatured: false,
  categoryId: '',
};

function parseErrorMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return fallback;
  }

  const body = payload as { message?: unknown; error?: unknown };
  if (typeof body.message === 'string' && body.message.trim()) {
    return body.message;
  }
  if (typeof body.error === 'string' && body.error.trim()) {
    return body.error;
  }
  return fallback;
}

function formatDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(parsed);
}

function mapProductToFormState(product: AdminProduct): ProductFormState {
  return {
    name: product.name,
    slug: product.slug,
    imageUrls:
      product.imageUrls.length > 0
        ? product.imageUrls.slice(0, MAX_PRODUCT_IMAGES)
        : product.imageUrl
          ? [product.imageUrl]
          : [''],
    shortDescription: product.shortDescription ?? '',
    description: product.description ?? '',
    specs:
      product.specs.length > 0
        ? product.specs
            .slice()
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((item) => ({ name: item.name, value: item.value }))
        : [{ name: '', value: '' }],
    showContactPrice: product.showContactPrice,
    price: String(product.price),
    originalPrice: product.originalPrice == null ? '' : String(product.originalPrice),
    badge: product.badge ?? '',
    tab: product.tab,
    inStock: product.inStock,
    isFeatured: product.isFeatured,
    categoryId: product.categoryId ?? '',
  };
}

function getCleanImageUrls(imageUrls: string[]): string[] {
  const cleanedUrls: string[] = [];

  for (const raw of imageUrls) {
    const url = raw.trim();
    if (!url || cleanedUrls.includes(url)) {
      continue;
    }

    cleanedUrls.push(url);
    if (cleanedUrls.length >= MAX_PRODUCT_IMAGES) {
      break;
    }
  }

  return cleanedUrls;
}

function getCleanSpecs(specs: Array<{ name: string; value: string }>): Array<{ name: string; value: string }> {
  const cleanedSpecs: Array<{ name: string; value: string }> = [];

  for (const spec of specs) {
    const name = spec.name.trim();
    const value = spec.value.trim();

    if (!name && !value) {
      continue;
    }

    cleanedSpecs.push({ name, value });
    if (cleanedSpecs.length >= MAX_PRODUCT_SPECS) {
      break;
    }
  }

  return cleanedSpecs;
}

export default function AdminProductsPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const loginPath = useMemo(
    () => toLocalizedPath(`/admin/login?next=${encodeURIComponent('/admin/products')}`),
    [toLocalizedPath],
  );

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);

  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategoryId, setFilterCategoryId] = useState('');
  const [filterTab, setFilterTab] = useState<'' | ProductTab>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [form, setForm] = useState<ProductFormState>(emptyFormState);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImageIndex, setUploadingImageIndex] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const currencyFormatter = useMemo(() => new Intl.NumberFormat('vi-VN'), []);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const searchParams = new URLSearchParams();
      searchParams.set('page', String(currentPage));
      searchParams.set('limit', String(pageSize));
      if (searchQuery) {
        searchParams.set('search', searchQuery);
      }
      if (filterCategoryId) {
        searchParams.set('categoryId', filterCategoryId);
      }
      if (filterTab) {
        searchParams.set('tab', filterTab);
      }

      const response = await fetch(`/api/internal/catalog-products?${searchParams.toString()}`, {
        method: 'GET',
        cache: 'no-store',
      });
      const payload = (await response.json()) as AdminListResponse;

      if (response.status === 401) {
        navigate(loginPath, { replace: true });
        return;
      }

      if (!response.ok || !payload.ok) {
        throw new Error(parseErrorMessage(payload, 'Không thể tải dữ liệu sản phẩm.'));
      }

      setProducts(Array.isArray(payload.products) ? payload.products : []);
      setCategories(Array.isArray(payload.categories) ? payload.categories : []);

      const pagination = payload.pagination;
      if (pagination) {
        setTotalProducts(pagination.total);
        setTotalPages(pagination.totalPages);
        if (pagination.page !== currentPage) {
          setCurrentPage(pagination.page);
        }
      } else {
        setTotalProducts(Array.isArray(payload.products) ? payload.products.length : 0);
        setTotalPages(1);
      }
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : t('Không thể tải dữ liệu quản trị sản phẩm.');
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filterCategoryId, filterTab, loginPath, navigate, pageSize, searchQuery, t]);

  useEffect(() => {
    let mounted = true;

    async function bootstrapPage() {
      try {
        const currentUser = await getCurrentUser();
        if (!mounted) {
          return;
        }

        if (!currentUser) {
          navigate(loginPath, { replace: true });
          return;
        }

        setActor(currentUser);
      } finally {
        if (mounted) {
          setAuthChecking(false);
        }
      }
    }

    void bootstrapPage();

    return () => {
      mounted = false;
    };
  }, [loginPath, navigate]);

  useEffect(() => {
    if (!authChecking && actor) {
      void loadData();
    }
  }, [actor, authChecking, loadData]);

  const resetForm = () => {
    setForm(emptyFormState);
    setEditingId(null);
  };

  const applyFilters = () => {
    setCurrentPage(1);
    setSearchQuery(searchInput.trim());
  };

  const resetFilters = () => {
    setSearchInput('');
    setSearchQuery('');
    setFilterCategoryId('');
    setFilterTab('');
    setCurrentPage(1);
  };

  const updateImageAt = (index: number, value: string) => {
    setForm((previous) => {
      const nextImageUrls = [...previous.imageUrls];
      nextImageUrls[index] = value;
      return {
        ...previous,
        imageUrls: nextImageUrls,
      };
    });
  };

  const addImageSlot = () => {
    setForm((previous) => {
      if (previous.imageUrls.length >= MAX_PRODUCT_IMAGES) {
        return previous;
      }

      return {
        ...previous,
        imageUrls: [...previous.imageUrls, ''],
      };
    });
  };

  const removeImageSlot = (index: number) => {
    setForm((previous) => {
      const nextImageUrls = previous.imageUrls.filter((_, currentIndex) => currentIndex !== index);
      if (nextImageUrls.length === 0) {
        nextImageUrls.push('');
      }

      return {
        ...previous,
        imageUrls: nextImageUrls,
      };
    });
  };

  async function handleUploadImage(index: number, file: File) {
    if (uploadingImageIndex !== null || isSubmitting) {
      return;
    }

    setError('');
    setSuccessMessage('');
    setUploadingImageIndex(index);

    try {
      const formData = new FormData();
      formData.set('file', file);
      formData.set('folder', 'products');

      const response = await fetch('/api/internal/catalog-products/upload', {
        method: 'POST',
        body: formData,
      });

      const payload = (await response.json()) as UploadImageResponse;
      if (!response.ok || payload.ok !== true || typeof payload.url !== 'string') {
        throw new Error(parseErrorMessage(payload, 'Không thể tải ảnh lên R2.'));
      }

      updateImageAt(index, payload.url);
      setSuccessMessage('Đã tải ảnh lên R2.');
    } catch (uploadError) {
      const message =
        uploadError instanceof Error ? uploadError.message : 'Không thể tải ảnh lên R2.';
      setError(message);
    } finally {
      setUploadingImageIndex(null);
    }
  }

  const updateSpecAt = (index: number, key: 'name' | 'value', value: string) => {
    setForm((previous) => {
      const nextSpecs = [...previous.specs];
      const current = nextSpecs[index] ?? { name: '', value: '' };
      nextSpecs[index] = { ...current, [key]: value };
      return {
        ...previous,
        specs: nextSpecs,
      };
    });
  };

  const addSpecRow = () => {
    setForm((previous) => {
      if (previous.specs.length >= MAX_PRODUCT_SPECS) {
        return previous;
      }

      return {
        ...previous,
        specs: [...previous.specs, { name: '', value: '' }],
      };
    });
  };

  const removeSpecRow = (index: number) => {
    setForm((previous) => {
      const nextSpecs = previous.specs.filter((_, currentIndex) => currentIndex !== index);
      if (nextSpecs.length === 0) {
        nextSpecs.push({ name: '', value: '' });
      }

      return {
        ...previous,
        specs: nextSpecs,
      };
    });
  };

  async function handleLogout() {
    try {
      await logoutInternal();
    } catch {
      // no-op
    } finally {
      navigate(loginPath, { replace: true });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      const endpoint = editingId
        ? `/api/internal/catalog-products/${encodeURIComponent(editingId)}`
        : '/api/internal/catalog-products';
      const method = editingId ? 'PATCH' : 'POST';
      const cleanImageUrls = getCleanImageUrls(form.imageUrls);
      const cleanSpecs = getCleanSpecs(form.specs);
      const primaryImageUrl = cleanImageUrls[0] ?? '';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          slug: form.slug,
          imageUrl: primaryImageUrl,
          imageUrls: cleanImageUrls,
          shortDescription: form.shortDescription,
          description: form.description,
          specs: cleanSpecs,
          showContactPrice: form.showContactPrice,
          price: form.price,
          originalPrice: form.originalPrice,
          badge: form.badge,
          tab: form.tab,
          inStock: form.inStock,
          isFeatured: form.isFeatured,
          categoryId: form.categoryId,
        }),
      });

      const payload = (await response.json()) as { ok?: boolean; message?: string; error?: string };
      if (!response.ok || payload.ok !== true) {
        throw new Error(parseErrorMessage(payload, 'Không thể lưu sản phẩm.'));
      }

      resetForm();
      setSuccessMessage(editingId ? 'Đã cập nhật sản phẩm.' : 'Đã thêm sản phẩm mới.');
      await loadData();
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : 'Không thể lưu sản phẩm.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(product: AdminProduct) {
    const shouldDelete = window.confirm(`Xóa sản phẩm "${product.name}"?`);
    if (!shouldDelete) {
      return;
    }

    setDeletingId(product.id);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch(`/api/internal/catalog-products/${encodeURIComponent(product.id)}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      });

      const payload = (await response.json()) as { ok?: boolean; message?: string; error?: string };
      if (!response.ok || payload.ok !== true) {
        throw new Error(parseErrorMessage(payload, 'Không thể xóa sản phẩm.'));
      }

      if (editingId === product.id) {
        resetForm();
      }

      setSuccessMessage('Đã xóa sản phẩm.');
      await loadData();
    } catch (deleteError) {
      const message =
        deleteError instanceof Error ? deleteError.message : 'Không thể xóa sản phẩm.';
      setError(message);
    } finally {
      setDeletingId(null);
    }
  }

  if (authChecking) {
    return (
      <>
        <Seo
          title={t('Quản trị sản phẩm')}
          description={t('Quản trị danh mục và sản phẩm từ cơ sở dữ liệu SQL đã import.')}
        />
        <LoadingBlock />
      </>
    );
  }

  return (
    <>
      <Seo
        title={t('Quản trị sản phẩm')}
        description={t('Quản trị danh mục và sản phẩm từ cơ sở dữ liệu SQL đã import.')}
      />

      <section className="page-hero">
        <p className="kicker">{t('QUẢN TRỊ')}</p>
        <h1>{t('Quản trị sản phẩm')}</h1>
        <p>
          {t(
            'Dữ liệu đang lấy trực tiếp từ bảng product/category trong SQL toamhoanhao. Bạn có thể thêm, sửa, xóa giống bên hệ thống nguồn.',
          )}
        </p>
      </section>

      <section className="admin-toolbar">
        <div>
          <strong>{actor?.fullName ?? '-'}</strong>
          <p>{actor?.email ?? ''}</p>
        </div>
        <div className="admin-toolbar-actions">
          <button type="button" className="button-ghost" onClick={() => void loadData()}>
            {t('Làm mới')}
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

      {error && <ErrorBlock message={error} />}
      {successMessage && <div className="state-block success-text">{successMessage}</div>}

      <section className="admin-layout-grid-wide">
        <article className="form-card admin-product-editor-card">
          <h2>{editingId ? t('Sửa sản phẩm') : t('Thêm sản phẩm mới')}</h2>

          <form onSubmit={handleSubmit} className="admin-product-form">
            <label>
              {t('Tên sản phẩm *')}
              <input
                required
                value={form.name}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    name: event.target.value,
                  }))
                }
                disabled={isSubmitting}
              />
            </label>

            <label>
              {t('Slug (để trống sẽ tự tạo)')}
              <input
                value={form.slug}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    slug: event.target.value,
                  }))
                }
                disabled={isSubmitting}
              />
            </label>

            <div className="admin-product-form-grid">
              <label>
                {t('Danh mục')}
                <select
                  value={form.categoryId}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      categoryId: event.target.value,
                    }))
                  }
                  disabled={isSubmitting}
                >
                  <option value="">{t('Không chọn danh mục')}</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                {t('Tab hiển thị')}
                <select
                  value={form.tab}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      tab: event.target.value as ProductTab,
                    }))
                  }
                  disabled={isSubmitting}
                >
                  {tabOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                {form.showContactPrice ? t('Giá bán (đang ẩn)') : t('Giá bán *')}
                <input
                  required={!form.showContactPrice}
                  disabled={isSubmitting || form.showContactPrice}
                  inputMode="numeric"
                  value={form.price}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      price: event.target.value,
                    }))
                  }
                />
              </label>

              <label>
                {form.showContactPrice ? t('Giá gốc (đang ẩn)') : t('Giá gốc')}
                <input
                  disabled={isSubmitting || form.showContactPrice}
                  inputMode="numeric"
                  value={form.originalPrice}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      originalPrice: event.target.value,
                    }))
                  }
                />
              </label>

              <label>
                {t('Badge')}
                <input
                  value={form.badge}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      badge: event.target.value,
                    }))
                  }
                  disabled={isSubmitting}
                />
              </label>

              <div className="admin-product-checkboxes">
                <label className="admin-checkbox-inline">
                  <input
                    type="checkbox"
                    checked={form.showContactPrice}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        showContactPrice: event.target.checked,
                      }))
                    }
                    disabled={isSubmitting}
                  />
                  {t('Hiển thị giá dạng "Liên hệ"')}
                </label>

                <label className="admin-checkbox-inline">
                  <input
                    type="checkbox"
                    checked={form.inStock}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        inStock: event.target.checked,
                      }))
                    }
                    disabled={isSubmitting}
                  />
                  {t('Còn hàng')}
                </label>

                <label className="admin-checkbox-inline">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        isFeatured: event.target.checked,
                      }))
                    }
                    disabled={isSubmitting}
                  />
                  {t('Sản phẩm nổi bật')}
                </label>
              </div>
            </div>

            <label>
              {t('Mô tả ngắn')}
              <textarea
                rows={3}
                value={form.shortDescription}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    shortDescription: event.target.value,
                  }))
                }
                disabled={isSubmitting}
              />
            </label>

            <label>
              {t('Mô tả chi tiết')}
              <textarea
                rows={6}
                value={form.description}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    description: event.target.value,
                  }))
                }
                disabled={isSubmitting}
              />
            </label>

            <div className="admin-product-block">
              <div className="admin-product-block-head">
                <h3>{t('Ảnh sản phẩm')}</h3>
                <p>
                  {getCleanImageUrls(form.imageUrls).length}/{MAX_PRODUCT_IMAGES} {t('ảnh hợp lệ')}
                </p>
              </div>

              {form.imageUrls.map((url, index) => (
                <div key={`image-${index}`} className="admin-product-row-card">
                  <label>
                    {t(`Ảnh ${index + 1}`)}
                    <input
                      value={url}
                      onChange={(event) => updateImageAt(index, event.target.value)}
                      disabled={isSubmitting}
                      placeholder="https://..."
                    />
                  </label>

                  <label>
                    {t('Upload ảnh từ máy')}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const nextFile = event.currentTarget.files?.[0];
                        event.currentTarget.value = '';
                        if (!nextFile) {
                          return;
                        }
                        void handleUploadImage(index, nextFile);
                      }}
                      disabled={isSubmitting || uploadingImageIndex !== null}
                    />
                  </label>

                  {uploadingImageIndex === index && (
                    <p className="admin-empty">{t('Đang tải ảnh lên R2...')}</p>
                  )}

                  {index > 0 && (
                    <button
                      type="button"
                      className="button-ghost admin-row-action"
                      onClick={() => removeImageSlot(index)}
                      disabled={isSubmitting}
                    >
                      {t('Xóa ảnh')}
                    </button>
                  )}
                </div>
              ))}

              {form.imageUrls.length < MAX_PRODUCT_IMAGES && (
                <button
                  type="button"
                  className="button-ghost admin-row-action"
                  onClick={addImageSlot}
                  disabled={isSubmitting}
                >
                  {t('+ Thêm ảnh')}
                </button>
              )}
            </div>

            <div className="admin-product-block">
              <div className="admin-product-block-head">
                <h3>{t('Thông số sản phẩm')}</h3>
                <p>
                  {getCleanSpecs(form.specs).length}/{MAX_PRODUCT_SPECS} {t('dòng hợp lệ')}
                </p>
              </div>

              {form.specs.map((spec, index) => (
                <div key={`spec-${index}`} className="admin-product-row-card admin-product-row-grid">
                  <label>
                    {t(`Tên thông số ${index + 1}`)}
                    <input
                      value={spec.name}
                      onChange={(event) => updateSpecAt(index, 'name', event.target.value)}
                      disabled={isSubmitting}
                    />
                  </label>

                  <label>
                    {t('Giá trị')}
                    <input
                      value={spec.value}
                      onChange={(event) => updateSpecAt(index, 'value', event.target.value)}
                      disabled={isSubmitting}
                    />
                  </label>

                  {index > 0 && (
                    <button
                      type="button"
                      className="button-ghost admin-row-action"
                      onClick={() => removeSpecRow(index)}
                      disabled={isSubmitting}
                    >
                      {t('Xóa dòng')}
                    </button>
                  )}
                </div>
              ))}

              {form.specs.length < MAX_PRODUCT_SPECS && (
                <button
                  type="button"
                  className="button-ghost admin-row-action"
                  onClick={addSpecRow}
                  disabled={isSubmitting}
                >
                  {t('+ Thêm thông số')}
                </button>
              )}
            </div>

            <div className="admin-order-form-actions">
              <button type="submit" className="button-solid" disabled={isSubmitting}>
                {isSubmitting
                  ? t('Đang lưu...')
                  : editingId
                    ? t('Cập nhật sản phẩm')
                    : t('Thêm sản phẩm')}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="button-ghost"
                  onClick={resetForm}
                  disabled={isSubmitting}
                >
                  {t('Hủy sửa')}
                </button>
              )}
            </div>
          </form>
        </article>

        <article className="form-card admin-users-card">
          <h2>{t('Danh sách sản phẩm')}</h2>

          <div className="admin-product-filter-grid">
            <label>
              {t('Tìm theo tên / slug')}
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    applyFilters();
                  }
                }}
              />
            </label>

            <label>
              {t('Danh mục')}
              <select
                value={filterCategoryId}
                onChange={(event) => setFilterCategoryId(event.target.value)}
              >
                <option value="">{t('Tất cả danh mục')}</option>
                {categories.map((category) => (
                  <option key={`filter-category-${category.id}`} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              {t('Tab')}
              <select
                value={filterTab}
                onChange={(event) => setFilterTab(event.target.value as '' | ProductTab)}
              >
                <option value="">{t('Tất cả tab')}</option>
                {tabOptions.map((option) => (
                  <option key={`tab-${option.value}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              {t('Mỗi trang')}
              <select
                value={pageSize}
                onChange={(event) => {
                  setCurrentPage(1);
                  setPageSize(Number(event.target.value));
                }}
              >
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
            </label>

            <div className="admin-filter-actions">
              <button type="button" className="button-solid" onClick={applyFilters}>
                {t('Áp dụng')}
              </button>
              <button type="button" className="button-ghost" onClick={resetFilters}>
                {t('Xóa lọc')}
              </button>
            </div>
          </div>

          {!loading && (
            <p className="admin-empty">
              {t('Hiển thị')} {totalProducts === 0 ? 0 : (currentPage - 1) * pageSize + 1} -{' '}
              {totalProducts === 0 ? 0 : Math.min((currentPage - 1) * pageSize + products.length, totalProducts)} /{' '}
              {totalProducts} {t('sản phẩm')}
            </p>
          )}

          {loading ? (
            <LoadingBlock />
          ) : products.length === 0 ? (
            <p className="admin-empty">{t('Chưa có sản phẩm nào trong database.')}</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-product-table">
                <thead>
                  <tr>
                    <th>{t('Tên sản phẩm')}</th>
                    <th>{t('Tab')}</th>
                    <th>{t('Giá')}</th>
                    <th>{t('Danh mục')}</th>
                    <th>{t('Trạng thái')}</th>
                    <th>{t('Cập nhật')}</th>
                    <th>{t('Thao tác')}</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <strong>{product.name}</strong>
                        <p className="admin-product-meta">/{product.slug}</p>
                      </td>
                      <td>{product.tab}</td>
                      <td>
                        {product.showContactPrice ? (
                          <span className="error-text">{t('Liên hệ')}</span>
                        ) : (
                          <>
                            {currencyFormatter.format(product.price)}
                            {product.originalPrice != null && (
                              <span className="admin-product-old-price">
                                {currencyFormatter.format(product.originalPrice)}
                              </span>
                            )}
                          </>
                        )}
                      </td>
                      <td>{product.categoryName ?? t('Chưa gán')}</td>
                      <td>
                        <div className="admin-product-status-stack">
                          <span className={product.inStock ? 'admin-status-pill is-success' : 'admin-status-pill is-error'}>
                            {product.inStock ? t('Còn hàng') : t('Hết hàng')}
                          </span>
                          {product.isFeatured && <span className="admin-status-pill is-info">{t('Nổi bật')}</span>}
                        </div>
                      </td>
                      <td>{formatDate(product.createdAt)}</td>
                      <td>
                        <div className="admin-product-actions">
                          <button
                            type="button"
                            className="button-ghost admin-row-action"
                            onClick={() => {
                              setEditingId(product.id);
                              setForm(mapProductToFormState(product));
                              setSuccessMessage('');
                              setError('');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                          >
                            {t('Sửa')}
                          </button>
                          <button
                            type="button"
                            className="button-ghost admin-row-action"
                            disabled={deletingId === product.id}
                            onClick={() => {
                              void handleDelete(product);
                            }}
                          >
                            {deletingId === product.id ? t('Đang xóa...') : t('Xóa')}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && totalPages > 1 && (
            <div className="admin-pagination-row">
              <p>
                {t('Trang')} <strong>{currentPage}</strong> / {totalPages}
              </p>
              <div className="admin-product-actions">
                <button
                  type="button"
                  className="button-ghost"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((previous) => Math.max(1, previous - 1))}
                >
                  {t('← Trước')}
                </button>
                <button
                  type="button"
                  className="button-ghost"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((previous) => Math.min(totalPages, previous + 1))}
                >
                  {t('Sau →')}
                </button>
              </div>
            </div>
          )}
        </article>
      </section>
    </>
  );
}
