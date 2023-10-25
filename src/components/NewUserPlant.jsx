import React, { useContext, useState, useEffect } from 'react';
import { SessionContext } from '../contexts/SessionContext';

const NewUserPlant = () => {
  const [plants, setPlants] = useState([]);
  const [plantName, setPlantName] = useState('');
  const [plantSpecies, setPlantSpecies] = useState('');
  const [plantPicture, setPlantPicture] = useState('');
  const [plantCutting, setPlantCutting] = useState(0);
  const [plantSize, setPlantSize] = useState('');
  const [product, setProduct] = useState('');
  const [productUsedDate, setProductUsedDate] = useState('');
  const [activity, setActivity] = useState('');
  const [activityDate, setActivityDate] = useState('');
  const [reminderSettings, setReminderSettings] = useState(true);

  const { handleLogin } = useContext(SessionContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      plantname: plantName,
      plantSpecies: plantSpecies,
      plantPicture,
      plantCutting: plantCutting,
      plantSize: plantSize,
      productsUsed: [
        {
          product: product,
          dateUsed: productUsedDate ? new Date(productUsedDate) : new Date(),
        },
      ],
      careActivityDate: [
        {
          activity: activity,
          dateOfCare: activityDate ? new Date(activityDate) : new Date(),
        },
      ],
      reminderSettings: reminderSettings,
    };

    Object.keys(payload).forEach((key) => {
      if (payload[key] === undefined || payload[key] === null) {
        delete payload[key];
      }
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/userplants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 201) {
        const parsed = await response.json();
        console.log(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/plantcare`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPlants(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="m-auto max-w-md flex flex-col justify-center h-[calc(100vh-100px)]">
      {plants.length > 0 ? (
        <>
          <h1 className="text-xl font-bold text-center">New plant</h1>
          <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>
            <input
              type="text"
              value={plantName}
              onChange={(event) => setPlantName(event.target.value)}
              required
              placeholder="Plant name"
              className="p-2 border rounded-lg"
            />
            <select
              value={plantSpecies}
              onChange={(event) => setPlantSpecies(event.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="">Pick value</option>
              {plants.map((item) => (
                <option key={item._id} value={item.species}>
                  {item.species}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={plantPicture}
              onChange={(event) => setPlantPicture(event.target.value)}
              required
              placeholder="Picture of plant"
              className="p-2 border rounded-lg"
            />
            Plant cuttings available
            <input
              type="number"
              value={plantCutting}
              onChange={(event) => setPlantCutting(event.target.value)}
              required
              placeholder="Plant cuttings available"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              value={plantSize}
              onChange={(event) => setPlantSize(event.target.value)}
              required
              placeholder="Plant size"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              value={product}
              onChange={(event) => setProduct(event.target.value)}
              placeholder="Product's used on plant"
              className="p-2 border rounded-lg"
            />
            Date of using products
            <input
              type="date"
              value={productUsedDate}
              onChange={(event) => setProductUsedDate(event.target.value)}
              required
              placeholder="Date of using products"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              value={activity}
              onChange={(event) => setActivity(event.target.value)}
              required
              placeholder="Plant care activity"
              className="p-2 border rounded-lg"
            />
            Plant care activity date
            <input
              type="date"
              value={activityDate}
              onChange={(event) => setActivityDate(event.target.value)}
              required
              placeholder="Plant care activity date"
              className="p-2 border rounded-lg"
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                defaultChecked
                onChange={(event) => setReminderSettings(event.target.checked)}
                className="mr-2"
              />
              I want to receive plant care reminders
            </label>
            <button
              type="submit"
              className="p-2 bg-cyan text-white rounded-lg self-center mt-4"
            >
              Make Plant
            </button>
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NewUserPlant;

