import { useEffect, useRef, useState } from "react";
import {
  BellIcon,
  Calendar,
  ClipBoard,
  CloseMenubar,
  HomeIcon,
  Report,
  RoadMap,
  Settings,
  UserGroup,
  UserIcon,
} from "../../../ui/svgs/svgs";
import { AnimatePresence, motion } from "framer-motion";
import Select from "react-select";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "@uiw/react-markdown-editor/markdown-editor.css";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useGetStatus } from "../../../hooks/useGetStatus";
import axios from "axios";
import { toast } from "react-toastify";
import { useGetTags } from "../../../hooks/useGetTags";

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

const Sidebar = ({ open, setOpen, projects, setSeed }) => {
  const ref = useRef(null);
  const { mappedStatus } = useGetStatus();
  const { mappedTags } = useGetTags();
  const toggleSidebar = () => setOpen((prev) => !prev);
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    status: 1,
    due_date: "",
    tags: [],
  });

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

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { ...data, tags: value.map(v=> v.value), description: markdown };
    const authToken = JSON.parse(localStorage.getItem("auth")).auth_token;
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/projects/`, formData, {
          headers: {
              'Authorization': `${authToken}`
          }
      })
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message);
          setTimeout(() => {
            document.getElementById("closeModal").click();
            setSeed(Math.random())
          }, 1000);
        } else {
          toast.error(res.data.message);
        }
      });
  };

  return (
    <>
      {open && (
        <AnimatePresence initial={false} className="">
          <motion.div
            key={1}
            {...framerSidebarBackground}
            aria-hidden="true"
            className="backdrop-blur-sm"
            style={{ width: "100%" }}
          ></motion.div>
          <motion.div
            key={2}
            {...framerSidebarPanel}
            className="w-100 h-100 max-w-xs border-end"
            ref={ref}
            aria-label="Sidebar"
          >
            <div className="flex justify-between items-center p-4 border border-b-2">
              <span>TaskTrek</span>
              <span
                onClick={toggleSidebar}
                className="p-1 rounded-xl"
                aria-label="close sidebar"
              >
                <CloseMenubar />
              </span>
            </div>
            <ul className="menu w-full rounded-box">
              <li>
                <a
                  onClick={() => navigate("/")}
                  className="px-4 flex justify-start items-center gap-2 p-2 transition hover:bg-dark text-dark"
                >
                  <HomeIcon className="text-2xl" /> Home
                </a>
              </li>
              <li>
                <details open>
                  <summary>
                    {" "}
                    <span className="flex gap-2">
                      <ClipBoard /> Projects{" "}
                    </span>
                  </summary>
                  <ul>
                    <li>
                      <details open>
                        <summary>My Projects</summary>
                        <ul>
                          {projects.user_projects && projects.user_projects?.map((p) => {
                            return (
                              <li key={p.id}>
                              <a>{p.title.substring(0, 15)+ "..."}</a>
                            </li>
                            )
                          })}
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details open>
                        <summary>Project Collabos</summary>
                        <ul>
                          {projects.collaboration_projects && projects.collaboration_projects?.map((p) => {
                            return (
                              <li key={p.id}>
                              <a>{p.title.substring(0, 15)+ "..."}</a>
                            </li>
                            )
                          })}
                        </ul>
                      </details>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <a
                  onClick={() => navigate("/")}
                  className="px-4 flex justify-start items-center gap-2 p-2 transition hover:bg-dark text-dark"
                >
                  <Calendar className="text-2xl" /> Calendar
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/")}
                  className="px-4 flex justify-start items-center gap-2 p-2 transition hover:bg-dark text-dark"
                >
                  <RoadMap className="text-2xl" /> Roadmap
                </a>
              </li>
              <hr />
              <p className="p-2 font-light">Reporting</p>
              <li>
                <a
                  onClick={() => navigate("/")}
                  className="px-4 flex justify-start items-center gap-2 p-2 transition hover:bg-dark text-dark"
                >
                  <BellIcon className="text-2xl" /> Notifications{" "}
                  <div className="badge badge-secondary">+99</div>
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/")}
                  className="px-4 flex justify-start items-center gap-2 p-2 transition hover:bg-dark text-dark"
                >
                  <UserGroup className="text-2xl" /> Members
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/")}
                  className="px-4 flex justify-start items-center gap-2 p-2 transition hover:bg-dark text-dark"
                >
                  <Settings className="text-2xl" /> Settings
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/")}
                  className="px-4 flex justify-start items-center gap-2 p-2 transition hover:bg-dark text-dark"
                >
                  <UserIcon className="text-2xl" /> Profile
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/")}
                  className="px-4 flex justify-start items-center gap-2 p-2 transition hover:bg-dark text-dark"
                >
                  <Report className="text-2xl" /> Report
                </a>
              </li>
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Create Project
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
                        placeholder="Titke"
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
                        <MarkdownEditor
                          value={markdown}
                          onChange={setMarkdown}
                        />
                      </div>
                    </div>
                    <div className="col-span-2 my-3">
                      <button
                        className="btn w-full text-lg"
                        onClick={handleSubmit}
                      >
                        Create Project
                      </button>
                    </div>
                  </div>
                </div>
              </dialog>
            </ul>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  projects: PropTypes.object,
  setSeed: PropTypes.func.isRequired
};

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

const framerSidebarPanel = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.3 },
};

export default Sidebar;
