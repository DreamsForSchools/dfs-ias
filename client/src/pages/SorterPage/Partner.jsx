import React from "react";
import './Partner.scss';
import Instructor from './Instructor.jsx';
import { Calendar4, People } from 'react-bootstrap-icons';
import { Draggable } from 'react-beautiful-dnd';

function Partner({ name, provided, state }) {

  return (
    <div className="partner">
      <h1 className="partner-name">{name}</h1>
      <div className="info">
        <Calendar4 /> Schedule <People /> Instructors
      </div>
      {state.items?.map((instructor, index, provided) => {
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
                      <Instructor
                        firstName={instructor.firstName}
                        lastName={instructor.lastName}
                        car={instructor.hasCar}
                        returnee={instructor.previouslyTaught}
                        ASL={instructor.isASL}
                        pref={instructor.pref}
                        availability={instructor.availability}
                      />                                       
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
}

export default Partner;