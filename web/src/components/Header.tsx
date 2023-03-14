import logoPng from "../assets/logo.png";
import { Link } from "react-router-dom";
import { NavBar } from "./";

const Header = () => {
  return (
    <div className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/">
          <img src={logoPng} alt="Logo" width={150} />
        </Link>
      </div>
      <NavBar />
    </div>
  );
};

export default Header;
