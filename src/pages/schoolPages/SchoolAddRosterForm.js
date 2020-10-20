import React from 'react'

import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import person from '../.././assets/person.svg'

import fire from '../.././config/fire';

/* 
    form that asks whether the user wants to upload schools manually or through a file
*/
export default function SchoolAddRosterForm() {

    //auth variable
    const [user, setUser] = useState(null);
    
    //variable for capturing whether the user chooses
    //manual upload of file upload
    const [input, setInput] = useState("");

    //navigation variable to naviagate to other pages
    let history = useHistory();

    //checks if user is currently logged in
    useEffect(() => {
        fire.auth().onAuthStateChanged(user => {
            if (user){
                setUser(user);
            }else{
                history.push('/');
            }
            
          })
      });

    //handles the state change everytime the user toggles 
    //between manual vs file upload
    const onChangeRadio = (e) => {
        setInput(e.target.value);
        console.log(e.target.value);
    }

    //function then the next button is clicked
    //validates user input
    const nextClicked = () => {
        console.log("submit");

        if (input === ""){
            alert("Please select how to input your roster")
        }

        if (input === "file"){
            history.push('/schoolhome/uploadinstitution');
        }else if (input === "manual"){
            alert('manual chosen (not yet implemented)')
        } 
    }


    return (
        <div style={mainContainer}>

            <div style={leftHalf}>

                <div style={formContainer}>

                    <h3 style={textStyle}>New School Roster</h3>
                    
                    <form onSubmit={nextClicked} style = {formStyle}>
                        
                        <div style={radioButtonsContainer}>
                       
                            <h3 style={radiotitleText}>How do you want to add your roster?</h3>

                            <div onChange={onChangeRadio}>

                                {/* THIS IS A MANUAL INPUT OPTION 
                                we had planned on adding manual input to add a new roster but the way
                                the code is implemented right, it's a little complicated and
                                we kind of ran out of time but it's something that the future team 
                                should consider*/}

                                {/* <div style={radioItem}>
                                    <input type="radio" value="manual" name="input"/> <p style={radioChoice}>Manual Input</p>
                                </div> */}

                                <div style={radioItem}>
                                    <input type="radio" value="file" name="input"/> <p style={radioChoice} >File Upload</p>
                                </div>
                                
                            </div>

                        </div>

                        <input 
                            type = 'submit'
                            value = 'Next'
                            className = 'button'
                            style= {nextBtn}
                        />
                    </form>

                </div>

            </div>

            <div style={rightHalf}>
                <img style={personIcon} src={person} alt="person icon"/>
                <div style={square}></div>
            </div>

        </div>
    )
}

const mainContainer = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

}

const leftHalf = {
    height: "100vh",
    width: "50vw",
}

const rightHalf = {
    height: "100vh",
    width: "50vw",
    backgroundColor: "white"
}

const formContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20%"
}

const formStyle = {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    marginTop: "30px"
}

const dropdowns = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
}

const textStyle = {
    fontSize: "48px",
    fontWeight: "400",
    color: "#202E47",
    // marginLeft: "auto"
}

const radioButtonsContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
    marginTop: "30px"
}

const radiotitleText = {
    fontSize: "18px",
    fontWeight: "400",
    color: "#202E47"
}

const radioItem = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    marginTop: "20px"
}

const radioChoice = {
    fontSize: "16px",
    fontWeight: "400",
    color: "#5B7082",
    marginLeft: "10px"
}

const radioStyle = {
    backgroundColor: "#49479D",
    color: "#49479D"
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

const square = {
    width: "50%",
    height: "100vh",
    backgroundColor: "#0099FF",
    marginLeft: "auto"
}

const personIcon = {
    position: "absolute",
    height: "300px",
    width: "300px",
    right: "17%",
    top: "68%"
}

const nextBtn = {
    width: "105px",
    height: "45px",
    backgroundColor: "#0099FF",
    fontSize: "18px",
    color: "white",
    border: "0px solid",
    marginTop: "50px",
    marginLeft: "auto",
    marginRight: "15%",
    borderRadius: "3px"

}