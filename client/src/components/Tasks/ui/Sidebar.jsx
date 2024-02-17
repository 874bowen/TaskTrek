import { useRef } from "react";
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
// import { useClickAway } from "react-use"

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ open, setOpen }) => {
  const ref = useRef(null);
  // useClickAway(ref, () => setOpen(false))
  const toggleSidebar = () => setOpen((prev) => !prev);
  const navigate = useNavigate();

  return (
    <>
      {open && (
        <AnimatePresence mode="wait" initial={false} className="">
          <motion.div
            {...framerSidebarBackground}
            aria-hidden="true"
            className="backdrop-blur-sm"
            style={{ width: "100%" }}
          ></motion.div>
          <motion.div
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
                      <a>Project 1</a>
                    </li>
                    <li>
                      <a>Project 2</a>
                    </li>
                    <li>
                      <a>Project 3</a>
                    </li>
                    <li>
                      <a>Project 4</a>
                    </li>
                    {/* <li>
                      <details open>
                        <summary>Parent</summary>
                        <ul>
                          <li>
                            <a>Submenu 1</a>
                          </li>
                          <li>
                            <a>Submenu 2</a>
                          </li>
                        </ul>
                      </details>
                    </li> */}
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
              className="btn btn-block fa-lg gradient-custom-2 mt-4"
              type="button"
            >
              Create Project
            </button>
            </ul>
            {/* <ul className="list-unstyled">
                 <li>
                    <a
                      onClick={() => navigate("/")}
                      className="px-4 flex justify-between items-center gap-5 p-2 transition hover:bg-dark text-dark"
                    >
                      <motion.div {...framerIcon} className="flex items-center gap-2">
                      <HomeIcon className="text-2xl" />
                      <motion.span>Home</motion.span>
                      </motion.div>
                    </a>
                  </li>
                  <li>
                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">Click</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li><a>Item 1</a></li>
                      <li><a>Item 2</a></li>
                    </ul>
                  </div>
                  </li>
              {items.map((item, idx) => {
                const { title, href, Icon } = item;
                return (
                  <li key={title}>
                    <a
                      onClick={toggleSidebar}
                      href={href}
                      className="px-4 flex justify-between items-center gap-5 p-2 transition hover:bg-dark text-dark"
                    >
                      <motion.span {...framerText(idx)}>{title}</motion.span>
                      <motion.div {...framerIcon}>
                        <Icon className="text-2xl" />
                      </motion.div>
                    </a>
                  </li>
                );
              })}
            </ul> */}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

// ...

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

// const items = [
//   { title: "Home", Icon: OpenMenubar, href: "#" },
//   { title: "Projects", Icon: OpenMenubar },
//   { title: "Calendar", Icon: OpenMenubar, href: "#" },
//   { title: "Roadmaps", Icon: OpenMenubar, href: "#" },
//   { title: "Shop", Icon: OpenMenubar, href: "#" },
// ];

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

// const framerText = (delay) => {
//   return {
//     initial: { opacity: 0, x: -50 },
//     animate: { opacity: 1, x: 0 },
//     transition: {
//       delay: 0.5 + delay / 10,
//     },
//   };
// };

// const framerIcon = {
//   initial: { scale: 0 },
//   animate: { scale: 1 },
//   transition: {
//     type: "spring",
//     stiffness: 260,
//     damping: 20,
//     delay: 1.5,
//   },
// };
export default Sidebar;
