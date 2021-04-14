import React, { useContext, useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { AppContext } from '../AppContextProvider';

import './Partner.scss';
import Instructor from '../Instructor.jsx';
import { Calendar4, People } from 'react-bootstrap-icons';

const Partner = ({ name, instructors, partnerId }) => {
  const { sorterData, setSorterData } = useContext(AppContext);
  const [numInstructors, setNumInstructors] = useState(0);

  useEffect(() => {
    setNumInstructors(instructors.length);
  }, [sorterData, instructors, setNumInstructors])

  return (
    <div className="partner">
      <h1 className="partner-name">{name}</h1>
      <div className="info">
        <Calendar4 /> Schedule <People /> {numInstructors} Instructors
      </div>
      <Droppable droppableId="partnerId">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {
              instructors.map((instructor, index) => (
                <Draggable
                  key={instructor.id}
                  draggableId={instructor.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Instructor
                        instructorInfo={instructor}
                      />
                    </div>
                  )}
                </Draggable>
              ))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Partner;