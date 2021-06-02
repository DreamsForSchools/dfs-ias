import React, { useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './Class.scss';
import Instructor from '../Instructor.jsx';
import { CalendarWeek, People, LockFill, UnlockFill } from 'react-bootstrap-icons';
import { formatAvailability } from "../../../util/formatData";

const Class = ({ id, partner, time, instructorsNeeded, instructors, programId, state }) => {
  const [numInstructors, setNumInstructors] = useState(0);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    setNumInstructors(instructors ? instructors.length : 0);
  }, [setNumInstructors, instructors])

  return (
    <div className="class">
      <div className="header">
        <h1 className="partner-name">{partner}</h1>
        <div className="lock" onClick={() => { setLock(!lock) }}>
          {lock ? <LockFill className="icon" size={18} /> : <UnlockFill className="icon" size={18} />}
        </div>
      </div>
      <div className="class-info">
        <div><CalendarWeek /> {formatAvailability(time)} </div>
        <div><People /> {numInstructors}/{instructorsNeeded}</div>
      </div>
      <Droppable droppableId={programId + "-" + partner + "-" + id} type="INSTRUCTOR">
        {(provided) => {
          return (
            <div className={"spacer"}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              { instructors?.map((instructor, index) => {
                return (
                  <Draggable
                    key={instructor.instructorId}
                    draggableId={instructor.instructorId.toString()}
                    index={index}
                    isDragDisabled={state["lockedInstructors"].includes(instructor.instructorId)}
                  >
                    {(provided) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}                        
                        >
                          <Instructor
                            key={instructor.instructorId}
                            instructor={instructor}
                            classId={id}
                            state={state}
                          />
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
    </div>
  );
}

export default Class;