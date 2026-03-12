import type { WpEntity, WpTerm } from '../types/wp';

export function stripHtmlTags(value: string): string {
  return value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
}

export function getFeaturedImage(post: WpEntity): string | null {
  const media = post._embedded?.['wp:featuredmedia'];
  if (!media || media.length === 0) {
    return null;
  }

  return media[0].source_url ?? null;
}

export function getTermsByTaxonomy(post: WpEntity, taxonomy: string): WpTerm[] {
  const allTermGroups = post._embedded?.['wp:term'];
  if (!allTermGroups) {
    return [];
  }

  const allTerms = allTermGroups.flat();
  return allTerms.filter((term) => term.taxonomy === taxonomy);
}

export function decodeHtml(value: string): string {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(value, 'text/html');
  return parsed.documentElement.textContent ?? '';
}
