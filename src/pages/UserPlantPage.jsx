import { useEffect, useState } from "react";
import NavbarMobile from "../components/NavbarMobile";
import NewUserPlant from "../components/NewUserPlant";
import PlantUserCard from "../components/PlantUserCard";

const API_URL = import.meta.env.VITE_API_URL;


const UserPlantPage = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/userplants/65394a2885fd02741b6be230`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {setPlants(data.plants)})

      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {plants.map((plant, index) => (
        <PlantUserCard key={index} plant={plant} />
      ))}
      <NewUserPlant />
      <NavbarMobile />
    </div>
  );
};

export default UserPlantPage;

