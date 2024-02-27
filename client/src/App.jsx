import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./components/Auth/Register";
import Tasks from "./components/Tasks/Tasks";
import Login from "./components/Auth/Login";
import './App.css'
import PrivateRoutes from './routes/PrivateRoutes';
import { createContext, useState } from 'react';
import { ToastContainer } from "react-toastify";
import Projects from "./components/Projects/Projects";
import Project from "./components/Projects/Project";
import ForgetPassword from "./components/Auth/forget";

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
    path: "/forget_password",
    element: <ForgetPassword />,
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <Tasks />,
        children: [
          {
            path: "projects",
            element: <Projects />,
          },
          {
            path: "project/:id",
            element: <Project />,
          }
        ]
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
    <div className="w-full max-w-full" style={{ backgroundColor: "whitesmoke" }}>
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
