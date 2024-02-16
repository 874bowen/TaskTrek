import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Tasks from "./components/Tasks/Tasks";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoutes from './routes/PrivateRoutes';
import { createContext, useState } from 'react';

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
      <StatusModalContext.Provider value={{ statusData, setStatusData }}>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      </StatusModalContext.Provider>
    </div>
  );
};

export default App;
