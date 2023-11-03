import React, { useContext, useState, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const UpdatePlant = ({ plantId }) => {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [plantName, setPlantName] = useState();
  const [plantSpecies, setPlantSpecies] = useState("");
  const [plantPicture, setPlantPicture] = useState("");
  const [plantCutting, setPlantCutting] = useState(0);
  const [plantSize, setPlantSize] = useState("");
  const [product, setProduct] = useState([]);
  const [activity, setActivity] = useState([]);
  const [reminderSettings, setReminderSettings] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userId } = useContext(SessionContext);

  const handleGoBack = () => {
    navigate("/uplant");
    return <Loader />;
  };
  /////drag&drop///
  function dropHandler(ev) {
    console.log("File(s) dropped");
    document.querySelector(".drag").classList.remove("dragndrop");
    ev.preventDefault();
    setPlantPicture(null);

    if (ev.dataTransfer.items) {
      [...ev.dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          console.log(`… file[${i}].name = ${file.name}`);
          setPlantPicture(file);
        }
      });
    } else {
      [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
        setPlantPicture(file);
      });
    }
  }

  function dragOverHandler(ev) {
    console.log("File(s) in drop zone");
    document.querySelector(".drag").classList.add("dragndrop");
    ev.preventDefault();
  }
  ////////

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    const payload = {
      plantName: plantName,
      plantSpecies: plantSpecies,
      plantCutting: plantCutting,
      plantSize: plantSize,
      reminderSettings: reminderSettings,
    };
    const form_data = new FormData();

    form_data.append("Data", JSON.stringify(payload));
    form_data.append("plantPicture", plantPicture);

    console.log(form_data);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/userplantsUpdate/${plantId}`,
        {
          method: "PUT",
          body: form_data,
        }
      );

      if (response.ok) {
        handleGoBack();
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
    <div className='m-auto max-w-md flex flex-col justify-center mt-20'>
      <h1 className='text-xl font-bold text-center'>Update plant</h1>
      {plantName && !isSubmitting ? (
        <form className='flex flex-col gap-4 mt-8' onSubmit={handleSubmit}>
          <p className='-mb-1 font-medium'>Plant name</p>
          <input
            type='text'
            value={plantName}
            onChange={(event) => setPlantName(event.target.value)}
            required
            placeholder='Plant name'
            className='p-2 border rounded-lg'
          />
          <p className='-mb-1 font-medium'>Species</p>
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
          <div
            className=' drag mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'
            id='drop_zone'
            onDrop={(ev) => dropHandler(ev)}
            onDragOver={(ev) => dragOverHandler(ev)}
          >
            <div className='text-center'>
              {plantPicture ? (
                <div>
                  <img
                    className='mx-auto'
                    alt='not found'
                    width={"150px"}
                    src={
                      typeof plantPicture === "string"
                        ? plantPicture
                        : URL.createObjectURL(plantPicture)
                    }
                  />
                  <button
                    type='button'
                    className='text-red-500 text-xs'
                    onClick={() => setPlantPicture(null)}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <svg
                  className='mx-auto h-12 w-12 text-gray-300'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
              <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                <label
                  htmlFor='image'
                  className='relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                >
                  <span className='text-emerald-600'>Upload a file</span>

                  <input
                    className='sr-only'
                    id='image'
                    name='image'
                    type='file'
                    value=''
                    onChange={(event) => {
                      setPlantPicture(event.target.files[0]);
                    }}
                  />
                </label>
                <p className='pl-1'>or drag and drop</p>
              </div>
              <p className='text-xs leading-5 text-gray-600'>
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
          <p className='-mb-1 font-medium'>Plant cuttings available</p>
          <input
            type='number'
            value={plantCutting}
            onChange={(event) => setPlantCutting(event.target.value)}
            required
            placeholder='Plant cuttings available'
            className='p-2 border rounded-lg'
          />
          <p className='-mb-1 font-medium'>Plant size</p>
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
            <p className='text-xs text-gray-400'>
              I want to receive plant care reminders
            </p>
          </label>
          <button
            type='submit'
            onClick={handleSubmit}
            className='bg-emerald-600 text-white p-2 rounded-full self-center mt-4'
          >
            Update Plant
          </button>
        </form>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default UpdatePlant;
