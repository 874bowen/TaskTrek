import Sidebar from "./ui/Sidebar";
import { useEffect, useState } from "react";
import { BellIcon, ChevronDown, OpenMenubar } from "../../ui/svgs/svgs";
import axios from "axios";
import { toast } from "react-toastify";

const Tasks = () => {
  const [open, setOpen] = useState(false);
  const [seed, setSeed] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      setError(false);
      setLoading(true);
      loading && toast.loading("Fetching Projects");
      try {
        const authToken = JSON.parse(localStorage.getItem("auth")).auth_token;
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/projects/`,
          {
            headers: {
              Authorization: `${authToken}`,
            },
          }
        );
        setProjects(res.data);
      } catch (error) {
        setError(true);
        error && toast.error("Problem getting projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [seed]);

  return (
    <section className="h-100 flex text-[#222]">
      <div
        className={`w-full grid ${open ? "grid-cols-12" : ""}`}
        style={{ minHeight: "100vh" }}
      >
        {open && (
          <div className={`${open ? "sm:col-span-3 xl:col-span-2" : ""}`}>
            <Sidebar
              open={open}
              setOpen={setOpen}
              projects={projects}
              setSeed={setSeed}
            />
          </div>
        )}
        <div
          className={`bg-white w-full px-4 ${
            open ? "sm:col-span-9 xl:col-span-10" : ""
          }`}
        >
          <div className="pt-2 pb-2 flex justify-between items-center">
            {open ? (
              <></>
            ) : (
              <span
                onClick={() => setOpen((prev) => !prev)}
                className="rounded-xl"
                aria-label="toggle sidebar"
              >
                <OpenMenubar />
              </span>
            )}
            <div className="w-full">
              <div className="w-full">
                <div className="p-2 rounded">
                  <label className="input input-bordered flex items-center gap-2 bg-[whitesmoke]">
                    <input
                      type="text"
                      className="grow input-md"
                      placeholder="Search"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-6 h-6 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <BellIcon />
              <div className="avatar online">
                <div className="w-10 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <div className="flex flex-col">
                <small className="font-bold text-nowrap">Ivan Bowen</small>
                <small className="font-light text-nowrap">You are online</small>
              </div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn m-1 bg-transparent border-none text-black hover:bg-[whitesmoke]"
                >
                  <ChevronDown />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-[whitesmoke] rounded-box w-52"
                >
                  <li>
                    <a>Profile</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
    </section>
  );
};

export default Tasks;
