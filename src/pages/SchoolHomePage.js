import React from 'react'
import add from '.././assets/add.svg'
import groupIcon2 from '.././assets/groupIcon2.svg';

import SideNavBar from '../components/sidebar/SideNavBar';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';

import fire from '.././config/fire';

// This page/component serves as all the school's home page
export default function SchoolHomePage() {

    //auth variable
    const [user, setUser] = useState(null);

    //checks if the user is logged in
    useEffect(() => {
        fire.auth().onAuthStateChanged(user => {
            if (user){
                setUser(user);
            }else{
                history.push('/');
            }
            
          })
      });
    //navigation variable to naviagate to other pages
    let history = useHistory();

    //variable for toggling the modal to ask user if they really want to replace the existing roster
    const [showNewRostertModal, setShowNewRosterModal] = useState(false)

    //what happens when add roster button is clicked, 
    //it toggles the showNewRostertModal variable where a 
    //prompt will ask the user if they really want a new roster
    const addRoster = () => {
        console.log("Add New Roster!");
        setShowNewRosterModal(!showNewRostertModal);
    }

    //Prompt yes button, if the user chooses to add a new roster,
    //they will be taken to the new roster form page
    const newRosterYes = () => {
        console.log("YES NEW ROSTER!");
        setShowNewRosterModal(!showNewRostertModal);

        fire.auth().onAuthStateChanged(user => {
            if (user){
                history.push('/schoolhome/addrosterform');
            }else{
                history.push('/');
            }
            
          })
    }

    //Prompt yes button, if the user chooses to not add a new roster,
    //the prompt will disappear and the user will stay on the same page
    const newRosterNo = () => {
        console.log("DONT NEW ROSTER!");
        setShowNewRosterModal(!showNewRostertModal);
    }

    //what happens when check existing roster button is clicked, 
    //it navigates to appjam's current instuctor roster
    const currentRoster = () => {
        fire.auth().onAuthStateChanged(user => {
            if (user){
                history.push('/schoolhome/roster');
                // history.push('/appjamhome/roster');
            }else{
                history.push('/');
            }
            
          })

    }

    return (
        <div>
            <SideNavBar chosen="school"/>

            <div className="programPageContainer">
                <h1 className="programPageTitle">school</h1>

                <div className="hozLineDivider"></div>

                <div style={buttonsContainer}>
                    <button onClick={currentRoster} className="programPageAddRosterBtn1">
                        <img src={groupIcon2} className="addLogo1" alt="logo"/>
                        <h4 className="addRosterLaber1">Check Existing Roster</h4>
                    </button>

                    <button onClick={addRoster} className="programPageAddRosterBtn">
                        <img src={add} className="addLogo" alt="logo"/>
                        <h4 className="addRosterLaber">New Roster</h4>
                    </button>
                    {showNewRostertModal?(
                        <div style={modalContainer}>
                            <div style={modal}>
                                <h4>Are you sure you want to make a new roster?</h4>
                                <h5>This will delete the current institutions roster.</h5>
                                <div style={modalOptions}>
                                    <button onClick={newRosterNo} style={noBtn}>NO</button>
                                    <button onClick={newRosterYes} style={yesBtn}>Yes</button>
                                </div>
                            </div>
                        </div>
                    ):null}
                </div>

            </div>

        </div>
    )
}

const buttonsContainer = {
    display: "flex",
    flexDirection: "row",
    marginLeft: "51px"
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

const modal = {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    width: "25vw",
    height: "20vh",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "45px"
}

const modalOptions = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "25px"
}

const yesBtn = {
    fontSize: "14px",
    color: "#49479D",
    backgroundColor: "white",
    border: "0.5px solid #49479D",
    borderRadius: "28px",
    height: "46px",
    paddingLeft: "15px",
    paddingRight: "15px",
    justifyContent: "center",
    alignItems: "center",
    width: "5vw",
    marginLeft: "5vw"

}

const noBtn = {
    fontSize: "14px",
    color: "white",
    backgroundColor: "#49479D",
    // border: "0.5px solid #49479D",
    borderRadius: "28px",
    height: "46px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "5vw",
}