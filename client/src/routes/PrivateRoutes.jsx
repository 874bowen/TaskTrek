import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const [auth, setAuth] = useState(JSON.parse(sessionStorage.getItem("auth")));

  useEffect(() => {
    let sauth = sessionStorage.getItem("auth");
    setAuth((prev) => ({
      ...prev,
      ...JSON.parse(sauth),
    }));
  }, []);

  return auth && auth.auth_token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
