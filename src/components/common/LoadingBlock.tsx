interface LoadingBlockProps {
  label?: string;
}

export default function LoadingBlock({
  label = 'Đang tải dữ liệu từ CMS...',
}: LoadingBlockProps) {
  void label;
  return null;
}
