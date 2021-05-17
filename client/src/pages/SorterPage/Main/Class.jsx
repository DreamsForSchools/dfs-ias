import React, { useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './Class.scss';
import Instructor from '../Instructor.jsx';
import { CalendarWeek, People, LockFill, UnlockFill } from 'react-bootstrap-icons';
import { formatAvailability } from "../../../util/formatData";

const Class = ({ id, partner, time, slotCount, instructors, programName }) => {
  const [numInstructors, setNumInstructors] = useState(0);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    setNumInstructors(instructors.length);
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
        <div><People /> {numInstructors}/{slotCount}</div>
      </div>
      <Droppable droppableId={programName + "-" + partner + "-" + id} type="INSTRUCTOR">
        {(provided) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              { instructors.map((instructor, index) => {
                return (
                  <Draggable
                    key={instructor.instructorId}
                    draggableId={instructor.instructorId?.toString()}
                    index={index}
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