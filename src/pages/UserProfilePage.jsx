import NavbarMobile from "../components/NavbarMobile";
import UpdatePlant from "../components/UpdatePlant";

const UserProfilePage = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <p className="text-xl font-bold text-center">
        Here you will see all information that's linked to your UserId
      </p>
      <UpdatePlant plantId="65379e46941335494d068a05" />
      <NavbarMobile />
    </div>
  );
};

export default UserProfilePage;
