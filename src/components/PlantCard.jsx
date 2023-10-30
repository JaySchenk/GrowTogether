import { Link } from "react-router-dom";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline"

const PlantCard = ({plant}) => {
  return (
    <div className="plant-card max-h-32 w-11/12 md:w-1/2 max-w-2xl duration-300">
        <div className="plant-info">
            <img className="mb-2 h-28 lg:h-36 duration-300"src={plant.image} alt={plant.species} />
            <div className="text-left">
                <p className="font-semibold text-lg  text-sky-900">{plant.species}</p>
                <p className="font-medium text-base text-gray-600">Difficulty Level:</p> <p className="font-normal text-sm"> {plant.care_instructions.difficulty_care_level}</p>
            </div>
        </div>
        <div className="plant-link chevron-double-right">
        <Link to={`/plantcare/${plant._id}`}> <ChevronDoubleRightIcon className="w-8 text-sky-900"/> </Link>
        </div>
    </div>
  );
};

export default PlantCard;