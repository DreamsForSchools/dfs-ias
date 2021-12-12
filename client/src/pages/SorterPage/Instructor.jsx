import React, {useState, useContext, useEffect} from "react";
import './Instructor.scss';
import Dot from '../../design-system/dots';
import {Modal} from "react-bootstrap";
import {InfoCircle, LockFill, UnlockFill} from 'react-bootstrap-icons';
import InstructorPopUp from './InstructorPopUp';
import {PROGRAM_COLOR_KEYS as program_color_keys} from '../../data/PROGRAMS';
import {GlobalContext} from "../../context/GlobalContextProvider";
import {createToken} from "../../fire";

const Instructor = ({instructor, classId, state, parentLockStatus}) => {
    const [showInstructorPopUp, setShowInstructorPopUp] = useState();
    const [lock, setLock] = useState(state && state["lockedInstructors"].includes(instructor.instructorId));
    const {seasonSelected, setToastText, programColorMap} = useContext(GlobalContext);
    const axios = require('axios');

    const handleShowInstructorPopUp = () => setShowInstructorPopUp(true);
    const handleCloseInstructorPopUp = () => setShowInstructorPopUp(false);

    const handleLock = async () => {
        setLock(true);
        const header = await createToken();
        axios.post('/api/lock',
            {seasonId: seasonSelected.seasonId, instructorId: instructor.instructorId, classId: classId}, header
        ).then((response) => {
            setToastText({status: 'Success', message: `Locked ${instructor.firstName} ${instructor.lastName}`});
        }, (error) => {
            console.log(error);
        });
    }

    const handleUnlock = async () => {
        setLock(false);
        const header = await createToken();
        axios.put('/api/unlock',
            {seasonId: seasonSelected.seasonId, instructorId: instructor.instructorId, classId: classId}, header
        ).then((response) => {
            setToastText({status: 'Success', message: `Unlocked ${instructor.firstName} ${instructor.lastName}`});
        }, (error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        if (lock === true) {
            if (!parentLockStatus) {
                handleUnlock();
            }
        } else {
            if (parentLockStatus) {
                handleLock();
            }
        }
    }, [parentLockStatus])

    return (
        <div className="instructor">
            {state &&
            <div className="instructor-lock">
                {lock ? <LockFill onClick={handleUnlock} className="icon" size={16}/> :
                    <UnlockFill onClick={handleLock} className="icon" size={16}/>}
            </div>
            }
            <div className="name">
                {instructor.firstName} {instructor.lastName}
            </div>
            <div className="pref">
                {[instructor.firstPref, instructor.secondPref, instructor.thirdPref, instructor.fourthPref].map((el, idx) =>
                  programColorMap[el] && <Dot color={programColorMap[el]} key={idx}/>
                )}
            </div>
            <div className="tags">
                {instructor.hasCar ? <div className="tag">Car</div> : null}
                {instructor.previouslyTaught ? <div className="tag">Returnee</div> : null}
                {instructor.isASL ? <div className="tag">ASL</div> : null}
            </div>
            <div className="edit-icon"><InfoCircle onClick={handleShowInstructorPopUp}/></div>
            <Modal size="xl" show={showInstructorPopUp} onHide={handleCloseInstructorPopUp}
                   onExited={handleCloseInstructorPopUp}>
                <InstructorPopUp instructor={instructor}/>
            </Modal>
        </div>
    );
}

export default Instructor;
