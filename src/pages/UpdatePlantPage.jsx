import { useParams } from "react-router-dom";
import UpdatePlant from "../components/UpdatePlant";
import BackButton from "../components/BackButton";

const UpdatePlantPage = () => {
  const { plantId } = useParams();
  return (
    <div className="flex items-center justify-center h-full pb-10">
        <BackButton/> 
      <UpdatePlant plantId={plantId} />
    </div>
  );
};

export default UpdatePlantPage;
