import { Button } from "@/shared/ui/Button.tsx";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

function BackButton() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Button variant="outline" onClick={handleBack}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      뒤로가기
    </Button>
  );
}

export default BackButton;
