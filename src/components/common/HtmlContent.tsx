import { useNavigate } from 'react-router-dom';

interface HtmlContentProps {
  html?: string;
  className?: string;
}

export default function HtmlContent({ html, className }: HtmlContentProps) {
  const navigate = useNavigate();

  if (!html) {
    return null;
  }

  const handleArticleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.defaultPrevented) {
      return;
    }

    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const targetElement = event.target;
    if (!(targetElement instanceof Element)) {
      return;
    }

    const anchor = targetElement.closest('a[href]');
    if (!(anchor instanceof HTMLAnchorElement)) {
      return;
    }

    if (anchor.target && anchor.target !== '_self') {
      return;
    }

    if (anchor.hasAttribute('download')) {
      return;
    }

    const href = anchor.getAttribute('href')?.trim();
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return;
    }

    let resolvedUrl: URL;
    try {
      resolvedUrl = new URL(href, window.location.href);
    } catch {
      return;
    }

    if (resolvedUrl.origin !== window.location.origin) {
      return;
    }

    event.preventDefault();
    navigate(`${resolvedUrl.pathname}${resolvedUrl.search}${resolvedUrl.hash}`);
  };

  return (
    <article
      className={className ?? 'html-content'}
      onClick={handleArticleClick}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
