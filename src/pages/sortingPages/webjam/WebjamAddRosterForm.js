import React from 'react'

import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import person from '../../.././assets/person.svg'

import fire from '../../.././config/fire';

export default function WebjamAddRosterForm() {

    const [user, setUser] = useState(null);

    const [quarter, setQuarter] = useState("");
    const [year, setYear] = useState("");
    const [input, setInput] = useState("");

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


    const onChangeRadio = (e) => {
        setInput(e.target.value);
        console.log(e.target.value);

    }

    const onChangeQuarter = (e) => {
        setQuarter(e.target.value);
        console.log(e.target.value);

    }

    const onChangeYear = (e) => {
        setYear(e.target.value);
        console.log(e.target.value);

    }

    const nextClicked = () => {
        console.log("submit");
        
        if (quarter === "" || year === "" || input === ""){
            alert("Please select an option for ALL the fields")
        }

        if (input === "file"){
            history.push('/webjamhome/uploadroster');
            // history.push({
            //     pathname: '/webjamhome/uploadroster',
            //     state: { quarter:quarter, year:year }
            // })
        }else if (input === "manual"){
            alert('manual chosen (not yet implemented)')
        } 

    }


    return (
        <div style={mainContainer}>

            <div style={leftHalf}>

                <div style={formContainer}>

                    <h3 style={textStyle}>New webjam Roster</h3>
                    
                    <form onSubmit={nextClicked} style = {formStyle}>
                        
                        <div style={dropdowns}>

                            <select name="quarter" style={dropdownStyle} value={quarter} onChange={onChangeQuarter}>
                                <option value="" disabled selected>Choose Season...</option>
                                <option value="fall">Fall</option>
                                <option value="winter">Winter</option>
                                <option value="spring">Spring</option>
                                <option value="summer">Summer</option>
                            </select>

                            <select name="year" style={dropdownStyle} value={year} onChange={onChangeYear}>
                                <option value="" disabled selected>Choose Year...</option>
                                <option value="2015">2015</option>
                                <option value="2016">2016</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                                <option value="2031">2031</option>
                                <option value="2032">2032</option>
                                <option value="2033">2033</option>
                                <option value="2034">2034</option>
                                <option value="2035">2035</option>
                            </select>
                        </div>

                        <div style={radioButtonsContainer}>
                       
                            <h3 style={radiotitleText}>How do you want to add your roster?</h3>

                            <div onChange={onChangeRadio}>
                                <div style={radioItem}>
                                    <input type="radio" value="manual" name="input"/> <p style={radioChoice}>Manual Input</p>
                                </div>

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
    // backgroundColor: "lightblue"
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
    backgroundColor: "#49479D",
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
    backgroundColor: "#49479D",
    fontSize: "18px",
    color: "white",
    border: "0px solid",
    marginTop: "50px",
    marginLeft: "auto",
    marginRight: "15%",
    borderRadius: "3px"

}