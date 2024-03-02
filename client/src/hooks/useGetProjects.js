import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StatusModalContext } from "../App";

export const useGetProjects = () => {
  const { statusData } = useContext(StatusModalContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setError(false);
      setLoading(true);
      try {
        const authToken = JSON.parse(localStorage.getItem("auth")).auth_token;
        const res = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/projects/`,
            {
                headers: {
                    'Authorization': `${authToken}`
                }
            }
        );
        setProjects(res.data);
        } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [statusData]);

  return {
    loading,
    error,
    projects,
  };
};