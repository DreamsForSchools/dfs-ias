import React from 'react'

import { useState, useEffect, useRef } from 'react';
import MoveInstructor from './MoveInstructor'

// import fire from '../../.././config/fire';
// import firebase from 'firebase';

/*
    This component is shows locked students
*/
export default function PendingList({name}) {

    //toggle condition for moving instructors
    const[isMove, setIsMove] = useState(false);

    //passed into MoveInstructor Component so the modal can be toggled off
    const moveBtnClickedInMoveInstructor = (e) => {
        console.log("MOVED FROM DROPDOWNINSTRUCTORS!!!")
        // alert("MOVED FROM DROPDOWNINSTRUCTORS")
        setIsMove(!isMove);
    }

    //function that triggers when name is clicked
    const nameClicked = (e, name) => {
        console.log("MOVE " + name);
        setIsMove(!isMove);
    }

    return (
        <div>
            {isMove? (<MoveInstructor instructor={name} onMove={moveBtnClickedInMoveInstructor}/>) : null}
            <h4 onClick={(e) => { nameClicked(e, name) }} className="pendingLockedName">{name}</h4>
        </div>
    )
} 