import { BrowserRouter as Route, Link } from "react-router-dom";

export const NavigationMenu = () => {
  return (
    <div className="flex justify-end space-x-4">
      <section className="MOBILE-MENU flex lg:hidden">
        <div className="HAMBURGER-ICON space-y-2">
          <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
        </div>

        <div>
          <div className="absolute top-0 right-0 px-8 py-8">
            <svg
              className="h-8 w-8 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <ul className="NAVIGATION-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
            <li className="border-b border-gray-400 my-8 uppercase">
              <a href="/about">About</a>
            </li>
            <li className="border-b border-gray-400 my-8 uppercase">
              <a href="/portfolio">Portfolio</a>
            </li>
            <li className="border-b border-gray-400 my-8 uppercase">
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
      </section>
      <nav>
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
      </nav>
    </div>
  );
};
