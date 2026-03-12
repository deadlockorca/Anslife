import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { DEFAULT_SITE_URL, SITE_NAME } from '../../config/site';

interface SeoProps {
  title: string;
  description: string;
  noIndex?: boolean;
  image?: string;
}

export default function Seo({
  title,
  description,
  noIndex = false,
  image,
}: SeoProps) {
  const location = useLocation();
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL
  ).replace(/\/$/, '');

  const canonicalUrl = `${siteUrl}${location.pathname}`;
  const fullTitle = `${title} | ${SITE_NAME}`;
  const ogImage = image ?? `${siteUrl}/og-default.svg`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={noIndex ? 'noindex,nofollow' : 'index,follow'}
      />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
