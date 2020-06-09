import React from 'react'

import MoveInstructor from './MoveInstructor';

// import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import options from '../.././assets/options.png';
import car from '../.././assets/car.png';
import carMentor from '../.././assets/carMentor.png';
import mentor from '../.././assets/mentor.png';
import lock from '../.././assets/lock.png';

// import fire from '../../.././config/fire';
// import firebase from 'firebase';

/*
    This component contains instructor info once you expand the card
    it also has the edit options which contains "Move, lock, and delete"
*/
export default function DropdownInstructorInfo({program, person, mentorsFromProps, savedIconIndex, savedIcon}) {

    // style to determine where to render options menu when clicked
    const[optionsMenuPosition, setOptionsMenuPosition] = useState({
        position: "fixed",
    })

    //toggle condition for the options for instructors
    const[isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);

    //toggle condition for locking instructors
    const[isLocked, setIsLocked] = useState(person.isLocked)

    //toggle condition for moving instructors
    const[isMove, setIsMove] = useState(false);

    //function that shows the options menu when edit button is clicked
    const toggleOptionsMenu = (e,name) => {
        console.log("Hello " + name);
        setIsOptionsMenuOpen(!isOptionsMenuOpen);
        var x = e.clientX;
        var y = e.clientY;

        setOptionsMenuPosition({
            position: "fixed",
            left: x+"px",
            top: y+"px",
        });
    }

    //function that triggers when move button is clicked
    const moveBtnClicked = (e, mentorID) => {
        console.log("MOVED " + mentorID)
        setIsMove(!isMove);
    }

    //passed into MoveInstructor Component so the modal can be toggled off
    const moveBtnClickedInMoveInstructor = (e) => {
        console.log("MOVED FROM DROPDOWNINSTRUCTORS!!!")
        // alert("MOVED FROM DROPDOWNINSTRUCTORS")
        setIsMove(!isMove);
    }

    //function that triggers when lock button is clicked
    const lockBtnClicked = (e, name) => {

        if (isLocked){
            console.log("UNLOCK",program, person.name, person.schoolName)
            fetch('https://apurva29.pythonanywhere.com/unlockinstructor', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"Program":program, "TeacherName": person.name, "SchoolName":person.schoolName}),
            })
            .then(response => response.json())
        }else{
            console.log("LOCK",program, person.name, person.schoolName)
            fetch('https://apurva29.pythonanywhere.com/lockinstructor', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"Program":program, "TeacherName": person.name, "SchoolName":person.schoolName}),
            })
            .then(response => response.json())
        }
        window.location.reload();

        setIsLocked(!isLocked);
    }

    //function that triggers when pending button is clicked
    const pendingBtnClicked = (e, name) => {
        console.log("PENDING",program, person.name, person.schoolName)
        fetch('https://apurva29.pythonanywhere.com/removeinstructor', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"Program":program, "TeacherName": person.name, "SchoolName":person.schoolName}),
        })
        .then(response => response.json())
        window.location.reload();
    }

    return (
        <div>
            {isMove? (<MoveInstructor instructor={person.name} onMove={moveBtnClickedInMoveInstructor}/>) : null}

            <div style={instructorsInfo} key={person.name}>
                <img src={person.car === "Yes" && person.prevMentor === "Yes" ? carMentor : person.car === "Yes" && person.prevMentor !== "Yes"? car : person.car !== "Yes" && person.prevMentor === "Yes" ? mentor : null} style={carMentorIcon}/>
                <img src={savedIcon[parseInt(savedIconIndex, 10)]} style={animalIcon}/>
                <h3 style={instructorInfoNameStyle}>{person.name} {isLocked?(<img src={lock}/>):null}</h3>
                <button style={editBtn} onClick={(e) => { toggleOptionsMenu(e, person.name) }}>
                    <img src={options} style={optionsIcon}/>
                    <div style={optionsMenuPosition}>
                        {isOptionsMenuOpen?(
                            <div className="optionsMenu">
                                {/* <button onClick={(e) => { moveBtnClicked(e, person.name) }} className="optionBtn moveBtn">MOVE</button> */}
                                <button onClick={(e) => { lockBtnClicked(e, person.name) }} className="optionBtn lockBtn">{isLocked?"Unlock":"Lock"}</button>
                                <button onClick={(e) => { pendingBtnClicked(e, person.name) }} className="optionBtn deleteBtn">Pending</button>
                            </div>
                        ):null}
                    </div>
                </button>
            </div>
        </div>
    )
}

const instructorsInfo = {
    display: "grid",
    gridTemplateColumns: "30px 40px 140px 50px",
    gridGap: "10px 5px",
    alignItems: "center",
    justifyItems: "center",
    // backgroundColor: "blue",
    marginTop: "5px",
    marginBottom: "5px"
}

const carMentorIcon = {
    width: "30px",
}

const animalIcon = {
    width: "40px",
}

const instructorInfoNameStyle = {
    fontSize: "12px",
    fontWeight: "400",
    color: "white",
}

const editBtn = {
    backgroundColor: "transparent",
    borderWidth: 0,   
}

const optionsIcon = {
    width: "20px"
}