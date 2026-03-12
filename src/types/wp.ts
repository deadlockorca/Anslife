export interface WpRenderedField {
  rendered: string;
}

export interface WpTerm {
  id: number;
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
  id: number;
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
  id: number;
  src: string;
  thumbnail?: string | null;
  alt?: string | null;
}

export interface WpProductSpecifications {
  product_code?: string | null;
  material?: string | null;
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
  id: number;
  name: string;
  slug: string;
}

export interface Cf7Response {
  status: string;
  message: string;
  invalid_fields?: Array<{ field: string; message: string }>;
}
