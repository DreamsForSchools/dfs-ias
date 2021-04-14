import React, { useContext } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { AppContext } from '../AppContextProvider';

import './Partner.scss';
import Instructor from '../Instructor.jsx';
import { Calendar4, People } from 'react-bootstrap-icons';

const Partner = ({ name, instructors }) => {
  const { sorterData, setSorterData } = useContext(AppContext);

  return (
    <div className="partner">
      <h1 className="partner-name">{name}</h1>
      <div className="info">
        <Calendar4 /> Schedule <People /> Instructors
      </div>
      <Droppable droppableId="partner">
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