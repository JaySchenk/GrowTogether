import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

const PlantCard = ({plant}) => {
  return (
    <div className="plant-card">
      <img src={plant.image} alt={plant.species} />
      <p className="bg-slate-300 font-bold">{plant.species}</p>
      <p>Difficulty Level: {plant.care_instructions.difficulty_care_level}</p>
      <Link to={`/plantcare/${plant._id}`}> <Button> info </Button></Link>
    </div>
  );
};

export default PlantCard;