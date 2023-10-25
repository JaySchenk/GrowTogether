import { Link } from "react-router-dom";

const NavbarMobile = () => {
  return (
    <div className="navbar-mobile sm:hidden">
      <Link to="/uplant">Home</Link>
      <Link to="/plantcare">Library</Link>
      <Link to="/uprofile">Profile</Link>
    </div>
  );
};

export default NavbarMobile;