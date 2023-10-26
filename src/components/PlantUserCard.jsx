import { Link } from "react-router-dom";

const PlantUserCard = ({plant}) => {
console.log(plant)
  return (
    <div className="plant-card">
        <div className="plant-info">
            {plant.plantPicture?<img className="rounded-md"src={plant.plantPicture} alt={plant.plantSpecies} />:<img className="rounded-2xl" src="https://ih1.redbubble.net/image.949338818.5434/aps,504x498,large,transparent-pad,600x600,f8f8f8.jpg" alt={plant.plantSpecies} />}
            <div className="text-left ml-4">
                <p className="font-semibold text-lg  text-sky-900">{plant.plantname}</p>
                <p className="font-medium text-base text-gray-600">{plant.plantSpecies}</p>
            </div>
        </div>
        <div className="plant-link chevron-double-right">
        <Link to={`/plantcare/${plant.plantSpecies}`}> info </Link>
        </div>
    </div>
  );
};

export default PlantUserCard;