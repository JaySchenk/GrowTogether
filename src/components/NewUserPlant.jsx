import React, { useContext, useState, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";

const NewUserPlant = () => {
  const [plants, setPlants] = useState([]);
  const [plantName, setPlantName] = useState("");
  const [plantSpecies, setPlantSpecies] = useState("");
  const [plantPicture, setPlantPicture] = useState("");
  const [plantCutting, setPlantCutting] = useState(0);
  const [plantSize, setPlantSize] = useState("");
  const [product, setProduct] = useState("");
  const [productUsedDate, setProductUsedDate] = useState("");
  const [activity, setActivity] = useState("");
  const [activityDate, setActivityDate] = useState("");
  const [reminderSettings, setReminderSettings] = useState(true);

  const { userId } = useContext(SessionContext);

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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/userplants`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.status === 201) {
        const parsed = await response.json();
        const newUserPlantId = parsed.UserPlant._id;

        const payload = { plants: newUserPlantId };

        const updateResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (updateResponse.ok) {
          console.log("Other collection updated successfully");
        } else {
          console.error("Failed to update other collection");
        }
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
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="m-auto max-w-md flex flex-col justify-center">
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
                <option key={item._id} value={item._id}>
                  {item.species}
                </option>
              ))}
            </select>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      value={plantPicture}
                      onChange={(event) => setPlantPicture(event.target.value)}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            Plant cuttings available
            <input
              type="number"
              value={plantCutting}
              onChange={(event) => setPlantCutting(event.target.value)}
              required
              placeholder="Plant cuttings available"
              className="p-2 border rounded-lg"
            />{" "}
            Plant size
            <input
              type="text"
              value={plantSize}
              onChange={(event) => setPlantSize(event.target.value)}
              required
              placeholder="Plant size"
              className="p-2 border rounded-lg"
            />
            Product's used on plant
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
            Plant care activity
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
              className="bg-emerald-600 text-white p-2 rounded-lg self-center mt-4"
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
