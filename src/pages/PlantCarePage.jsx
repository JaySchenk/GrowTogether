import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const API_URL = import.meta.env.VITE_API_URL;

const PlantCarePage = ({ match }) => {
  const [plant, setPlant] = useState(null);
  const { plantCareId } = useParams();

  useEffect(() => {
    fetch(`${API_URL}/api/plantcare/${plantCareId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
          setPlant(data.Plant);
          console.log(data.Plant);})
      .catch((error) => console.log(error));
  }, [plantCareId]);

  return (
    
    <div>
      {plant ? (
        <div>
          <BackButton /> 
          <h1>{plant.species}</h1>
          {plant.image && <img src={plant.image} alt={plant.species} />}
          <h2>Care Instructions:</h2>
          <p>Water: {plant.care_instructions.water.frequency}</p>
          <p>Light Requirement: {plant.care_instructions.light_requirement}</p>
          <p>Temperature: {plant.care_instructions.temperature}</p>
          <p>Soil Type: {plant.care_instructions.soil_type}</p>
          <p>Pot Size: {plant.care_instructions.pot_size}</p>
          <p>Growth Stages: {plant.care_instructions.growth_stages.join(', ')}</p>
          <p>Common Pests and Diseases: {plant.care_instructions.common_pests_diseases}</p>
          <p>Toxicity: {plant.care_instructions.toxicity.join(', ')}</p>
          <p>Difficulty Care Level: {plant.care_instructions.difficulty_care_level.join(', ')}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PlantCarePage;
