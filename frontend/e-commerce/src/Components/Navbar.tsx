import { useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?._id;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-gray-50 sticky top-0 z-50">
      <header className="bg-[#2E7D32] shadow-md">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate("/home")}
            className="hover:text-indigo-600"
          >
            <div className="text-2xl font-bold text-white">eCommerce Pro</div>
          </button>
          {userId ? (
            <div className="flex items-center space-x-4 relative">
              <button
                onClick={() => navigate("/categories")}
                className="hover:text-indigo-600"
              >
                <FaList className="w-5 h-5 text-white hover:text-teal-600 cursor-pointer" />
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="hover:text-indigo-600"
              >
                <FaShoppingCart className="w-5 h-5 text-white hover:text-teal-600 cursor-pointer" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="hover:text-indigo-600"
                >
                  <FaUserCircle className="w-8 h-8 text-white cursor-pointer" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        navigate("/profile");
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-[#2E7D32] px-3 py-1 rounded-lg font-semibold"
            >
              Login
            </button>
          )}
        </div>
      </header>
    </div>
  );
}
