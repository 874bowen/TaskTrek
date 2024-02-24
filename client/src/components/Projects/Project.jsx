import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MarkdownPreview from '@uiw/react-markdown-preview';
import DraggableTasks from "./DraggableTasks";

const Project = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [project, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      setError(false);
      setLoading(true);
      loading && toast.loading("Fetching Projects");
      try {
        const authToken = JSON.parse(localStorage.getItem("auth")).auth_token;
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/projects/${id}`,
          {
            headers: {
              Authorization: `${authToken}`,
            },
          }
        );
        setProjects(res.data.data);
      } catch (error) {
        setError(true);
        error && toast.error("Problem getting project");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [id]);

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
  }, []);

  return (
    <>
      {project.project && (
        <>
          <h1>{project.project.title}</h1>
          <h2>Deadline: {project.project.due_date}</h2>
          <h2>Status: {project.status.status}</h2>
          <MarkdownPreview source={project.project.description} />
          <DraggableTasks />
        </>
      )}
    </>
  );
};

export default Project;
