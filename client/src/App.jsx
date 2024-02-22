import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./components/Auth/Register";
import Tasks from "./components/Tasks/Tasks";
import Login from "./components/Auth/Login";
import './App.css'
import PrivateRoutes from './routes/PrivateRoutes';
import { createContext, useState } from 'react';
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <Tasks />,
      },
    ],
  },
]);

export const StatusModalContext = createContext();
export const AuthContext = createContext();

const App = () => {
  const [statusData, setStatusData] = useState({
    status: false,
    loading: false,
    message: "",
    type: "",
  });

  const [auth, setAuth] = useState({
    id: null,
    user: "",
    token: "",
  });

  return (
    <div className="" style={{ backgroundColor: "whitesmoke" }}>
      <ToastContainer />
      <StatusModalContext.Provider value={{ statusData, setStatusData }}>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      </StatusModalContext.Provider>
    </div>
  );
};

export default App;
