import { useContext, useEffect, useState } from "react";
import NavbarMobile from "../components/NavbarMobile";
import NewUserPlant from "../components/NewUserPlant";
import PlantUserCard from "../components/PlantUserCard";
import { SessionContext } from "../contexts/SessionContext";

const API_URL = import.meta.env.VITE_API_URL;

const UserPlantPage = () => {
  const { userId } = useContext(SessionContext);
  const [plants, setPlants] = useState([]);
  console.log(plants)

  useEffect(() => {
    fetch(`${API_URL}/api/userplants/${userId }`)
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

