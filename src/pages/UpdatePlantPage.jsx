import { useParams } from "react-router-dom";
import UpdatePlant from "../components/UpdatePlant";

const UpdatePlantPage = () => {
    const {plantId} = useParams()
   return(
   <UpdatePlant plantId = {plantId} />
   )

}

export default UpdatePlantPage;