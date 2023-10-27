import NavbarMobile from "../components/NavbarMobile";
import NewUserPlant from "../components/NewUserPlant";

const UserPlantPage = () => {
  return (
    <div className="flex items-center justify-center">
      <p className="text-xl font-bold text-center">
        Here you will see cards of all the plants you've got and the option to
        add a new plant.
      </p>
      <NewUserPlant type="newProduct" plantId="653b829509d15f41fb4322c4" />
      <NavbarMobile />
    </div>
  );
};

export default UserPlantPage;
