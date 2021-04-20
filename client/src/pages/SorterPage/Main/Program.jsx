import React, { useContext, useState } from "react";
import { AppContext } from '../AppContextProvider';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import './Program.scss';
import Partner from './Partner.jsx';
// import { CaretRightFill, LockFill, UnlockFill } from 'react-bootstrap-icons';

const Program = ({ name, color, state }) => {
  // const [showContent, setShowContent] = useState(false);
  // const [lock, setLock] = useState(false);
  const { partners } = useContext(AppContext);

  return (
    <div className="program">
      <div className="program-module" style={{ backgroundColor: color }}>
        <div className="program-name">{name}</div>
        <div className="partners-container">
            {/* <Droppable droppableId={"partner1"} type="INSTRUCTOR">
              {(provided) => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {state["partner1"]?.map((instructor, index) => {
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
                                {instructor.id}
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
            </Droppable> */}
          {
            partners.map(partner => {             
              return (
                <div>
                  <Partner
                    name={partner.name}
                    index={partner.index}
                    instructors={state["partner" + partner.index]}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Program;