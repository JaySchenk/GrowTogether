import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import NewUserPlant from "./NewUserPlant";

const API_URL = import.meta.env.VITE_API_URL;

const PlantUserCard = ({ plant, fetchPlants }) => {
  const [plants, setPlants] = useState([]);
  const [needWater, setNeedWater] = useState(false);
  const { userId } = useContext(SessionContext);
  const [showNewUserPlant, setShowNewUserPlant] = useState(false);

  const checkWateringStatus = () => {
    if (
      plant.careActivityDate &&
      plant.careActivityDate.length > 0 &&
      plants.length > 0
    ) {
      const currentPlant = plants.find((one) => one._id === plant.plantSpecies);
      const waterFrequency = currentPlant.care_instructions.water.frequency;

      if (waterFrequency) {
        const frequencyDays = parseInt(waterFrequency.split(" ")[0]);
        const lastCareDate = new Date(plant.careActivityDate[0].dateOfCare);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - lastCareDate.getTime();
        const daysDifference = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24)
        );

        if (daysDifference > frequencyDays) {
          setNeedWater(true);
        }
      }
    }
  };

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

  useEffect(() => {
    if (plants.length > 0) {
      checkWateringStatus();
    }
  }, [plants]);

  if (!plants.length) {
    return null;
  }
  const handleFetchPlants = () => {
    fetchPlants();
  };

  const currentPlant = plants.find((one) => one._id === plant.plantSpecies);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/userplants/${userId}/${plant._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 202) {
        handleFetchPlants();
      } else {
        console.error("Failed to delete plant");
      }
    } catch (error) {
      console.error("Error while deleting plant", error);
    }
  };

  return (
    <div className="plant-card w-11/12 md:w-1/2 max-w-2xl duration-300">
      <div className="plant-info -ml-9">
        {plant.plantPicture ? (
          <img
            className="rounded-full sm:rounded-2xl h-1/5 duration-300"
            src={plant.plantPicture}
            alt={plant.plantSpecies}
          />
        ) : (
          <img
            className="rounded-full sm:rounded-2xl h-28 lg:h-36 duration-300"
            src="https://ih1.redbubble.net/image.949338818.5434/aps,504x498,large,transparent-pad,600x600,f8f8f8.jpg"
            alt={plant.plantSpecies}
          />
        )}
        <div className="text-left ml-4">
          <p className="font-semibold text-lg capitalize text-sky-900">
            {plant.plantName}
          </p>
          <p className="font-medium text-base text-gray-600">
            {currentPlant?.species}
          </p>
          <button className="bg-emerald-600 text-white p-2 sm:p-3 px-3 sm:px-5 rounded-full self-center mt-4 sm:mt-10">
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-white text-emerald-600 p-2 sm:p-3 rounded-full self-center mt-2 sm:mt-10 ml-4 sm:ml-4"
          >
            Delete
          </button>
          {showNewUserPlant ? (
            <button
              onClick={() => setShowNewUserPlant(false)}
              className="bg-white text-red-600 p-2 sm:p-3 rounded-full self-center mt-2 sm:mt-10 ml-4 sm:ml-4"
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={() => setShowNewUserPlant(true)}
              className="bg-white text-emerald-600 p-2 sm:p-3 rounded-full self-center mt-2 sm:mt-10 ml-4 sm:ml-4"
            >
              Water plant
            </button>
          )}
        </div>
      </div>
      <div className="plant-link chevron-double-right">
        <Link to={`/plantcare/${plant.plantSpecies}`}>
          {" "}
          <ChevronDoubleRightIcon className="w-8 text-emerald-600" />{" "}
        </Link>
      </div>
      {showNewUserPlant && <NewUserPlant type="newCare" plantId={plant._id} />}
    </div>
  );
};

export default PlantUserCard;
