import { Link } from "react-router-dom";

const PlantUserCard = ({plant}) => {

  return (
    <div className="plant-card">
        <div className="plant-info">
            <div className="text-left">
                <p className="font-semibold text-lg  text-sky-900"></p>
            </div>
        </div>
        {/* <div className="plant-link chevron-double-right">
        <Link to={`/plantcare/${plant._id}`}> info </Link>
        </div> */}
    </div>
  );
};

export default PlantUserCard;