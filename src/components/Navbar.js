import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <NavLink to="/AboutContact" className="flex items-center space-x-2 ">
        <img
          src="/logo.jpg"
          alt="Company Logo"
          className="w-8 h-8 rounded-full border-2 border-red-900"
        />
        <span className="font-bold text-lg">Bhoomiputra</span>
      </NavLink>

      <div className="md:hidden relative">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg">
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/AboutContact"
                  className={({ isActive }) =>
                    `block px-4 py-2 transition-colors duration-300 ${
                      isActive ? 'underline text-blue-300' : 'hover:underline'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/Services"
                  className={({ isActive }) =>
                    `block px-4 py-2 transition-colors duration-300 ${
                      isActive ? 'underline text-blue-300' : 'hover:underline'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </NavLink>
                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    `block px-4 py-2 transition-colors duration-300 ${
                      isActive ? 'underline text-blue-300' : 'hover:underline'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  History
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 bg-red-600 hover:bg-red-700 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `block px-4 py-2 transition-colors duration-300 ${
                      isActive ? 'underline text-blue-300' : 'hover:underline'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `block px-4 py-2 transition-colors duration-300 ${
                      isActive ? 'underline text-blue-300' : 'hover:underline'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>

      <div className="hidden md:flex md:items-center md:space-x-4">
        {isAuthenticated ? (
          <>
            <NavLink
              to="/AboutContact"
              className={({ isActive }) =>
                `hover:underline ${
                  isActive ? 'underline text-blue-300' : ''
                } transition-colors duration-300`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/Services"
              className={({ isActive }) =>
                `hover:underline ${
                  isActive ? 'underline text-blue-300' : ''
                } transition-colors duration-300`
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `hover:underline ${
                  isActive ? 'underline text-blue-300' : ''
                } transition-colors duration-300`
              }
            >
              History
            </NavLink>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `hover:underline ${
                  isActive ? 'underline text-blue-300' : ''
                } transition-colors duration-300`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `hover:underline ${
                  isActive ? 'underline text-blue-300' : ''
                } transition-colors duration-300`
              }
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
