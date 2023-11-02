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
  const [daysDifference, setDaysDifference] = useState();
  const [showNewUserPlant, setShowNewUserPlant] = useState(false);
  const [daysUntilWater, setDaysUntilWater] = useState();

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
        const lastCareDate = new Date(
          plant.careActivityDate[plant.careActivityDate.length - 1].dateOfCare
        );
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - lastCareDate.getTime();
        const daysDifference = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24)
        );
        setDaysDifference(daysDifference);

        if (daysDifference > frequencyDays) {
          setNeedWater(true);
        } else {
          const daysUntilWater = frequencyDays - daysDifference;
          setDaysUntilWater(daysUntilWater);
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
    <div className="plant-card w-11/12 lg:w-1/2 max-w-2xl duration-300">
      <div className="w-full">
        <div className="plant-info -ml-9 flex justify-between">
          {plant.plantPicture ? (
            <img
              className="rounded-full sm:rounded-2xl h-32 w-32 object-cover duration-300"
              src={plant.plantPicture}
              alt={plant.plantSpecies}
            />
          ) : (
            <img
              className="rounded-full sm:rounded-2xl h-32 w-32 object-cover duration-300"
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
            <p className="font-normal text-sm text-gray-600">
              {" "}
              {plant.plantCutting > 0
                ? "Plant cuttings available: " + plant.plantCutting
                : ""}
            </p>
            <p className="font-normal text-sm text-gray-600">
              {" "}
              {plant.plantSize !== "" ? "Plant size: " + plant.plantSize : ""}
            </p>
            {needWater ? (
              <p className="font-normal text-base text-red-600">
                {plant.plantName} needs water, thirsty for {daysDifference} days.
              </p>
            ) : (
              <p className="font-normal text-sm text-emerald-600">
                {plant.plantName} doesn't need water, water in {daysUntilWater}{" "}
                days.
              </p>
            )}
            <Link to={`/updateplant/${plant._id}`}>
              <button className="bg-emerald-600 text-white p-2 sm:p-3 px-3 sm:px-5 rounded-full self-center mt-2 sm:mt-2">
                Edit
              </button>
            </Link>
            <button
              onClick={handleDelete}
              className="bg-white text-emerald-600 p-2 sm:p-3 rounded-full self-center mt-2 sm:mt-2 sm:ml-4"
            >
              Delete
            </button>
            {showNewUserPlant ? (
              <button
                onClick={() => setShowNewUserPlant(false)}
                className="bg-white text-red-600 p-2 sm:p-3 rounded-full self-center mt-2 md:mt-10 sm:ml-4"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => setShowNewUserPlant(true)}
                className="bg-white text-emerald-600 p-2 sm:p-3 rounded-full self-center mt-2 sm:mt-10 sm:ml-4"
              >
                Water plant
              </button>
            )}
          </div>
        <div className="plant-link chevron-double-right">
          <Link to={`/plantcare/${plant.plantSpecies}`}>
            {" "}
            <ChevronDoubleRightIcon className="w-8 text-emerald-600" />{" "}
          </Link>
        </div>
        </div>
      </div>
      {showNewUserPlant && <NewUserPlant type="newCare" plantId={plant._id} />}
    </div>
  );
};

export default PlantUserCard;
