import { SOCIAL_LINKS, type SocialKey } from '../../config/site';

interface SocialLinksProps {
  className?: string;
}

function renderSocialIcon(key: SocialKey) {
  switch (key) {
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M14.12 22v-8.22h2.77l.41-3.2h-3.18V8.53c0-.93.26-1.56 1.6-1.56h1.71V4.11A23.3 23.3 0 0 0 14.92 4c-2.48 0-4.17 1.52-4.17 4.3v2.28H8v3.2h2.75V22h3.37Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M16.98 3H7.02A4.02 4.02 0 0 0 3 7.02v9.96A4.02 4.02 0 0 0 7.02 21h9.96A4.02 4.02 0 0 0 21 16.98V7.02A4.02 4.02 0 0 0 16.98 3ZM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm5.33-9.87a1.16 1.16 0 1 1 0-2.32 1.16 1.16 0 0 1 0 2.32Zm-5.33 1.63A3.24 3.24 0 1 0 12 15.24a3.24 3.24 0 0 0 0-6.48Z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M22 12c0-2.2-.18-3.67-.39-4.52a2.93 2.93 0 0 0-2.08-2.08C18.67 5.2 17.2 5 15 5H9c-2.2 0-3.67.2-4.53.4a2.93 2.93 0 0 0-2.08 2.08C2.18 8.33 2 9.8 2 12c0 2.2.18 3.67.39 4.52a2.93 2.93 0 0 0 2.08 2.08c.86.2 2.33.4 4.53.4h6c2.2 0 3.67-.2 4.53-.4a2.93 2.93 0 0 0 2.08-2.08c.21-.85.39-2.32.39-4.52Zm-12.5 3.5v-7l6 3.5-6 3.5Z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M14.8 4h2.66c.25 1.32 1.02 2.44 2.13 3.06v2.8a6.95 6.95 0 0 1-2.05-.68v5.26a5.44 5.44 0 1 1-5.43-5.44c.35 0 .7.03 1.04.1v2.76a2.7 2.7 0 1 0 1.65 2.48V4Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function SocialLinks({ className = '' }: SocialLinksProps) {
  return (
    <div className={`social-links ${className}`.trim()}>
      {SOCIAL_LINKS.map((item) => (
        <a
          key={item.key}
          href={item.url}
          target="_blank"
          rel="noreferrer noopener"
          className={`social-link social-${item.key}`}
          aria-label={item.label}
          title={item.label}
        >
          {renderSocialIcon(item.key)}
        </a>
      ))}
    </div>
  );
}
