import { Link } from "react-router-dom";
import { HomeIcon, BookOpenIcon, UserIcon } from "@heroicons/react/24/outline"

const NavbarMobile = () => {
  return (
    <div className="navbar-mobile sm:hidden shadow-[rgba(30,30,15,0.5)_0px_4px_14px_0px]">
      <Link to="/uplant"><HomeIcon className="w-8 text-sky-900"/></Link>
      <Link to="/plantcare"><BookOpenIcon className="w-8 text-sky-900"/></Link>
      <Link to="/uprofile"><UserIcon className="w-8 text-sky-900"/></Link>
    </div>
  );
};

export default NavbarMobile;