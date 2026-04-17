export interface WpRenderedField {
  rendered: string;
}

export interface WpTerm {
  id: number | string;
  name: string;
  slug: string;
  taxonomy?: string;
}

export interface WpFeaturedMedia {
  source_url: string;
  alt_text?: string;
}

export interface WpEmbedded {
  'wp:featuredmedia'?: WpFeaturedMedia[];
  'wp:term'?: WpTerm[][];
}

export interface WpEntity {
  id: number | string;
  slug: string;
  date: string;
  link: string;
  title: WpRenderedField;
  content: WpRenderedField;
  excerpt: WpRenderedField;
  gallery?: WpProductGalleryImage[];
  specifications?: WpProductSpecifications;
  _embedded?: WpEmbedded;
}

export interface WpProductGalleryImage {
  id: number | string;
  src: string;
  thumbnail?: string | null;
  alt?: string | null;
}

export interface WpProductSpecifications {
  product_code?: string | null;
  material?: string | null;
  items?: Array<{
    name: string;
    value: string;
  }>;
  dimensions?: {
    l?: string | null;
    d?: string | null;
    h?: string | null;
  };
  seat?: {
    length?: string | null;
    depth?: string | null;
    height?: string | null;
  };
  note?: string | null;
}

export interface WpCategory {
  id: number | string;
  name: string;
  slug: string;
  parentId?: number | string | null;
}

export interface Cf7Response {
  status: string;
  message: string;
  invalid_fields?: Array<{ field: string; message: string }>;
}
