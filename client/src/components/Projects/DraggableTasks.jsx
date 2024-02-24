import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// fake data generator
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

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

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "whitesmoke",
  padding: grid,
  width: "25%",
  minWidth: "200px",
});

function DraggableTasks() {
  const [state, setState] = useState({
    "to-do": getItems(10),
    "in-progress": [],
    "in-review": [],
    done: [],
  });

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const item = state[result.source.droppableId].find(i => result.draggableId === i.id)
    const remItems = state[result.source.droppableId].filter((i) => i.id !== item.id)
    console.log(item);
    if(state[result.destination.droppableId].length > 0) {
        const lItems = result.destination.droppableId === result.source.droppableId ? state[result.destination.droppableId] : [...state[result.destination.droppableId], item]
        const items = reorder(
        lItems,
        result.source.index,
        result.destination.index
        );
        console.log("items", items);
        if (result.destination.droppableId === result.source.droppableId) {
            setState((prev) => ({...prev, [result.destination.droppableId]: items}));
        } else {
            setState((prev) => ({...prev, [result.destination.droppableId]: items, [result.source.droppableId]: remItems}));
        }
        
    } else {
        // const items =
        setState((prev) => ({...prev, [result.destination.droppableId]: [...prev[result.destination.droppableId], item], [result.source.droppableId]: remItems}));
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex max-w-full overflow-x-auto bg-green-500">
          <Droppable droppableId="to-do">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {state["to-do"].map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
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
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="in-progress">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {state["in-progress"].map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
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
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="in-review">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {state["in-review"].map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
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
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="done">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {state["done"].map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
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
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
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
