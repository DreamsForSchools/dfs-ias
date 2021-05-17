import React, { useState, useContext } from "react";
import './Instructor.scss';
import Dot from '../../design-system/dots';
import { formatAvailability } from "../../util/formatData";
import { Modal } from "react-bootstrap";
import { InfoCircle, LockFill, UnlockFill } from 'react-bootstrap-icons';
import InstructorPopUp from './InstructorPopUp';
import {PROGRAM_COLOR_KEYS as program_color_keys} from '../../data/PROGRAMS';
import {GlobalContext} from "../../context/GlobalContextProvider";


const Instructor = ({ instructor, classId }) => {
  const [showInstructorPopUp, setShowInstructorPopUp] = useState();
  const [lock, setLock] = useState(false);
  const {seasonIdSelected} = useContext(GlobalContext);
  const axios = require('axios');

  const handleShowInstructorPopUp = () => setShowInstructorPopUp(true);
  const handleCloseInstructorPopUp = () => setShowInstructorPopUp(false);

  const handleLock = () => {
    console.log('lock')
    axios.post('/api/lock',
      {seasonId: seasonIdSelected, instructorId: instructor.id, classId: classId}
    ).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  const handleUnlock = () => {
    console.log('unlock')
    axios.delete('/api/unlock',
      {seasonId: seasonIdSelected, instructorId: instructor.id, classId: classId}
    ).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  return (
    <div className="instructor">
      <div className="lock" onClick={() => { setLock(!lock) }}>
        {lock ? <LockFill onClick={handleUnlock} className="icon" size={16} /> : <UnlockFill onClick={handleLock} className="icon" size={16} />}
      </div>
      <div className="name">
        {instructor.firstName} {instructor.lastName}
      </div>
      <div className="tags">
        {instructor.hasCar ? <div className="tag">Car</div> : null}
        {instructor.previouslyTaught ? <div className="tag">Returnee</div> : null}
        {instructor.isASL ? <div className="tag">ASL</div> : null}
      </div>
      <div className="pref">
        {[instructor.firstPref, instructor.secondPref, instructor.thirdPref, instructor.fourthPref].map((el, idx) =>
          <Dot color={program_color_keys[el]} key={idx}/>
        )}
      </div>
      {/* <div className="availability">
        {formatAvailability(instructor.availability).map((e) =>
          <h5>{e}</h5>
        )}
      </div> */}
      <div className="edit-icon"><InfoCircle onClick={handleShowInstructorPopUp}/></div>
      <Modal size="xl" show={showInstructorPopUp} onHide={handleCloseInstructorPopUp} onExited={handleCloseInstructorPopUp}>
        <InstructorPopUp instructor={instructor} />
      </Modal>
    </div>
  );
}

export default Instructor;