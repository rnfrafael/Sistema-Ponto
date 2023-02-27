import { BrowserRouter as Route, Link } from "react-router-dom";

export const NavigationMenu = () => {
  return (
    <div className="flex justify-end space-x-4">
      <Link to="/login" className="text-gray-600 hover:text-gray-800">
        Login
      </Link>
      <Link to="/bater-ponto" className="text-gray-600 hover:text-gray-800">
        Bater Ponto
      </Link>
      <Link
        to="/cadastrar-pessoa"
        className="text-gray-600 hover:text-gray-800"
      >
        Registrar
      </Link>
      <Link to="/about" className="text-gray-600 hover:text-gray-800">
        Sobre
      </Link>
    </div>
  );
};
