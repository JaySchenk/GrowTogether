import React, { useContext, useState, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";

const UpdatePlant = ({ plantId }) => {
  const [plants, setPlants] = useState([]);
  const [plantName, setPlantName] = useState();
  const [plantSpecies, setPlantSpecies] = useState("");
  const [plantPicture, setPlantPicture] = useState("");
  const [plantCutting, setPlantCutting] = useState(0);
  const [plantSize, setPlantSize] = useState("");
  const [product, setProduct] = useState([]);
  const [activity, setActivity] = useState([]);
  const [reminderSettings, setReminderSettings] = useState(true);
  const { userId } = useContext(SessionContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      plantName: plantName,
      plantSpecies: plantSpecies,
      plantPicture,
      plantCutting: plantCutting,
      plantSize: plantSize,
      reminderSettings: reminderSettings,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/userplantsUpdate/${plantId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        console.log("Plant updated successfully");
      } else {
        console.error("Failed to update plant");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/plantcare`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPlants(data);
        fetch(`${import.meta.env.VITE_API_URL}/api/plant/${plantId}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((userPlantData) => {
            setPlantName(userPlantData.plant.plantName);
            setPlantSpecies(userPlantData.plant.plantSpecies._id);
            setPlantPicture(userPlantData.plant.plantPicture);
            setPlantCutting(userPlantData.plant.plantCutting);
            setPlantSize(userPlantData.plant.plantSize);
            setReminderSettings(userPlantData.plant.reminderSettings);
            setProduct(userPlantData.plant.productsUsed);
            setActivity(userPlantData.plant.careActivityDate);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className='m-auto max-w-md flex flex-col justify-center'>
      <h1 className='text-xl font-bold text-center'>Update plant</h1>
      {plantName ? (
        <form className='flex flex-col gap-4 mt-8' onSubmit={handleSubmit}>
          <input
            type='text'
            value={plantName}
            onChange={(event) => setPlantName(event.target.value)}
            required
            placeholder='Plant name'
            className='p-2 border rounded-lg'
          />
          <select
            value={plantSpecies}
            onChange={(event) => setPlantSpecies(event.target.value)}
            className='p-2 border rounded-lg'
          >
            <option value=''>Pick value</option>
            {plants.map((item) => (
              <option key={item._id} value={item._id}>
                {item.species}
              </option>
            ))}
          </select>
          <input
            type='text'
            value={plantPicture}
            onChange={(event) => setPlantPicture(event.target.value)}
            placeholder='Plant picture'
            className='p-2 border rounded-lg'
          />
          <input
            type='number'
            value={plantCutting}
            onChange={(event) => setPlantCutting(event.target.value)}
            required
            placeholder='Plant cuttings available'
            className='p-2 border rounded-lg'
          />
          <input
            type='text'
            value={plantSize}
            onChange={(event) => setPlantSize(event.target.value)}
            required
            placeholder='Plant size'
            className='p-2 border rounded-lg'
          />

          <label className='flex items-center'>
            <input
              type='checkbox'
              defaultChecked
              onChange={(event) => setReminderSettings(event.target.checked)}
              className='mr-2'
            />
            I want to receive plant care reminders
          </label>
          <button
            type='submit'
            className='bg-emerald-600 text-white p-2 rounded-lg self-center mt-4'
          >
            Update Plant
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UpdatePlant;
