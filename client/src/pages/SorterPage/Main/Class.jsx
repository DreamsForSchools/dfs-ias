import React, { useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './Class.scss';
import Instructor from '../Instructor.jsx';
import { CalendarWeek, People, LockFill, UnlockFill, PencilSquare } from 'react-bootstrap-icons';
import { formatAvailability } from "../../../util/formatData";
import { Button, Modal  } from 'react-bootstrap';

const Class = ({ id, partner, time, instructorsNeeded, instructors, programId, state, parentLockStatus}) => {
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
        <Modal sz="lg" show={assignPopup}
        onHide={() => setAssignPopup(false)}
        aria-labelledby="contained-modal-title-vcenter"                            
        centered>
        <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
          <Modal.Title>Assign Instructors</Modal.Title>
        </Modal.Header>
          <Modal.Body style={{padding: '1rem 3rem'}}>
            
            
            DUMMY TEXT?

            
          
          
          
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
