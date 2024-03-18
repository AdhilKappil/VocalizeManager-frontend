import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logOut } from "../slices/authSlices";

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logOut());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="sticky top-0 z-10 bg-white shadow-md p-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <a
          href="#" style={{fontStyle:'italic'}}
          className="mr-4 cursor-pointer py-1.5 font-bold text-3xl"
        >
          Vocalize Manager
        </a>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-x-1">
            {/* Profile Button */}
            <NavLink to={"/profile"}>
              <button className="text-nowrap font-bold text-black hover:underline focus:outline-none mr-5">
                Profile
              </button>
            </NavLink>
            {/* Log In Button */}
            <span>
              {userInfo ? (
                <span className="ftext-nowrap font-bold mr-5">{userInfo.name}</span>
              ) : (
                <NavLink to="/login">
                  <button className="text-sm text-blue-600 hover:underline focus:outline-none">
                    Log In
                  </button>
                </NavLink>
              )}
            </span>

            {/* Log Out Button */}
            {userInfo &&  <button onClick={logoutHandler} className="h-8 w-20 hover:bg-red-700 bg-black rounded-lg text-white hover:scale-105">
              Log Out 
            </button>}
          </div>
          <button
            className="ml-auto h-6 w-6 text-blue-gray-900 hover:text-blue-600 focus:outline-none lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
           
          </button>
        </div>
      </div>
      {openNav && (
        <div className="container mx-auto py-2 lg:hidden">
          <div className="flex items-center gap-x-1">
            <NavLink to={"/login"}>
              <button className="text-sm text-blue-600 hover:underline focus:outline-none">
                Log In
              </button>
            </NavLink>
            <button onClick={logoutHandler} className="text-sm text-white bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 rounded-md">
              Log Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
