import { Card } from "@/shared/ui/Card.tsx";
import ErrorContent from "@/shared/ui/ErrorContent.tsx";

interface ErrorCardProps {
  message?: string;
}

function ErrorCard({ message = "정보를 불러올 수 없습니다" }: ErrorCardProps) {
  return (
    <Card>
      <ErrorContent message={message} />
    </Card>
  );
}

export default ErrorCard;
