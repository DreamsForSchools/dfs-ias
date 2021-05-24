import React, { useState, useContext } from "react";
import './Instructor.scss';
import Dot from '../../design-system/dots';
import { Modal } from "react-bootstrap";
import { InfoCircle, LockFill, UnlockFill } from 'react-bootstrap-icons';
import InstructorPopUp from './InstructorPopUp';
import {PROGRAM_COLOR_KEYS as program_color_keys} from '../../data/PROGRAMS';
import {GlobalContext} from "../../context/GlobalContextProvider";


const Instructor = ({ instructor, classId, state }) => {
  const [showInstructorPopUp, setShowInstructorPopUp] = useState();
  const [lock, setLock] = useState(state && state["lockedInstructors"].includes(instructor.instructorId));
  const {seasonSelected, setToastText} = useContext(GlobalContext);
  const axios = require('axios');

  const handleShowInstructorPopUp = () => setShowInstructorPopUp(true);
  const handleCloseInstructorPopUp = () => setShowInstructorPopUp(false);

  const handleLock = () => {
    setLock(true);
    axios.post('/api/lock',
      {seasonId: seasonSelected.seasonId, instructorId: instructor.instructorId, classId: classId}
    ).then((response) => {
      setToastText({status: 'Success', message: `Locked ${instructor.firstName} ${instructor.lastName}`});
    }, (error) => {
      console.log(error);
    });
  }

  const handleUnlock = () => {
    setLock(false);
    axios.put('/api/unlock',
      {seasonId: seasonSelected.seasonId, instructorId: instructor.instructorId, classId: classId}
    ).then((response) => {
      setToastText({status: 'Success', message: `Unlocked ${instructor.firstName} ${instructor.lastName}`});
    }, (error) => {
      console.log(error);
    });
  }

  return (
    <div className="instructor">
      { state &&
        <div className="lock">
          {lock ? <LockFill onClick={handleUnlock} className="icon" size={16} /> : <UnlockFill onClick={handleLock} className="icon" size={16} />}
        </div>
      }
      <div className="name">
        {instructor.firstName} {instructor.lastName}
      </div>
      <div className="pref">
        {[instructor.firstPref, instructor.secondPref, instructor.thirdPref, instructor.fourthPref].map((el, idx) =>
          <Dot color={program_color_keys[el]} key={idx}/>
        )}
      </div>
      <div className="tags">
        {instructor.hasCar ? <div className="tag">Car</div> : null}
        {instructor.previouslyTaught ? <div className="tag">Returnee</div> : null}
        {instructor.isASL ? <div className="tag">ASL</div> : null}
      </div>
      <div className="edit-icon"><InfoCircle onClick={handleShowInstructorPopUp}/></div>
      <Modal size="xl" show={showInstructorPopUp} onHide={handleCloseInstructorPopUp} onExited={handleCloseInstructorPopUp}>
        <InstructorPopUp instructor={instructor} />
      </Modal>
    </div>
  );
}

export default Instructor;