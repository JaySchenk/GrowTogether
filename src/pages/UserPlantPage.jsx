import { useContext, useEffect, useState } from "react";
import NavbarMobile from "../components/NavbarMobile";
import PlantUserCard from "../components/PlantUserCard";
import { SessionContext } from "../contexts/SessionContext";
import { Link, useNavigate } from "react-router-dom";
import NoPlant from "/no_plants.jpg"

const API_URL = import.meta.env.VITE_API_URL;

const UserPlantPage = () => {
  const navigate = useNavigate()
  const { userId } = useContext(SessionContext);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlants = () => {
    fetch(`${API_URL}/api/userplants/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPlants(data.plants);
        setLoading(false);
      })

      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
      fetchPlants();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Link to={`/createplant`}>
      <button
        className="bg-emerald-600 text-white p-3 rounded-full self-center mt-10 mb-4"
      >
        + Create
      </button>
      </Link>
      {loading ? (
        <p>Loading...</p>
      ):plants.length?plants.map((plant, index) => (
        <PlantUserCard key={index} plant={plant} fetchPlants={fetchPlants} /> 
      )):<div><p className="text-center font-medium text-gray-600 mt-6">Add your first plant</p><img className="img-no-plant max-w-1/2 md:max-w-sm" src={NoPlant}/></div>}
      <NavbarMobile />
    </div>
  );
};

export default UserPlantPage;
