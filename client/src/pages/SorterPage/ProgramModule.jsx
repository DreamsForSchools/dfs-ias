import React, { useState, useCallback, useReducer } from "react";
import './ProgramModule.scss';
import Partner from './Partner.jsx';
import { Accordion, Card } from "react-bootstrap";
import { CaretRightFill, LockFill, UnlockFill, Calendar4, People } from 'react-bootstrap-icons';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { getRandomInstructorSet } from "../../util/sampleData";
import produce from "immer";
import Dot from "../../components/Dot";
import { formatAvailability } from "../../util/formatData";

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
  const [state, dispatch] = useReducer(dragReducer, { items: getRandomInstructorSet(4), items1: getRandomInstructorSet(4), items2: getRandomInstructorSet(4), items3: getRandomInstructorSet(4)});

  const programsColorKey = {
    "AppJam": "#BB6BD9",
    "WebJam": "#40CCC8",
    "LESTEM": "#F2994A",
    "Engineering Inventors": "#4B4B92",
    "Scratch": "#F2C94C"
  };

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
    <div>
      <Accordion className="program_accordion">
        <Card className="program-module" style={{ backgroundColor: color }}>
          <Accordion.Toggle className="program-header" onClick={() => { setShowContent(!showContent) }} as={Card.Header} eventKey="0">
            <span className="program-left">
              <CaretRightFill className={showContent ? "caret-down" : "caret-right"}/>
              <div className="program-name">{name}</div>
            </span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="program-body">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="items" type="INSTRUCTOR">
                  {(provided) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="partner"
                      >
                        <h1 className="partner-name">Villa Fundamental</h1>
                        <div className="info">
                          <Calendar4 /> Schedule <People /> Instructors
                        </div>
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
                                  >
                                    <div className="instructor">
                                      <div className="name">
                                        {instructor.firstName} {instructor.lastName}
                                      </div>
                                      <div className="tags">
                                        {instructor.hasCar ? <div className="tag">Car</div> : null}
                                        {instructor.previouslyTaught ? <div className="tag">Returnee</div> : null}
                                        {instructor.isASL ? <div className="tag">ASL</div> : null}
                                      </div>
                                      <div className="pref">
                                        {instructor.pref.map((el, idx) =>
                                            <Dot color={programsColorKey[el]} key={idx}/>
                                        )}
                                      </div>
                                      <div className="availability">
                                        {formatAvailability(instructor.availability).map((e) =>
                                          <h5>{e}</h5>
                                        )}
                                      </div>
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
                <Droppable droppableId="items1" type="INSTRUCTOR">
                  {(provided) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="partner"
                      >
                        <h1 className="partner-name">Carr Intermediate</h1>
                        <div className="info">
                          <Calendar4 /> Schedule <People /> Instructors
                        </div>
                        {state.items1?.map((instructor, index) => {
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
                                  >
                                    <div className="instructor">
                                      <div className="name">
                                        {instructor.firstName} {instructor.lastName}
                                      </div>
                                      <div className="tags">
                                        {instructor.hasCar ? <div className="tag">Car</div> : null}
                                        {instructor.previouslyTaught ? <div className="tag">Returnee</div> : null}
                                        {instructor.isASL ? <div className="tag">ASL</div> : null}
                                      </div>
                                      <div className="pref">
                                        {instructor.pref.map((el, idx) =>
                                            <Dot color={programsColorKey[el]} key={idx}/>
                                        )}
                                      </div>
                                      <div className="availability">
                                        {formatAvailability(instructor.availability).map((e) =>
                                          <h5>{e}</h5>
                                        )}
                                      </div>
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
                        className="partner"
                      >
                        <h1 className="partner-name">Fremont Fundamental</h1>
                        <div className="info">
                          <Calendar4 /> Schedule <People /> Instructors
                        </div>
                        {state.items2?.map((instructor, index) => {
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
                                  >
                                    <div className="instructor">
                                      <div className="name">
                                        {instructor.firstName} {instructor.lastName}
                                      </div>
                                      <div className="tags">
                                        {instructor.hasCar ? <div className="tag">Car</div> : null}
                                        {instructor.previouslyTaught ? <div className="tag">Returnee</div> : null}
                                        {instructor.isASL ? <div className="tag">ASL</div> : null}
                                      </div>
                                      <div className="pref">
                                        {instructor.pref.map((el, idx) =>
                                            <Dot color={programsColorKey[el]} key={idx}/>
                                        )}
                                      </div>
                                      <div className="availability">
                                        {formatAvailability(instructor.availability).map((e) =>
                                          <h5>{e}</h5>
                                        )}
                                      </div>
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
                        className="partner"
                      >
                        <h1 className="partner-name">Edison Elementary</h1>
                        <div className="info">
                          <Calendar4 /> Schedule <People /> Instructors
                        </div>
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
                                  >
                                    <div className="instructor">
                                      <div className="name">
                                        {instructor.firstName} {instructor.lastName}
                                      </div>
                                      <div className="tags">
                                        {instructor.hasCar ? <div className="tag">Car</div> : null}
                                        {instructor.previouslyTaught ? <div className="tag">Returnee</div> : null}
                                        {instructor.isASL ? <div className="tag">ASL</div> : null}
                                      </div>
                                      <div className="pref">
                                        {instructor.pref.map((el, idx) =>
                                            <Dot color={programsColorKey[el]} key={idx}/>
                                        )}
                                      </div>
                                      <div className="availability">
                                        {formatAvailability(instructor.availability).map((e) =>
                                          <h5>{e}</h5>
                                        )}
                                      </div>
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
                {/* <Droppable droppableId="items" type="INSTRUCTOR">
                  {(provided) => {
                    return (
                      <Partner 
                        name='Villa Fundamental'
                        provided={provided}
                        state={state}
                        {...provided.droppableProps}
                      />
                    );
                  }}
                </Droppable>
                <Droppable droppableId="items2" type="INSTRUCTOR">
                  {(provided) => {
                    return (
                      <Partner 
                        name='Carr Intermmediate'
                        provided={provided}
                        state={state}
                        {...provided.droppableProps}
                      />
                    );
                  }}
                </Droppable>
                <Droppable droppableId="items3" type="INSTRUCTOR">
                  {(provided) => {
                    return (
                      <Partner 
                        name='Fremont Fundamental'
                        provided={provided}
                        state={state}
                        {...provided.droppableProps}
                      />
                    );
                  }}
                </Droppable>
                <Droppable droppableId="items4" type="INSTRUCTOR">
                  {(provided) => {
                    return (
                      <Partner 
                        name='Edison Elementary'
                        provided={provided}
                        state={state}
                        {...provided.droppableProps}
                      />
                    );
                  }}
                </Droppable> */}
              </DragDropContext>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <span className="program-right" onClick={() => { setLock(!lock) }}>
        {lock ? <LockFill className="icon" /> : <UnlockFill className="icon" />}
      </span>
    </div>
  );
}

export default ProgramModule;