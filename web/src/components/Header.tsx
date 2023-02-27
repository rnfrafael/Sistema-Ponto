import { NavigationMenu } from "./NavBar";
import logoPng from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-gray-800 text-gray-100 py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/">
          <img src={logoPng} alt="Logo" width={200} height={100} />
        </Link>
      </div>
      <NavigationMenu />
    </div>
  );
};

export default Header;
