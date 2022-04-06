import React, { useState, useContext, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './Class.scss';
import Instructor from '../Instructor.jsx';
import { CalendarWeek, People, LockFill, UnlockFill, PencilSquare } from 'react-bootstrap-icons';
import { formatAvailability } from "../../../util/formatData";
import { Button, Modal  } from 'react-bootstrap';
import {GlobalContext} from "../../../context/GlobalContextProvider";

import AssignInstructorsTable from './AssignInstructorsTable';

const Class = ({ id, partner, time, instructorsNeeded, instructors, programId, state, parentLockStatus, seasonSelected }) => {
  const {   
    programColorMap,    
  } = useContext(GlobalContext);

  const [numInstructors, setNumInstructors] = useState(0);
  const [lock, setLock] = useState(false);
  const [assignPopup, setAssignPopup] = useState(false);


  const handleLock = () => {
      setLock(true);
  }
  const handleUnlock = () => {
      setLock(false);
  }

  useEffect(() => {
      let val = true;
      if(instructors){
          for(const instructor of instructors){
              if(!state["lockedInstructors"].includes(instructor.instructorId)){
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

  }, [parentLockStatus,setNumInstructors, instructors])

  const assignToggle = () => {
      setAssignPopup(true);
  }

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

    {/* implementing for the modal pop up */}
    <div className="assign-modal-btns">
      <Button size="md"   style={{marginRight: '0.5rem'}}
                                          onClick={assignToggle}   data-testid="assignToProgram">Assign Instructors
                                      <span style={{marginLeft: '0.5rem'} }><PencilSquare/></span>
      </Button>
    </div>

      <Droppable droppableId={programId + "-" + partner + "-" + id} type="INSTRUCTOR">
        {(provided) => {
          return (
            <div className={"spacer"}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >

              {/* This is the assignment of instructors to program space. */}
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

        <Modal  size="xl" show={assignPopup} 
        onHide={() => setAssignPopup(false)}
        aria-labelledby="contained-modal-title-vcenter"                            
        centered>
        <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
          <Modal.Title>Assign Instructors</Modal.Title>
        </Modal.Header>
          <Modal.Body >
            
            
            DUMMY TEXT?
            <AssignInstructorsTable
              show={assignPopup} 
              time={time[0]}
              programsColorKey = {programColorMap}
              seasonSelected={seasonSelected}
            />          
          
          
          </Modal.Body>
          <Modal.Footer style={{border: '0'}}>
        <Button variant="light" onClick={() => setAssignPopup(false)}>
            Close
        </Button>
        <Button variant="light"> 
        {/* needs onclick */}
                
            Confirm
        </Button>
        </Modal.Footer>
        </Modal>      
    </div>

  );
}

export default Class;
