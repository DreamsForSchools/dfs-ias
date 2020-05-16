import React from 'react'

import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useMousePosition } from "../../customHooks/useMousePosition";
import props from 'prop-types';

import birb from '../.././assets/animalIcons/birb.png';
import bull from '../.././assets/animalIcons/bull.png';
import crab from '../.././assets/animalIcons/crab.png';
import fish from '../.././assets/animalIcons/fish.png';
import fish1 from '../.././assets/animalIcons/fish1.png';
import fish2 from '../.././assets/animalIcons/fish2.png';
import fox from '../.././assets/animalIcons/fox.png';
import hedgehog from '../.././assets/animalIcons/hedgehog.png';
import hippopotamus from '../.././assets/animalIcons/hippopotamus.png';
import koala from '../.././assets/animalIcons/koala.png';
import lemur from '../.././assets/animalIcons/lemur.png';
import moray from '../.././assets/animalIcons/moray.png';
import octopus from '../.././assets/animalIcons/octopus.png';
import pig from '../.././assets/animalIcons/pig.png';
import prawn from '../.././assets/animalIcons/prawn.png';
import seaweed from '../.././assets/animalIcons/seaweed.png';
import tiger from '../.././assets/animalIcons/tiger.png';
import turtle from '../.././assets/animalIcons/turtle.png';
import whale from '../.././assets/animalIcons/whale.png';
import whale1 from '../.././assets/animalIcons/whale1.png';
import zebra from '../.././assets/animalIcons/zebra.png';

import car from '../.././assets/car.png';
import carMentor from '../.././assets/carMentor.png';
import mentor from '../.././assets/mentor.png';
import shirt from '../.././assets/shirt.png';
import language from '../.././assets/language.png';

import options from '../.././assets/options.png';
import arrowDown from '../../assets/arrowDown.png';


import fire from '../../config/fire';

import userCollection from '../../mockDatabase/MockDatabase';

export default function SortedInstructorsCard({SbgColor, SborderColor, instructors}) {

    //User auth 
    const [user, setUser] = useState(null);

    //Animal Icons
    const [animalIconsArray, setAnimalIconsArray] = useState([
        birb, bull, crab, fish, fish1, fish2, fox, hedgehog, hippopotamus, koala, lemur,
        moray, octopus, pig, prawn, seaweed, tiger, turtle, whale, whale1, zebra
    ]);

    //Returning Mentor, car, and both returning mentor and car icons
    const [carMentorIcons, setCarMentorIcons] = useState([
        car, carMentor, mentor
    ]);

    //state to save the 4 icons used in the collapsed card so it carries
    //over to the uncollapsed card
    const [savedIcon, setSavedIcon] = useState([]);

    //Expand card button (down arrow) toggle
    const [isOpen, setIsOpen] = useState(false);

    //toggle when hovering over an instructor
    const [isHovered, setIsHovered] = useState(false);

    //collapsed card style (border color is based on props.borderColor property)
    const [collapsedCardStyle, setCollapsedCardStyle] = useState({
        display: "flex",
        flexDirection: "row",
        minWidth: "508px",
        maxWidth: "550px",
        height: "82px",
        borderRadius: "15px",
        marginTop: "20px",
        marginLeft: "2%",
        marginRight: "2%",
        // border: "solid 3px",
        backgroundColor: SbgColor,
        // borderColor: props.borderColor,
    });

    //uncollapsed (expanded) card style (border color is based on props.borderColor property)
    const [uncollapsedCardStyle, setUncollapsedCardStyle] = useState({
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "481px",
        height: "260px",
        borderBottomLeftRadius: "15px",
        borderBottomRightRadius: "15px",
        backgroundColor: SbgColor,
        borderLeft: "solid 3px " + SborderColor,
        borderRight: "solid 3px " + SborderColor,
        borderBottom: "solid 3px " + SborderColor,
    }); 

    //uncollapsed (expanded) school info style (color is based on props.borderColor property)
    const [schoolInfoStyle, setSchoolInfoStyle] = useState({
        fontSize: "14px",
        fontWeight: "500",
        color: SborderColor
    });

    //style to determine where to render instructor info when hovering over them
    const[hoverPosition, setHoverPosition] = useState({
        position: "fixed",
        // left: position.x+"px",
        // top: position.y+"px",
    })

    const[optionsMenuPosition, setOptionsMenuPosition] = useState({
        position: "fixed",
    })
    const[isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);

    const[instructorsCount, setInstructorsCount] = useState(0);
    const[mentorsFromProps, setMentorsFromProps] = useState([]);
    // console.log(mentorsFromProps)
    // const[instructorsFromProps, setInstructorsFromProps] = useState([]);
    // console.log(typeof instructors !== 'undefined'?instructors["school"]:":')")
    // console.log(typeof instructors !== 'undefined'?instructors:":')")
    // console.log(instructors);

    // console.log(userCollection);

    //History hook for navigation
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

    // useEffect(() => {
    //     var mentors = [];
    //     if (typeof instructors !== 'undefined'){
    //         for(var k in instructors["mentors"]){
    //             console.log(k + ": " + instructors["mentors"][k])
    //             mentors.push(k)
    //         }
    //         setInstructorsFromProps(mentors);
    //     }
    // });
    // console.log(instructorsFromProps);


    // save the randomized icons for uncollapsed and collapsed card once page loads
    useEffect(() => {
        var count = 0;
        if (typeof instructors !== 'undefined'){
            for(var k in instructors["mentors"]){
                // console.log(k + ": " + instructors["mentors"][k])
                console.log(instructors["mentors"][k]);
                count++
                // setInstructorsCount(instructorsCount+1)
                // console.log(instructorsCount)
            }
            // console.log(count)
            setInstructorsCount(count);
            setMentorsFromProps(instructors["mentors"]);
            console.log(instructorsCount);
        }

        if (savedIcon.length < instructorsCount){
            for (var i=0; i < instructorsCount; i++){
                setSavedIcon(savedIcon.concat(animalIconsArray[Math.floor(Math.random()*animalIconsArray.length)]))
            }
        }
    });
    console.log("mentors from props "+mentorsFromProps)

    // save the randomized icons for uncollapsed and collapsed card once page loads
    // useEffect(()=> {
    //     if (savedIcon.length < 4){
    //         for (var i=0; i < 4; i++){
    //             setSavedIcon(savedIcon.concat(animalIconsArray[Math.floor(Math.random()*animalIconsArray.length)]))
    //         }
    //     }
    // }, [savedIcon]);

    //function when down arrow to expand card is clicked
    const toggleMoreInfo = (e) => {
        setIsOpen(!isOpen);
        setCollapsedCardStyle({
            display: "flex",
            flexDirection: "row",
            minWidth: "508px",
            maxWidth: "550px",
            height: "82px",
            borderRadius: "15px",
            marginTop: "20px",
            marginLeft: "2%",
            marginRight: "2%",
            border: !isOpen ? "solid 3px" : null,
            backgroundColor: SbgColor,
            borderColor: !isOpen ? SborderColor : null,
        })
    }

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

    const moveBtnClicked = (e, mentorID) => {
        for(var i=0; i<mentorsFromProps.length; i++){
            if(mentorsFromProps[i].name === mentorID){
                console.log("MOVED NEW " + mentorsFromProps[i].name)
            }
            
        }
    }

    const lockBtnClicked = (e, name) => {
        console.log("LOCK " + name);
    }

    const deleteBtnClicked = (e, name) => {
        console.log("DELETE " + name);
    }

    return ( 

        <div className="instructorCard">

            <div style={collapsedCardStyle}> {/* className="collapsedCard" */}
                <div className="schoolStyle" style={schoolStyle}>
                    <h3 style={schoolNameStyle}>{typeof instructors !== 'undefined'?instructors["school"]:"undefined :')"}</h3>
                    {/* Lathrop Intermediate */}
                </div>

                <div className="instructorsStyle" style={instructorsStyle}>
                    {typeof mentorsFromProps !== 'undefined'?
                        mentorsFromProps.map((person, i) =>(
                            <div style={nameIconPairStyle} onMouseEnter={hoveredOver} onMouseLeave={removeHoveredOver} key={person.name}>
                                {isHovered? (
                                    // START --> ON HOVER MORE INFORMATION PER INSTRUCTOR 
                                    <div className="hoverPosition" style={hoverPosition}>
                                        <div className="hoverMoreInfoWrapper">
                                            <div className="hoverMoreInfoContainer">
                                                <div className="hoverMoreInfoHeaderContainer">
                                                    <div className="hoverMoreInfoHeaderIcon">
                                                        <img src={savedIcon[i]} style={hoverIcon}/>
                                                    </div>
                                                    <div className="hoverMoreInfoHeaderNameContainer">
                                                        <div className="hoverMoreInfoHeaderName">
                                                            <h3 style={hoverName}>{person.name}</h3>
                                                        </div>
                                                        <div className="hoverMoreInfoHeaderYearGenderEthnicity">
                                                            <h3 style={hoverYearGenderEthnicityText}>4th+</h3>
                                                            <h3 style={hoverYearGenderEthnicityText}>Male</h3>
                                                            <h3 style={hoverYearGenderEthnicityText}>Caucasian</h3>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div className="hoverMoreInfoDetailsContainer"> 
                                                    <div className="hoverMoreInfoDetailsRegionSchoolSchedContainer">
                                                        <div className="hoverMoreInfoDetailsRegionSchoolGrid">
                                                            <h3 style={hoverRegionSchoolText}>{person.region}</h3>
                                                            <h3 style={hoverRegionSchoolText}>University of California Irvine</h3>
                                                        </div>
                                                        <div className="hoverMoreInfoDetailsSchedGrid">
                                                            <h6 style={hoverSchedDays}>M</h6>
                                                            <h6 style={hoverSchedTimes}>15:00-17:45</h6>
                                                            <h6 style={hoverSchedDays}>T</h6>
                                                            <h6 style={hoverSchedTimes}>15:00-17:45</h6>
                                                            <h6 style={hoverSchedDays}>W</h6>
                                                            <h6 style={hoverSchedTimes}>15:00-17:45</h6>
                                                            <h6 style={hoverSchedDays}>T</h6>
                                                            <h6 style={hoverSchedTimes}>15:00-17:45</h6>
                                                            <h6 style={hoverSchedDays}>F</h6>
                                                            <h6 style={hoverSchedTimes}>15:00-17:45</h6>
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
                                <img src={savedIcon[i]} style={animalIcon}/>
                                <h3 style={person.prevMentor === "Yes"?instructorNameStyleMentor: instructorNameStyle}>{person.firstName}</h3>
                            </div>

                        ))

                    :null}             
                </div>

                <div onClick={toggleMoreInfo} style={btnDiv}>
                    <button style={arrowBtnStyle}>
                        <img src={arrowDown}/>
                    </button>
                </div>
            </div>
            
            {isOpen? (
                    // START --> ON CLICK OF DOWN BUTTON TO EXPAND CARD 
                    <div style={uncollapsedCardStyle}> {/* className="uncollapsedCard" */}
                    <div style={schoolInfo}>
                        <h3 style={schoolInfoStyle}>{typeof instructors !== 'undefined'?instructors["school"]:"undefined :')"}</h3> {/*Lathrop Intermediate */}
                        <h3 style={schoolInfoStyle}>Mon/Wed</h3>
                        <h3 style={schoolInfoStyle}>3:50-5:30</h3>
                    </div>
                    
                    <div style={instructorsInfoContainer}>

                        {typeof instructors !== 'undefined'?
                            instructors["mentors"].map((person, i) =>(
                                <div style={instructorsInfo} key={person.name}>
                                    <img src={person.car === "Yes" && person.prevMentor === "Yes" ? carMentor : person.car === "Yes" && person.prevMentor !== "Yes"? car : person.car !== "Yes" && person.prevMentor === "Yes" ? mentor : null} style={carMentorIcon}/>
                                    <img src={savedIcon[i]} style={animalIcon}/>
                                    <h3 style={instructorInfoNameStyle}>{person.name}</h3>
                                    <button style={editBtn} onClick={(e) => { toggleOptionsMenu(e, person.name) }}>
                                        <img src={options} style={optionsIcon}/>
                                        <div style={optionsMenuPosition}>
                                            {isOptionsMenuOpen?(
                                                <div className="optionsMenu">
                                                    <button onClick={(e) => { moveBtnClicked(e, person.name) }} className="optionBtn moveBtn">MOVE</button>
                                                    <button onClick={(e) => { lockBtnClicked(e, person.name) }} className="optionBtn lockBtn">Lock</button>
                                                    <button onClick={(e) => { deleteBtnClicked(e, person.name) }} className="optionBtn deleteBtn">Delete</button>
                                                </div>
                                            ):null}
                                        </div>
                                    </button>
                                </div>
                            ))

                        :null}
                    </div>
                </div>
                // END --> ON CLICK OF DOWN BUTTON TO EXPAND CARD 
            ):null}
        </div>

    )
}

const schoolStyle = {
    display: "flex",
	justifyContent: "center",
    alignItems: "center",
    width: "220px",
    flexWrap: "wrap",
};

const schoolNameStyle = {
    fontSize: "14px",
    fontWeight: "500",
    color: "white"
}

const instructorsStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "248px",
    maxWidth: "300px",
    
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


const nameIconPairStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "5px",
    marginLeft: "5px"
}

const btnDiv = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "40px",
    marginRight: "5px",
    marginLeft: "5px"
}

const arrowBtnStyle={
    backgroundColor: "transparent",
    borderWidth: 0,   

}

const animalIcon = {
    width: "40px",
}

const schoolInfo = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "180px",
    height: "200px",
}

const instructorsInfoContainer = {
    display: "flex",
	justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "wrap",
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

const optionsIcon = {
    width: "20px"
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