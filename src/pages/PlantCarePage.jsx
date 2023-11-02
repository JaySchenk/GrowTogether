import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import NavbarMobile from "../components/NavbarMobile";
import Light from "/light.png";
import Soil from '/soil.png';
import Temp from "/temp.png";
import Water from "/water.png"

const API_URL = import.meta.env.VITE_API_URL;

const PlantCarePage = ({ match }) => {
  const [plant, setPlant] = useState(null);
  const { plantCareId } = useParams();

  useEffect(() => {
    fetch(`${API_URL}/api/plantcare/${plantCareId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPlant(data.Plant);
        console.log(data.Plant);
      })
      .catch((error) => console.log(error));
  }, [plantCareId]);

  return (
    <>
      {plant ? (
        <div className='mb-14'>
            <BackButton/> 
          <div className='plant-overview items-stretch sm:items-end sm:-mt-20 duration-300 sm:px-4 pl-8'>
            <div className="w-3/5 md:w-1/3 md:ml-28">
              <p className='font-medium text-4xl lg:text-6xl md:text-5xl md:leading-tight text-sky-950 md:ml-14 duration-300'>
                {plant.species}
              </p>
              <div className="flex flex-wrap mt-10 mb-12 ml-6 sm:mt-20 duration-300">
                <div className="w-1/2 flex flex-col items-center gap-2 -ml-6">
                  <img src={Light} className="w-8" />
                  <p className="text-xs">LIGHT</p>
                  <p className="leading-3 text-xs font-semibold text-center text-emerald-600">35-40%</p>
                </div>
                <div className="w-1/2 flex flex-col items-center gap-2 ml-2">
                  <img src={Temp} className="w-8" />
                  <p className="text-xs">TEMPERATURE</p>
                  <p className="leading-3 text-xs font-semibold text-center text-emerald-600">{plant.care_instructions.temperature}</p>
                </div>
                <div className="w-1/2 flex flex-col items-center gap-2 mt-8 -ml-6">
                  <img src={Water} className="h-8" />
                  <p className="text-xs">WATER</p>
                  <p className="leading-3 text-xs font-semibold text-center text-emerald-600">every {plant.care_instructions.water.frequency} days</p>
                </div>
                <div className="w-1/2 flex flex-col items-center gap-2 mt-8 ml-2">
                  <img src={Soil} className="w-8" />
                  <p className="text-xs">SOIL TYPE</p>
                  <p className="leading-3 text-xs font-semibold text-center text-emerald-600">{plant.care_instructions.soil_type}</p>
                </div>
              </div>
            </div>
            <img src={plant.image} alt={plant.species} className="w-2/5 object-cover object-left-bottom  max-h-[28rem] lg:rounded-full duration-300"/>
          </div>
          <div className="p-8 md:px-64 duration-300">
            <p className="font-medium text-lg mt-2">Pot Size: </p>
            <span>{plant.care_instructions.pot_size}</span>
            <p className="font-medium text-lg mt-2">
            Growth Stages:
            </p>
            <span>
              {plant.care_instructions.growth_stages.join(", ")}
            </span>
            <p className="font-medium text-lg mt-2">
              Common Pests and Diseases:
            </p>
            <span>
              {plant.care_instructions.common_pests_diseases}
            </span>
            <p className="font-medium text-lg mt-2">Toxicity:</p>
            <span>
              {plant.care_instructions.toxicity}
            </span>
            <p className="font-medium text-lg mt-2">
              Difficulty Care Level
            </p>
            <span>
              {plant.care_instructions.difficulty_care_level}
            </span>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <NavbarMobile />
    </>
  );
};

export default PlantCarePage;
