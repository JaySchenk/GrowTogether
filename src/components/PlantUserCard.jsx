import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

const API_URL = import.meta.env.VITE_API_URL;

const PlantUserCard = ({ plant, onDelete  }) => {
  const [plants, setPlants] = useState([]);
  const { userId } = useContext(SessionContext);

  useEffect(() => {
    fetch(`${API_URL}/api/plantcare`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPlants(data);
      })

      .catch((error) => console.log(error));
  }, []);

  if (!plants.length) {
    return null;
  }

  const currentPlant = plants.find((one) => one._id === plant.plantSpecies);

    const handleDelete = async () => {
        console.log(`${API_URL}/api/userplants/${userId}/${plant._id}`)
      try {
        const response = await fetch(`${API_URL}/api/userplants/${userId}/${plant._id}`, {
          method: "DELETE",
        });
  
        if (response.status === 202) {
            onDelete(plant._id);
        } else {
          console.error("Failed to delete plant");
        }
      } catch (error) {
        console.error("Error while deleting plant", error);
      }
    };

    return (
    <div className="plant-card">
      <div className="plant-info -ml-9">
        {plant.plantPicture ? (
          <img
            className="rounded-md"
            src={plant.plantPicture}
            alt={plant.plantSpecies}
          />
        ) : (
          <img
            className="rounded-2xl"
            src="https://ih1.redbubble.net/image.949338818.5434/aps,504x498,large,transparent-pad,600x600,f8f8f8.jpg"
            alt={plant.plantSpecies}
          />
        )}
        <div className="text-left ml-4">
          <p className="font-semibold text-lg capitalize text-sky-900">
            {plant.plantname}
          </p>
          <p className="font-medium text-base text-gray-600">
            {currentPlant?.species}
          </p>
          <button className="bg-emerald-600 text-white p-3 px-5 rounded-full self-center mt-10">
            Edit
          </button>
          <button onClick={handleDelete} className="bg-white text-emerald-600 p-3 rounded-full self-center mt-10 ml-4">
            Delete
          </button>
        </div>
      </div>
      <div className="plant-link chevron-double-right">
        <Link to={`/plantcare/${plant.plantSpecies}`}> info </Link>
      </div>
    </div>
  );
};

export default PlantUserCard;
