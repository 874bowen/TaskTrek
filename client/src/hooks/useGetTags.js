import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StatusModalContext } from "../App";

export const useGetTags = () => {
  const { statusData } = useContext(StatusModalContext);
  const [mappedTags, setMappedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      const authToken = JSON.parse(localStorage.getItem("auth")).auth_token;
      setError(false);
      setLoading(true);
      try {
        const res = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/projects/tags`,
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            }
        );
        setTags(res.data.data);
        setMappedTags(
            res.data.data.map((tag) => ({
              value: tag.id,
              label: tag.tag,
            }))
        );
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, [statusData]);

  return {
    loading,
    error,
    tags,
    mappedTags,
  };
};