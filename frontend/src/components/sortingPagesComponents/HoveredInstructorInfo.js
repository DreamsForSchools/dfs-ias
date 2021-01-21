import React from 'react'

// import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import options from '../.././assets/options.png';
import car from '../.././assets/car.png';
import carMentor from '../.././assets/carMentor.png';
import mentor from '../.././assets/mentor.png';
import shirt from '../.././assets/shirt.png';
import language from '../.././assets/language.png';

// import fire from '../../.././config/fire';
// import firebase from 'firebase';

/*
    This component contains the icons and first name from the collapsed card
    It also contains more infor from the instructors if you hover over the icons
    on the uncollapsed card
*/
export default function HoveredInstructorInfo({person, savedIconIndex, savedIcon}) {

    //toggle when hovering over an instructor
    const [isHovered, setIsHovered] = useState(false);

    //style to determine where to render instructor info when hovering over them
    const[hoverPosition, setHoverPosition] = useState({
        position: "fixed",
    })

    //function when use hovers over an instructor
    const hoveredOver = (e) => {
        var x = e.clientX;
        var y = e.clientY;
        
        setHoverPosition({
            position: "fixed",
            left: x+"px",
            top: y+"px",
        });
        setIsHovered(true);

    }

    //function when use unhovers over an instructor
    const removeHoveredOver = (e) => {
        setIsHovered(false);
        var x = e.clientX;
        var y = e.clientY;
    }

    return (
            <div style={nameIconPairStyle} onMouseEnter={hoveredOver} onMouseLeave={removeHoveredOver} key={person.name}>
            {isHovered? (
                // START --> ON HOVER MORE INFORMATION PER INSTRUCTOR 
                <div className="hoverPosition" style={hoverPosition}>
                    <div className="hoverMoreInfoWrapper">
                        <div className="hoverMoreInfoContainer">
                            <div className="hoverMoreInfoHeaderContainer">
                                <div className="hoverMoreInfoHeaderIcon">
                                    <img src={savedIcon[parseInt(savedIconIndex, 10)]} style={hoverIcon}/>
                                </div>
                                <div className="hoverMoreInfoHeaderNameContainer">
                                    <div className="hoverMoreInfoHeaderName">
                                        <h3 style={hoverName}>{person.name}</h3>
                                    </div>
                                    <div className="hoverMoreInfoHeaderYearGenderEthnicity">
                                        <h3 style={hoverYearGenderEthnicityText}>{person.year}</h3>
                                        <h3 style={hoverYearGenderEthnicityText}>{person.gender}</h3>
                                        <h3 style={hoverYearGenderEthnicityText}>{person.ethnicity}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="hoverMoreInfoDetailsContainer"> 
                                <div className="hoverMoreInfoDetailsRegionSchoolSchedContainer">
                                    <div className="hoverMoreInfoDetailsRegionSchoolGrid">
                                        <h3 style={hoverRegionSchoolText}>{person.region}</h3>
                                        <h3 style={hoverRegionSchoolText}>{person.university}</h3>
                                    </div>
                                    <div className="hoverMoreInfoDetailsSchedGrid">
                                        <h6 style={hoverSchedDays}>M</h6>
                                        <h6 style={hoverSchedTimes}>{person.teacherSchedule.mon}</h6>
                                        <h6 style={hoverSchedDays}>T</h6>
                                        <h6 style={hoverSchedTimes}>{person.teacherSchedule.tue}</h6>
                                        <h6 style={hoverSchedDays}>W</h6>
                                        <h6 style={hoverSchedTimes}>{person.teacherSchedule.wed}</h6>
                                        <h6 style={hoverSchedDays}>T</h6>
                                        <h6 style={hoverSchedTimes}>{person.teacherSchedule.thu}</h6>
                                        <h6 style={hoverSchedDays}>F</h6>
                                        <h6 style={hoverSchedTimes}>{person.teacherSchedule.fri}</h6>
                                    </div>
                                </div>
                                <div className="hoverMoreInfoDetailsOtherContainer">
                                    <div className="hoverMoreInfoDetailsOtherGrid">
                                        <div className="hoverMoreInfoDetailsOtherItem">
                                            <img src={person.prevMentor === "Yes" ? mentor : null} style={hoverDetailIcon}/>
                                            <h3 style={hoverDetailText}>{person.prevMentor === "Yes" ? "Returning Mentor" : null}</h3>
                                        </div>
                                        <div className="hoverMoreInfoDetailsOtherItem">
                                            <img src={person.car === "Yes" ? car : null} style={hoverDetailIcon}/>
                                            <h3 style={hoverDetailText}>{person.car === "Yes" ? "Has car" : null}</h3>
                                        </div>
                                        <div className="hoverMoreInfoDetailsOtherItem">
                                            <img src={shirt} style={hoverDetailIcon}/>
                                            <h3 style={hoverDetailText}>XS</h3>
                                        </div>
                                        <div className="hoverMoreInfoDetailsOtherItem">
                                            <img src={language} style={hoverDetailIcon}/>
                                            <h3 style={hoverDetailText}>{person.languages}</h3>
                                        </div>
                                        <div className="hoverMoreInfoDetailsOtherItem">
                                            <h3 style={hoverDetailTextTeach}>{person.multipleDays === "Yes" ? "CAN teach multiple days" : "CANNOT teach multiple days"}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                // END --> ON HOVER MORE INFORMATION PER INSTRUCTOR 
            ):null}
            <img src={savedIcon[parseInt(savedIconIndex, 10)]} style={animalIcon}/>
            <h3 style={person.prevMentor === "Yes"?instructorNameStyleMentor: instructorNameStyle}>{person.firstName}</h3>
        </div>
    )
}

const nameIconPairStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "5px",
    marginLeft: "5px"
}

const animalIcon = {
    width: "40px",
}

const instructorNameStyle = {
    fontSize: "12px",
    fontWeight: "400",
    color: "white"
}

const instructorNameStyleMentor = {
    fontSize: "12px",
    fontWeight: "400",
    color: "#202E47"
}

const hoverIcon = {
    width: "35px",
}

const hoverName = {
    color: "white",
    fontSize: "14px",
    fontWeight: "500"
}

const hoverYearGenderEthnicityText = {
    color: "white",
    fontSize: "9px",
    fontWeight: "400",
    marginRight: "10px"
}

const hoverRegionSchoolText = {
    color: "white",
    fontSize: "9px",
    fontWeight: "400",
}

const hoverSchedDays = {
    color: "white",
    fontSize: "9px",
    fontWeight: "400",
}

const hoverSchedTimes = {
    color: "#A4A3CE",
    fontSize: "8px",
    fontWeight: "400",
}

const hoverDetailIcon = {
    width: "13px",
}

const hoverDetailText = {
    color: "white",
    fontSize: "9px",
    fontWeight: "400",
    marginLeft: "3px",
}

const hoverDetailTextTeach = {
    color: "#A4A3CE",
    fontSize: "9px",
    fontWeight: "400",
}