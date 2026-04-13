interface LoadingBlockProps {
  label?: string;
}

export default function LoadingBlock({
  label = 'Đang tải dữ liệu...',
}: LoadingBlockProps) {
  void label;
  return null;
}
