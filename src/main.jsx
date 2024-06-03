import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register.jsx";
import Profile from "./components/Profile.jsx";
import Dashboard from "./components/Dashboard.jsx";
import store from "./store.js";
import { Provider } from "react-redux";
import Home from "./components/Home.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import AdminPrivateRoute from "./components/AdminPrivateRour.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AddNewUser from "./components/AddNewUser.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="" element={<AdminPrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="addNewUser" element={<AddNewUser />} />
      </Route>

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
