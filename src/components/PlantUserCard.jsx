import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const PlantUserCard = ({ plant }) => {
  const [plants, setPlants] = useState([]);

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

  return (
    <div className="plant-card">
      <div className="plant-info">
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
          <p className="font-semibold text-lg  text-sky-900">
            {plant.plantname}
          </p>
          <p className="font-medium text-base text-gray-600">
            {currentPlant.species}
          </p>
        </div>
      </div>
      <div className="plant-link chevron-double-right">
        <Link to={`/plantcare/${plant.plantSpecies}`}> info </Link>
      </div>
    </div>
  );
};

export default PlantUserCard;
