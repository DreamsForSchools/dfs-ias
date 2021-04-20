import React, { useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
// import { AppContext } from '../AppContextProvider';

import './Partner.scss';
import Instructor from '../Instructor.jsx';
import { Calendar4, People } from 'react-bootstrap-icons';

const Partner = ({ name, index, instructors }) => {
  // const { sorterData, setSorterData } = useContext(AppContext);
  const [numInstructors, setNumInstructors] = useState(0);

  useEffect(() => {
    setNumInstructors(instructors.length);
  }, [setNumInstructors, instructors])

  return (
    <div className="partner">
      <h1 className="partner-name">{name}</h1>
      <div className="partner-info">
        <Calendar4 /> Schedule <People /> {numInstructors} Instructors
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