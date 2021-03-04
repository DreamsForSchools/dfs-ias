import React, { useState, useCallback, useReducer } from "react";
import './ProgramModule.scss';
import { Accordion, Card } from "react-bootstrap";
import { CaretRightFill, CaretDownFill, LockFill, UnlockFill } from 'react-bootstrap-icons';
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

function ProgramModule({ name, color }) {
  const [showContent, setShowContent] = useState(false);
  const [lock, setLock] = useState(false);
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
    <Accordion>
      <Card className="program-module" style={{ backgroundColor: color }}>
        <Card.Header>
          <Accordion.Toggle className="program-header" onClick={() => {setShowContent(!showContent)}} as={Card.Header} eventKey="0">
            <span className="program-left">
              {showContent ? <CaretDownFill className="icon" /> : <CaretRightFill className="icon" />} 
              <div className="program-name">{name}</div>
            </span>
            <span className="program-right" onClick={() => {setLock(!lock)}}>
              {lock ? <LockFill className="icon" /> : <UnlockFill className="icon" />}
            </span>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="program-body">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="items" type="INSTRUCTOR">
                {(provided) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="partner_container"
                    >
                      <h1 className="partner-name">Villa Fundamental</h1>
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
              <Droppable droppableId="items2" type="INSTRUCTOR">
                {(provided) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="partner_container"
                    >
                      <h1 className="partner-name">Carr Intermediate</h1>
                      {state.items2?.map((instructor, index) => {
                        return (
                          <Draggable
                            key={instructor.id}
                            draggableId={instructor.id}
                            index={index}                          >
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
              <Droppable droppableId="items3" type="INSTRUCTOR">
                {(provided) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="partner_container"
                    >
                      <h1 className="partner-name">Fremont Fundamental</h1>
                      {state.items3?.map((instructor, index) => {
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
              <Droppable droppableId="items4" type="INSTRUCTOR">
                {(provided) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="partner_container"
                    >
                      <h1 className="partner-name">Edison Elementary</h1>
                      {state.items4?.map((instructor, index) => {
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
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default ProgramModule;