import React from 'react'

import { useState, useEffect, useRef } from 'react';

// import fire from '../../.././config/fire';
// import firebase from 'firebase';

/*
    This component contains instructor info once you expand the card
    it also has the edit options which contains "Move, lock, and delete"
*/
export default function MoveInstructor({instructor, onMove}) {

    const [school, setSchool] = useState("")

    const onChangeSchool = (e) => {
        setSchool(e.target.value);
        console.log(e.target.value);
    }

    const moveFinal = (e) => {
        console.log("MOVED from MOVEINSTRUCTOR.js")
        console.log("MOVE TO", school)

        onMove();
    }

    return (
        <div style={modalContainer}>
            
            <div style={formContainer}>
                <div style={questionContainer}>
                    <h3 style={text}>Where would you like to move </h3>
                    <h3 style={mentor}>{instructor}?</h3>
                </div>
                

                <div style={dropdowns}>

                    <select name="school" style={dropdownStyle} value={school} onChange={onChangeSchool}>
                        <option value="" disabled selected>Choose School...</option>
                        <option value="School1">School1</option>
                        <option value="School2">School2</option>
                        <option value="School3">School3</option>
                        <option value="School5">School4</option>
                    </select>

                </div>

                <button onClick={moveFinal} style={nextBtn}>MOVE!</button>
            </div>
        </div>
    )
}

const questionContainer = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
}

const text = {
    fontSize: "18px",
    fontWeight: "400"
}

const mentor = {
    fontSize: "18px",
    fontWeight: "500",
    color: "#49479D"
}

const modalContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgb(0, 0, 0, 0.5)",
    bottom: 0,
    right: 0,
    
}

const formContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "450px",
    height: "250px",
    backgroundColor: "white",
    borderRadius: "10px",
    border: "3px solid #49479D",
}

const formStyle = {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
}

const dropdowns = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px"
}

const nextBtn = {
    width: "105px",
    height: "45px",
    backgroundColor: "#49479D",
    fontSize: "14px",
    color: "white",
    border: "0px solid",
    borderRadius: "10px",
    marginTop: "10px"

}

const dropdownStyle = {
    width: "214px",
    height: "66px",
    marginLeft: "5px",
    marginRight: "5px",
    fontSize: "18px",
    border: "0px solid",
    boxShadow: "1px 1px 10px #E6E6E8"
}