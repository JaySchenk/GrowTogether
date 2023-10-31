import React, { useContext, useState, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";

const NewUserPlant = ({ type, plantId }) => {
  const isPost = type === "newPlant";
  const isPut = type === "newCare" || type === "newProduct";

  const [plants, setPlants] = useState([]);
  const [plantName, setPlantName] = useState("");
  const [plantSpecies, setPlantSpecies] = useState("");
  const [plantPicture, setPlantPicture] = useState(null);
  const [plantCutting, setPlantCutting] = useState(0);
  const [plantSize, setPlantSize] = useState("");
  const [product, setProduct] = useState("");
  const [productUsedDate, setProductUsedDate] = useState("");
  const [activity, setActivity] = useState("");
  const [activityDate, setActivityDate] = useState("");
  const [reminderSettings, setReminderSettings] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { userId } = useContext(SessionContext);

  const navigate = useNavigate();

  const handleGoBack = () => {
    setTimeout(() => {
      if (!isSubmitting) {
        navigate(-1);
      }
    }, 2000);
  };

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

    const form_data = new FormData();

    form_data.append("Data", JSON.stringify(payload));
    form_data.append("plantPicture", plantPicture);

    console.log(form_data);

    try {
      if (isPost) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/userplants`,
          {
            method: "POST",
            body: form_data,
          }
        );

        if (response.status === 201) {
          const parsed = await response.json();
          const newUserPlantId = parsed.UserPlant._id;

          const payload = { plants: newUserPlantId };
          setIsSubmitting(false);
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
        }
      } else if (isPut) {
        const updateResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/userplants/${plantId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (updateResponse.ok) {
          console.log("Collection updated successfully");
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
    <div className='m-auto max-w-md flex flex-col justify-center'>
      {plants.length > 0 && (isPost || isPut) ? (
        <>
          <h1 className='text-xl font-bold text-center'>
            {isPost ? "New plant" : "New care or product"}
          </h1>
          <form className='flex flex-col gap-4 mt-8' onSubmit={handleSubmit}>
            {isPost && (
              <>
                <p className='-mb-1'>
                  Plant name <span className='text-red-500'>*</span>
                </p>
                <input
                  type='text'
                  value={plantName}
                  onChange={(event) => setPlantName(event.target.value)}
                  required
                  placeholder='Plant name'
                  className='p-2 border rounded-lg'
                />
                <p className='-mb-1'>
                  Species <span className='text-red-500'>*</span>
                </p>
                <select
                  value={plantSpecies}
                  onChange={(event) => setPlantSpecies(event.target.value)}
                  className='p-2 border rounded-lg'
                  required
                >
                  <option value=''>Pick value</option>
                  {plants.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.species}
                    </option>
                  ))}
                </select>
                <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                  <div className='text-center'>
                    {plantPicture ? (
                      <div>
                        <img
                          className='mx-auto'
                          alt='not found'
                          width={"150px"}
                          src={URL.createObjectURL(plantPicture)}
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
                        className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
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
                <p className='-mb-1'>Plant cuttings available</p>
                <input
                  type='number'
                  value={plantCutting}
                  onChange={(event) => setPlantCutting(event.target.value)}
                  placeholder='Plant cuttings available'
                  className='p-2 border rounded-lg'
                />{" "}
                <p className='-mb-1'>Plant size</p>
                <input
                  type='text'
                  value={plantSize}
                  onChange={(event) => setPlantSize(event.target.value)}
                  placeholder='Plant size'
                  className='p-2 border rounded-lg'
                />
              </>
            )}
            {isPut && type === "newCare" && (
              <>
                Plant care activity
                <input
                  type='text'
                  value={activity}
                  onChange={(event) => setActivity(event.target.value)}
                  required
                  placeholder='Plant care activity'
                  className='p-2 border rounded-lg'
                />
                Plant care activity date
                <input
                  type='date'
                  value={activityDate}
                  onChange={(event) => setActivityDate(event.target.value)}
                  required
                  placeholder='Plant care activity date'
                  className='p-2 border rounded-lg'
                />
              </>
            )}
            {isPut && type === "newProduct" && (
              <>
                Product's used on plant
                <input
                  type='text'
                  value={product}
                  onChange={(event) => setProduct(event.target.value)}
                  placeholder="Product's used on plant"
                  className='p-2 border rounded-lg'
                />
                Date of using products
                <input
                  type='date'
                  value={productUsedDate}
                  onChange={(event) => setProductUsedDate(event.target.value)}
                  required
                  placeholder='Date of using products'
                  className='p-2 border rounded-lg'
                />
              </>
            )}
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
              onClick={handleGoBack}
              className='bg-emerald-600 text-white p-3 rounded-full self-center mt-4 '
            >
              {isPost ? "Make Plant" : "Save Changes"}
            </button>
          </form>
        </>
      ) : (
        <p>{plants.length > 0 ? "Invalid form type" : "Loading..."}</p>
      )}
    </div>
  );
};

export default NewUserPlant;
