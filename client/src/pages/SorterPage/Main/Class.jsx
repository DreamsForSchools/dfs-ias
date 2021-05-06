import React, { useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './Class.scss';
import Instructor from '../Instructor.jsx';
import { CalendarWeek, People } from 'react-bootstrap-icons';
import { formatAvailability } from "../../../util/formatData";

const Class = ({ index, partner, time, slotCount, instructors, programName }) => {
  const [numInstructors, setNumInstructors] = useState(0);

  useEffect(() => {
    setNumInstructors(instructors.length);
  }, [setNumInstructors, instructors])

  return (
    <div className="class">
      <h1 className="partner-name">{partner}</h1>
      <div className="class-info">
        <div sclassName="schedule-info"><CalendarWeek /> {formatAvailability(time)} </div>
        <div className="instructors-info"><People /> {numInstructors}/{slotCount}</div>
      </div>
      <Droppable droppableId={programName + "-" + partner + "-" + index} type="INSTRUCTOR">
        {(provided) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              { instructors.map((instructor, index) => {
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
                          <Instructor
                            className="instructor"
                            instructor={instructor}
                            key={instructor.id}
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