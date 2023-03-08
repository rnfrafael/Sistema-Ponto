import { useState } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";

const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false
  return (
    <div className="flex justify-end space-x-4 text-white">
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            {" "}
            {
              // toggle class based on isNavOpen state
            }
            <div
              className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
            >
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
              <li>
                <Link
                  onClick={() => setIsNavOpen(false)}
                  to="/login"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setIsNavOpen(false)}
                  to="/bater-ponto"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Bater Ponto
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setIsNavOpen(false)}
                  to="/cadastrar-pessoa"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Registrar
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setIsNavOpen(false)}
                  to="/about"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Sobre
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
          <li>
            <Link
              onClick={() => setIsNavOpen(false)}
              to="/login"
              className="text-gray-600 hover:text-gray-800"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setIsNavOpen(false)}
              to="/bater-ponto"
              className="text-gray-600 hover:text-gray-800"
            >
              Bater Ponto
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setIsNavOpen(false)}
              to="/cadastrar-pessoa"
              className="text-gray-600 hover:text-gray-800"
            >
              Registrar
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setIsNavOpen(false)}
              to="/about"
              className="text-gray-600 hover:text-gray-800"
            >
              Sobre
            </Link>
          </li>
        </ul>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  );
};

export default NavBar;
