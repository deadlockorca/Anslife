interface HtmlContentProps {
  html?: string;
  className?: string;
}

export default function HtmlContent({ html, className }: HtmlContentProps) {
  if (!html) {
    return null;
  }

  return (
    <article
      className={className ?? 'html-content'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
