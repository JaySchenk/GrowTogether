import { useContext, useEffect, useState } from "react";
import NavbarMobile from "../components/NavbarMobile";
import PlantUserCard from "../components/PlantUserCard";
import { SessionContext } from "../contexts/SessionContext";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const UserPlantPage = () => {
  const { userId } = useContext(SessionContext);
  const [plants, setPlants] = useState([]);
  console.log(plants);

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
  }, []);

  const handlePlantDelete = (plantId) => {
    setPlants((plants) => plants.filter((plant) => plant._id !== plantId));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Link to={`/createplant`}>
      <button
        className="bg-emerald-600 text-white p-3 rounded-full self-center mt-10 mb-4"
      >
        + Create
      </button>
      </Link>
      {plants.map((plant, index) => (
        <PlantUserCard key={index} plant={plant} onDelete={handlePlantDelete} /> 
      ))}
      <NavbarMobile />
    </div>
  );
};

export default UserPlantPage;
