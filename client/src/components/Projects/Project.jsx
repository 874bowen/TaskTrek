import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import DraggableTasks from "./DraggableTasks";
import { useGetStatus } from "../../hooks/useGetStatus";
import { useGetTags } from "../../hooks/useGetTags";
import MarkdownEditor from "@uiw/react-markdown-editor";

const customStyles = {
  option: (defaultStyles) => {
    return {
      ...defaultStyles,
      textAlign: "left",
      padding: "1rem 0.5rem",
      zIndex: "99990",
    };
  },
  control: (provided) => ({
    ...provided,
    fontSize: "1.2rem",
    color: "#222",
    background: "transparent",
    borderColor: "#9e9e9e",
    minHeight: "34px",
    height: "50px",
    textAlign: "left",
    borderRadius: "0.375rem",
    boxShadow: "none",
    alignItems: "center",
  }),

  valueContainer: (provided) => {
    return { ...provided, height: "50px", display: "flex" };
  },

  input: (provided) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "50px",
  }),
};

const Project = () => {
  const { id } = useParams();
  const userId = JSON.parse(localStorage.getItem("auth")).user_id;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");

  const [project, setProjects] = useState([]);

  const [seed, setSeed] = useState(0);
  const [tasks, setTasks] = useState([])

  const [data, setData] = useState({
    title: "",
    status: 1,
    due_date: "",
    assignee_id: 1,
    tags: [],
  });

  const { mappedStatus } = useGetStatus();
  const { mappedTags } = useGetTags();

  const orderOptions = (values) => {
    return values;
  };

  const [value, setValue] = useState(
    orderOptions([mappedTags[0], mappedTags[1], mappedTags[3]])
  );

  const onSelectChange = (newValue) => {
    setValue(orderOptions(newValue));
  };

  const [markdown, setMarkdown] = useState(`
    # TaskTrek - Task Management System (Client)

    🚀 Welcome to TaskTrek - your task management solution's frontend!
    TaskTrek's frontend is built using React and powered by Vite. 
    It provides a user-friendly interface for managing tasks and projects efficiently.
  `);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const inviteCollaborator = (e) => {
    e.preventDefault();
    const authToken = JSON.parse(localStorage.getItem("auth")).auth_token;
    axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/project_collaborator/`,
        { project_id: id, collaborator_email: email },
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...data,
      tags: value.map((v) => v.value),
      description: markdown,
    };
    const authToken = JSON.parse(localStorage.getItem("auth")).auth_token;
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/projects/${id}/tasks`, formData, {
        headers: {
          Authorization: `${authToken}`,
        },
      })
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message);
          setTimeout(() => {
            document.getElementById("closeModal").click();
            setSeed(Math.random());
          }, 1000);
        } else {
          toast.error(res.data.message);
        }
      });
  };

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
        error && toast.error("Problem getting project tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [id]);

  useEffect(() => {
    const fetchProjectTasks = async () => {
      setError(false);
      setLoading(true);
      loading && toast.loading("Fetching Project Tasks");
      console.log("fetching tasks");
      try {
        const authToken = JSON.parse(localStorage.getItem("auth")).auth_token;
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/projects/${id}/tasks`,
          {
            headers: {
              Authorization: `${authToken}`,
            },
          }
        );
        setTasks(res.data.data);
        console.log(res.data.data)
      } catch (error) {
        setError(true);
        console.log("try failed");
        error && toast.error("Problem getting project");
      } finally {
        setLoading(false);
      }
    };
    fetchProjectTasks();
  }, [id, seed]);

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
  }, []);

  return (
    <>
      {project.project && (
        <>
          <div className="relative pt-2">
            <h1>{project.project.title}</h1>
            <h2>Deadline: {project.project.due_date}</h2>
            <h2>Status: {project.status.status}</h2>
            <div className="absolute top-2 right-2 flex gap-2">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                {project.collaborators.map((collaborator) => {
                  return (
                    <div key={collaborator.id} className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-10">
                        <span>
                          {collaborator.username.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* <button className="btn btn-primary">Invite Collaborators</button> */}
              <label htmlFor="my_modal_7" className="btn">
                Invite Collaborators
              </label>
              <input type="checkbox" id="my_modal_7" className="modal-toggle" />
              <div className="modal bg-[whitesmoke]" role="dialog">
                <div className="modal-box bg-[whitesmoke]">
                  <h3 className="text-lg font-bold">Invite Collaborator</h3>
                  <div className="py-4">
                    <label className="input input-bordered col-span-2 bg-[whitesmoke] flex items-center gap-2">
                      Email
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="grow"
                        placeholder="collaborator@gmail.com"
                      />
                    </label>
                    <div className="col-span-2 mt-3">
                      <button
                        className="btn w-full text-lg"
                        onClick={inviteCollaborator}
                      >
                        Invite
                      </button>
                    </div>
                  </div>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">
                  Close
                </label>
              </div>
            </div>
          </div>
          <MarkdownPreview source={project.project.description.trim()} />
          <div className="flex justify-end">
            <button
              className="btn btn-sm my-2"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Create Task
            </button>
            <dialog id="my_modal_3" className="modal z-10 ">
              <div className="modal-box bg-[whitesmoke] w-11/12 z-10 max-w-5xl">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <h1 className="px-4">Create Project</h1>
                  <button
                    className="btn btn-md btn-circle btn-ghost absolute right-4 top-2 px-4"
                    id="closeModal"
                  >
                    ✕
                  </button>
                </form>
                <div className="grid grid-cols-2 gap-4 mt-8 px-4">
                  <label className="input input-bordered col-span-2 bg-[whitesmoke] flex items-center gap-2">
                    Title
                    <input
                      type="text"
                      name="title"
                      value={data.title}
                      onChange={handleInputChange}
                      className="grow"
                      placeholder="Title"
                    />
                  </label>
                  <select
                    className="select select-bordered bg-[whitesmoke] w-full"
                    name="status"
                    value={data.status}
                    onChange={handleInputChange}
                  >
                    <option disabled>Status</option>
                    {mappedStatus.map((status) => (
                      <option
                        key={status.value + status.label}
                        value={status.value}
                      >
                        {status.label} 
                      </option>
                    ))}
                  </select>
                  <label className="input input-bordered  bg-info  text-[white] flex items-center gap-2">
                    <input
                      type="date"
                      name="due_date"
                      value={data.due_date}
                      onChange={handleInputChange}
                      className="grow"
                      placeholder="Date"
                    />
                  </label>

                  <select
                    className="select select-bordered col-span-2 bg-[whitesmoke] w-full"
                    name="assignee_id"
                    value={data.assignee_id}
                    onChange={handleInputChange}
                  >
                    <option disabled>Assignee</option>
                    {project.collaborators?.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.username} {c.id === userId && "(You)"}
                      </option>
                    ))}
                  </select>

                  <div className="col-span-2 z-50">
                    <Select
                      placeholder="Select tags..."
                      value={value}
                      options={mappedTags}
                      isMulti={true}
                      styles={customStyles}
                      onChange={onSelectChange}
                    />
                  </div>
                  <div className="col-span-2 z-30">
                    <div>
                      <div className="wmde-markdown-var"> </div>
                      <MarkdownEditor value={markdown.trim()} onChange={setMarkdown} />
                    </div>
                  </div>
                  <div className="col-span-2 my-3">
                    <button
                      className="btn btn- w-full text-lg"
                      onClick={handleSubmit}
                    >
                      Create Task
                    </button>
                  </div>
                </div>
              </div>
            </dialog>
          </div>
          <DraggableTasks tasks={tasks} projectId={id}/>
        </>
      )}
    </>
  );
};

export default Project;
