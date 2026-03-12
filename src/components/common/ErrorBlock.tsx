interface ErrorBlockProps {
  message?: string;
}

export default function ErrorBlock({
  message = 'Không thể tải dữ liệu. Vui lòng thử lại sau.',
}: ErrorBlockProps) {
  return (
    <div className="state-block state-error" role="alert">
      {message}
    </div>
  );
}
