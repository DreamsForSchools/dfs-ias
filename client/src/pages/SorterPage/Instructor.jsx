import React, { useState } from "react";
import './Instructor.scss';
import Dot from '../../design-system/dots';
import { formatAvailability } from "../../util/formatData";
import { Modal } from "react-bootstrap";
import { InfoCircle } from 'react-bootstrap-icons';
import InstructorPopUp from './InstructorPopUp';
import {PROGRAM_COLOR_KEYS as program_color_keys} from '../../data/PROGRAMS';

const Instructor = ({ instructor }) => {
  const [showInstructorPopUp, setShowInstructorPopUp] = useState();

  const handleShowInstructorPopUp = () => setShowInstructorPopUp(true);
  const handleCloseInstructorPopUp = () => setShowInstructorPopUp(false);

  return (
    <div className="instructor">
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
      <div className="availability">
        {formatAvailability(instructor.availability).map((e) =>
          <h5>{e}</h5>
        )}
      </div>
      <div className="edit-icon"><InfoCircle onClick={handleShowInstructorPopUp}/></div>
      <Modal size="xl" show={showInstructorPopUp} onHide={handleCloseInstructorPopUp} onExited={handleCloseInstructorPopUp}>
        <InstructorPopUp instructor={instructor} />
      </Modal>
    </div>
  );
}

export default Instructor;