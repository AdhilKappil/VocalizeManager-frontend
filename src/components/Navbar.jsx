import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
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
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          User Management 
        </Typography>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-x-1">
            {/* Profile Button */}
            <NavLink to={"/profile"}>
              <Button variant="text" size="sm">
                <span>Profile</span>
              </Button>
            </NavLink>
            {/* Log In Button */}
            <span>
              { userInfo ? (
                <span className="font-semibold text-sm mr-3">{userInfo.name}</span>
              ) : (
                <NavLink to="/login">
                  <Button  className="">
                    <span>Log In</span>
                  </Button>
                </NavLink>
              )}
            </span>

            {/* Log Out Button */}
            {userInfo &&  <Button onClick={logoutHandler} variant="gradient" size="sm">
              <span>Log Out</span>
            </Button>}
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>
        <div className="flex items-center gap-x-1">
          <NavLink to={"/login"}>
            <Button fullWidth variant="text" size="sm" className="">
              <span>Log In</span>
            </Button>
          </NavLink>
          <Button fullWidth variant="gradient" size="sm" className="">
            <span>LogOut</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}
