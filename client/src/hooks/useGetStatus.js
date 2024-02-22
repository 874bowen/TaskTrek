import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StatusModalContext } from "../App";

export const useGetStatus = () => {
  const { statusData } = useContext(StatusModalContext);
  const [mappedStatus, setMappedStatus] = useState([]);
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setError(false);
      setLoading(true);
      try {
        const authToken = JSON.parse(localStorage.getItem("auth")).auth_token;
        const res = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/projects/status`,
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            }
        );
        setStatus(res.data.data);
        setMappedStatus(
            res.data.data.map((status) => ({
              value: status.id,
              label: status.status,
            }))
        );
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [statusData]);

  return {
    loading,
    error,
    status,
    mappedStatus,
  };
};