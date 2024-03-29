import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import MarkdownPreview from "@uiw/react-markdown-preview";
import axios from "axios";
import { toast } from "react-toastify";

const DrawerContents = ({ title, due_date, id, description }) => {
  return (
    <div className="drawer-side">
      <label
        htmlFor={`my-drawer-${id}`}
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul
        className="menu p-4 w-[30%] min-h-full text-base-content bg-[whitesmoke] z-20"
        style={{ zIndex: "50!important" }}
      >
        {/* Sidebar content here */}
        <h3 className="">Title: {title}</h3>
        <h4>Due Date: {due_date}</h4>
        <MarkdownPreview source={description.toString().trim()} />
      </ul>
    </div>
  );
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  console.log("reordering");
  //   console.log(result, startIndex, endIndex);
  if (result.length > 0) {
    const [removed] = result.splice(startIndex, 1);
    // console.log("removed======>", removed);
    if (removed) result.splice(endIndex, 0, removed);
  } else {
    result.push({ id: "item-0", content: "item 0" });
  }
  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  width: "100%",
  maxWidth: "275px",
  borderRadius: "12px",
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "pink",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "whitesmoke",
  padding: grid,
  width: "25%",
  minWidth: "200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

function DraggableTasks({ tasks = [], projectId }) {
  const [state, setState] = useState({
    "To-do": tasks.filter((task) => task.status === 1),
    "In Progress": tasks.filter((task) => task.status === 2),
    "In Review": tasks.filter((task) => task.status === 3),
    Done: tasks.filter((task) => task.status === 4),
  });

  const updateTaskStatus = (droppableId, taskId) => {
    const authToken = JSON.parse(localStorage.getItem("auth")).auth_token;
    axios
      .post(
        `${
          import.meta.env.VITE_SERVER_URL
        }/projects/${projectId}/tasks/${taskId}/status`,
        { status_name: droppableId },
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

  const onDragEnd = (result) => {
    if (!result.destination) {
      console.log("no destination");
      return;
    }
    const item = state[result.source.droppableId].find(
      (i) => result.draggableId == i.id
    );
    console.log(
      state[result.source.droppableId],
      item,
      result.destination.droppableId,
      result
    );
    const remItems = state[result.source.droppableId].filter(
      (i) => i.id != item.id
    );
    console.log(item);
    if (state[result.destination.droppableId].length > 0) {
      const lItems =
        result.destination.droppableId === result.source.droppableId
          ? state[result.destination.droppableId]
          : [...state[result.destination.droppableId], item];
      const items = reorder(
        lItems,
        result.source.index,
        result.destination.index
      );
      console.log("items", items);
      if (result.destination.droppableId === result.source.droppableId) {
        console.log("same");
        setState((prev) => ({
          ...prev,
          [result.destination.droppableId]: items,
        }));
      } else {
        console.log("different");
        setState((prev) => ({
          ...prev,
          [result.destination.droppableId]: items,
          [result.source.droppableId]: remItems,
        }));
        updateTaskStatus(result.destination.droppableId, result.draggableId);
      }
    } else {
      // const items =
      setState((prev) => ({
        ...prev,
        [result.destination.droppableId]: [
          ...prev[result.destination.droppableId],
          item,
        ],
        [result.source.droppableId]: remItems,
      }));
      updateTaskStatus(result.destination.droppableId, result.draggableId);
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex max-w-full overflow-x-auto">
          <Droppable droppableId="To-do">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className="relative"
              >
                <h3 className="absolute top-0 bg-red-400 w-1/2 text-center py-1 text-white rounded-b-lg">To do</h3>
                <div className="mt-10">
                {state["To-do"].map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <div
                          className="drawer-end"
                          style={{
                            display: "grid",
                            gridAutoColumns: "max-content auto",
                            width: "100%",
                          }}
                        >
                          <input
                            id={`my-drawer-${item.id}`}
                            type="checkbox"
                            className="drawer-toggle"
                          />
                          <div className="drawer-content">
                            {/* Page content here */}
                            <label
                              htmlFor={`my-drawer-${item.id}`}
                              className="drawer-button z-10"
                              style={{ zIndex: "10!important" }}
                            >
                              <h3 className="">Title: {item.title}</h3>
                              <h4>Due Date: {item.due_date}</h4>
                            </label>
                          </div>
                          <DrawerContents
                            title={item.title}
                            due_date={item.due_date}
                            id={item.id}
                            description={item.description}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="In Progress">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className="relative"
              >
                <h3 className="absolute top-0 bg-red-400 w-1/2 text-center py-1 text-white rounded-b-lg">In Progress</h3>
                <div className="mt-10">
                {state["In Progress"].map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <div
                          className="drawer-end"
                          style={{
                            display: "grid",
                            gridAutoColumns: "max-content auto",
                            width: "100%",
                          }}
                        >
                          <input
                            id={`my-drawer-${item.id}`}
                            type="checkbox"
                            className="drawer-toggle"
                          />
                          <div className="drawer-content">
                            {/* Page content here */}
                            <label
                              htmlFor={`my-drawer-${item.id}`}
                              className="drawer-button z-10"
                              style={{ zIndex: "10!important" }}
                            >
                              <h3 className="">Title: {item.title}</h3>
                              <h4>Due Date: {item.due_date}</h4>
                            </label>
                          </div>
                          <DrawerContents
                            title={item.title}
                            due_date={item.due_date}
                            id={item.id}
                            description={item.description}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="In Review">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className="relative"
              >
                <h3 className="absolute top-0 bg-red-400 w-1/2 text-center py-1 text-white rounded-b-lg">In Review</h3>
                <div className="mt-10">
                {state["In Review"].map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <div
                          className="drawer-end"
                          style={{
                            display: "grid",
                            gridAutoColumns: "max-content auto",
                            width: "100%",
                          }}
                        >
                          <input
                            id={`my-drawer-${item.id}`}
                            type="checkbox"
                            className="drawer-toggle"
                          />
                          <div className="drawer-content">
                            {/* Page content here */}
                            <label
                              htmlFor={`my-drawer-${item.id}`}
                              className="drawer-button z-10"
                              style={{ zIndex: "10!important" }}
                            >
                              <h3 className="">Title: {item.title}</h3>
                              <h4>Due Date: {item.due_date}</h4>
                            </label>
                          </div>
                          <DrawerContents
                            title={item.title}
                            due_date={item.due_date}
                            id={item.id}
                            description={item.description}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Done">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className="relative"
              >
                <h3 className="absolute top-0 bg-red-400 w-1/2 text-center py-1 text-white rounded-b-lg">Done</h3>
                <div className="mt-10">
                {state["Done"].map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        className=""
                      >
                        <div
                          className="drawer-end z-10"
                          style={{
                            display: "grid",
                            gridAutoColumns: "max-content auto",
                            width: "100%",
                          }}
                        >
                          <input
                            id={`my-drawer-${item.id}`}
                            type="checkbox"
                            className="drawer-toggle"
                          />
                          <div className="drawer-content">
                            {/* Page content here */}
                            <label
                              htmlFor={`my-drawer-${item.id}`}
                              className="drawer-button"
                            >
                              <h3 className="">Title: {item.title}</h3>
                              <h4>Due Date: {item.due_date}</h4>
                            </label>
                          </div>
                          <DrawerContents
                            title={item.title}
                            due_date={item.due_date}
                            id={item.id}
                            description={item.description}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
}

export default DraggableTasks;
