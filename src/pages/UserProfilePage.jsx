import NavbarMobile from "../components/NavbarMobile";

const UserProfilePage = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <p className="text-xl font-bold text-center">
        Here you will see all information that's linked to your UserId
      </p>
      <NavbarMobile />
    </div>
  );
};

export default UserProfilePage;
