import { useContext, useEffect, useState } from "react";
import NavbarMobile from "../components/NavbarMobile";
import PlantUserCard from "../components/PlantUserCard";
import { SessionContext } from "../contexts/SessionContext";
import { Link } from "react-router-dom";
import NoPlant from "../../public/no_plants.jpg"

const API_URL = import.meta.env.VITE_API_URL;

const UserPlantPage = () => {
  const { userId } = useContext(SessionContext);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/userplants/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPlants(data.plants);
      })

      .catch((error) => console.log(error));
  }, [plants]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Link to={`/createplant`}>
      <button
        className="bg-emerald-600 text-white p-3 rounded-full self-center mt-10 mb-4"
      >
        + Create
      </button>
      </Link>
      {plants.length?plants.map((plant, index) => (
        <PlantUserCard key={index} plant={plant} /> 
      )):<div><p className="text-center font-medium text-gray-600 mt-6">Add your first plant</p><img className="img-no-plant max-w-1/2 md:max-w-sm" src={NoPlant}/></div>}
      <NavbarMobile />
    </div>
  );
};

export default UserPlantPage;
