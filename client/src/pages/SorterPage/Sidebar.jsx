import React, { useCallback, useReducer } from "react";
import "./Sidebar.scss";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { Search, PlusCircle } from 'react-bootstrap-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { data } from './data';
import produce from "immer";

const dragReducer = produce((draft, action) => {
  switch (action.type) {
    case "MOVE": {
      draft[action.from] = draft[action.from] || [];
      draft[action.to] = draft[action.to] || [];
      const [removed] = draft[action.from].splice(action.fromIndex, 1);
      draft[action.to].splice(action.toIndex, 0, removed);
    }
  }
});

const Sidebar = () => {
  const [state, dispatch] = useReducer(dragReducer, { items: data, });

  const onDragEnd = useCallback((result) => {
    if (result.reason === "DROP") {
      if (!result.destination) {
        return;
      }
      dispatch({
        type: "MOVE",
        from: result.source.droppableId,
        to: result.destination.droppableId,
        fromIndex: result.source.index,
        toIndex: result.destination.index,
      });
    }
  }, []);

  return (
    <div className="sidebar">
      <h1 className="title">Unassigned Instructors</h1>
      <InputGroup className="search">
        <FormControl
          placeholder="Search"
          aria-label="Search"
          className="search-bar"
        />
        <InputGroup.Append>
          <Button variant="primary" className="search-btn"><Search /></Button>
        </InputGroup.Append>
      </InputGroup>
      <Button className="filter-btn">Filter</Button>
      <Button className="add-instructor-btn"><PlusCircle /> Add Instructor</Button>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="items" type="INSTRUCTOR">
          {(provided) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {state.items?.map((instructor, index) => {
                  return (
                    <Draggable
                      key={instructor.id}
                      draggableId={instructor.id}
                      index={index}
                    >
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="instructor_container"
                          >
                            <div>
                              <span>
                                {instructor.name}
                              </span>
                            </div>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Sidebar;
