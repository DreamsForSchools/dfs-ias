import React, { useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './Class.scss';
import Instructor from '../Instructor.jsx';
import { Calendar4, People } from 'react-bootstrap-icons';

const Partner = ({ name, index, instructors }) => {
  const [numInstructors, setNumInstructors] = useState(0);

  useEffect(() => {
    setNumInstructors(instructors.length);
  }, [setNumInstructors, instructors])

  return (
    <div className="partner">
      <h1 className="partner-name">{name}</h1>
      <div className="partner-info">
        <div sclassName="schedule-info"><Calendar4 /> MW 2:00 pm - 3:00 pm </div>
        <div className="instructors-info"><People /> {numInstructors}/5 Instructors </div>
      </div>
      <Droppable droppableId={"partner" + index} type="INSTRUCTOR">
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

export default Partner;