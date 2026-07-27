import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = 'anslife_session';
const SUPPORTED_LANGUAGES = new Set(['vn', 'en', 'jp', 'kr', 'sv', 'fr', 'ru', 'es', 'zh']);

function getPathSegments(pathname: string): string[] {
  return pathname.split('/').filter(Boolean);
}

function isAdminPath(pathname: string): boolean {
  const segments = getPathSegments(pathname);
  if (segments.length === 0) {
    return false;
  }

  const [first, second] = segments;
  if (SUPPORTED_LANGUAGES.has(first)) {
    return second === 'admin';
  }

  return first === 'admin';
}

function isProtectedPortalPath(pathname: string): boolean {
  const segments = getPathSegments(pathname);
  if (segments.length === 0) {
    return false;
  }

  const [first, second] = segments;
  if (SUPPORTED_LANGUAGES.has(first)) {
    return second === 'portal';
  }

  return first === 'portal';
}

function isAdminLoginPath(pathname: string): boolean {
  const segments = getPathSegments(pathname);
  if (segments.length === 0) {
    return false;
  }

  const [first, second, third] = segments;
  if (SUPPORTED_LANGUAGES.has(first)) {
    return second === 'admin' && third === 'login';
  }

  return first === 'admin' && second === 'login';
}

function resolveLanguage(pathname: string): string {
  const [first] = getPathSegments(pathname);
  if (first && SUPPORTED_LANGUAGES.has(first)) {
    return first;
  }
  return 'en';
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isProtectedPath = isAdminPath(pathname) || isProtectedPortalPath(pathname);
  if (!isProtectedPath || isAdminLoginPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value?.trim();
  if (token) {
    return NextResponse.next();
  }

  const language = resolveLanguage(pathname);
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = `/${language}/admin/login`;
  loginUrl.search = '';
  loginUrl.searchParams.set('next', `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/portal/:path*',
    '/:lang(vn|en|jp|kr|sv|fr|ru|es|zh)/admin/:path*',
    '/:lang(vn|en|jp|kr|sv|fr|ru|es|zh)/portal/:path*',
  ],
};
