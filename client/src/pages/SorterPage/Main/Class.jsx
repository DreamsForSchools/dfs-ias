import React, { useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './Class.scss';
import Instructor from '../Instructor.jsx';
import { CalendarWeek, People, LockFill, UnlockFill } from 'react-bootstrap-icons';
import { formatAvailability } from "../../../util/formatData";

/**
 * 
 * @param {id} - Class ID?
 * @param {partner} - Associated partner? 
 * @param {time} - Set time for when the class is set to start?
 * @param {instructorsNeeded} - # of instructors needed
 * @param {instructors} - # of instructors added
 * @param {programId}
 * @param {state} - ???
 * @param {parentLockStatus} - ??
 * 
 */
const Class = ({ id, partner, time, instructorsNeeded, instructors, programId, state, parentLockStatus}) => {

  const [numInstructors, setNumInstructors] = useState(0);
  const [lock, setLock] = useState(false);

  const handleLock = () => {
      setLock(true);
  }
  const handleUnlock = () => {
      setLock(false);
  }

  useEffect(() => {

      // What is 'val' supposed to be?
      //val is false if the instructor is not in the lockedInstructors 
      // lockedInstructors is instructors locked in a section/class
      let val = true;
      if (instructors) {
          for (const instructor of instructors) {
              if (!state["lockedInstructors"].includes(instructor.instructorId)) {
                  val = false;
              }
          }
      }

      let count = (instructors ? instructors.length : 0);
      setNumInstructors(count);
      if(count === 0){ 
          setLock(false);
      } else if(parentLockStatus === true || val) {
          setLock(true);
      } else {
          setLock(false);
      }

  }, [parentLockStatus, setNumInstructors, instructors])

  return (
    <div className="class">
      <div className="header">
        <h1 className="partner-name">{partner}</h1>
        {/*<div className="lock" onClick={() => { setLock(!lock) }}>*/}
        {/*    {lock ? <LockFill onClick={handleUnlock} className="icon" size={18}/> :*/}
        {/*        <UnlockFill onClick={handleLock} className="icon" size={18}/>}*/}
        {/*</div>*/}
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
                            parentLockStatus={lock}
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
