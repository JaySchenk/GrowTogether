import { useState, useEffect } from "react";
import NavbarMobile from "../components/NavbarMobile";
import PlantCard from "../components/PlantCard";

const API_URL = import.meta.env.VITE_API_URL;

const PlantLibrary = () => {
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

  return (
    <div className='plant-library mb-10'>
      {plants.map((plant, index) => (
        <PlantCard key={index} plant={plant} />
      ))}
      <NavbarMobile />
    </div>
  );
};

export default PlantLibrary;
