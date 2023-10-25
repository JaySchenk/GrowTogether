import NavbarMobile from "../components/NavbarMobile";
import NewUserPlant from "../components/NewUserPlant";

const UserPlantPage = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <p className="text-xl font-bold text-center">
        Here you will see cards of all the plants you've got and the option to add a new plant.
      </p>
      <NewUserPlant />
      <NavbarMobile />
    </div>
  );
};

export default UserPlantPage;

