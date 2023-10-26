import { useEffect, useState } from "react";
import NavbarMobile from "../components/NavbarMobile";
import NewUserPlant from "../components/NewUserPlant";
import PlantUserCard from "../components/PlantUserCard";

const API_URL = import.meta.env.VITE_API_URL;


const UserPlantPage = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/plantcare`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {setPlants(data)})

      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex items-center justify-center">
      {plants.map((plant, index) => (
        <PlantUserCard key={index} plant={plant} />
      ))}
      <NewUserPlant />
      <NavbarMobile />
    </div>
  );
};

export default UserPlantPage;

