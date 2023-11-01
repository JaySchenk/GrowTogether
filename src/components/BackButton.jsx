import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline"

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button className="absolute top-6 left-4" onClick={handleGoBack}><ChevronLeftIcon className="w-8 text-sky-900"/></button>
  );
};

export default BackButton;