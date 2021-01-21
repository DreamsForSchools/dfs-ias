import React from 'react'

import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import DropdownInstructorInfo from './DropdownInstructorInfo';
import HoveredInstructorInfo from './HoveredInstructorInfo'

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

import arrowDown from '../../assets/arrowDown.png';


import fire from '../../config/fire';

/*
    This component is a expandlable card that contains all instructor
    and school info
*/
export default function SortedInstructorsCard({program, SbgColor, SborderColor, instructors}) {

    //User auth 
    const [user, setUser] = useState(null);

    //Animal Icons
    const [animalIconsArray, setAnimalIconsArray] = useState([
        birb, bull, crab, fish, fish1, fish2, fox, hedgehog, hippopotamus, koala, lemur,
        moray, octopus, pig, prawn, seaweed, tiger, turtle, whale, whale1, zebra
    ]);

    //state to save the 4 icons used in the collapsed card so it carries
    //over to the uncollapsed card
    const [savedIcon, setSavedIcon] = useState([]);

    //Expand card button (down arrow) toggle
    const [isOpen, setIsOpen] = useState(false);

    //collapsed card style (border color is based on props.borderColor property)
    const [collapsedCardStyle, setCollapsedCardStyle] = useState({
        display: "flex",
        flexDirection: "row",
        // minWidth: "508px",
        // maxWidth: "550px",
        width: "550px",
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

    const[instructorsCount, setInstructorsCount] = useState(0);
    const[mentorsFromProps, setMentorsFromProps] = useState([]);

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

    // save the randomized icons for uncollapsed and collapsed card once page loads
    useEffect(() => {
        var count = 0;
        if (typeof instructors !== 'undefined'){
            for(var k in instructors["mentors"]){
                // console.log(instructors["mentors"][k]);
                count++
            }
            setInstructorsCount(count);
            setMentorsFromProps(instructors["mentors"]);
            // console.log(instructorsCount);
        }

        if (savedIcon.length < instructorsCount){
            for (var i=0; i < instructorsCount; i++){
                setSavedIcon(savedIcon.concat(animalIconsArray[Math.floor(Math.random()*animalIconsArray.length)]))
            }
        }
    });
    // console.log("mentors from props "+mentorsFromProps)

    //function when down arrow to expand card is clicked
    const toggleMoreInfo = (e) => {
        setIsOpen(!isOpen);
        setCollapsedCardStyle({
            display: "flex",
            flexDirection: "row",
            // minWidth: "508px",
            // maxWidth: "550px",
            width: "550px",
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
                            <HoveredInstructorInfo key={person.name} person={person} savedIconIndex={i} savedIcon={savedIcon}/>
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
                        <div style={hoverMoreInfoDetailsSchedGrid}>
                            <h6 style={hoverSchedDays}>M</h6>
                            <h6 style={hoverSchedTimes}>{instructors["mentors"][0]["schoolSchedule"]["mon"]}</h6>
                            <h6 style={hoverSchedDays}>T</h6>
                            <h6 style={hoverSchedTimes}>{instructors["mentors"][0]["schoolSchedule"]["tue"]}</h6>
                            <h6 style={hoverSchedDays}>W</h6>
                            <h6 style={hoverSchedTimes}>{instructors["mentors"][0]["schoolSchedule"]["wed"]}</h6>
                            <h6 style={hoverSchedDays}>T</h6>
                            <h6 style={hoverSchedTimes}>{instructors["mentors"][0]["schoolSchedule"]["thu"]}</h6>
                            <h6 style={hoverSchedDays}>F</h6>
                            <h6 style={hoverSchedTimes}>{instructors["mentors"][0]["schoolSchedule"]["fri"]}</h6>
                        </div>
                    </div>
                    
                    <div style={instructorsInfoContainer}>

                        {typeof instructors !== 'undefined'?
                            instructors["mentors"].map((person, i) =>(
                                <DropdownInstructorInfo key={person.name} program={program} person={person} mentorsFromProps={mentorsFromProps} savedIconIndex={i} savedIcon={savedIcon}/>
                            ))

                        :null}
                    </div>
                </div>
                // END --> ON CLICK OF DOWN BUTTON TO EXPAND CARD 
            ):null}
        </div>

    )
}

const hoverMoreInfoDetailsSchedGrid = {
    display: "grid",
    gridTemplateColumns: "13px 127px",
    gridTemplateRows: "15px 15px 15px 15px 15px",
    marginTop: "3px",
    justifyContent: "center",
    alignItems: "center",
}

const hoverSchedDays = {
    color: "white",
    fontSize: "12px",
    fontWeight: "400",
}

const hoverSchedTimes = {
    color: "white",
    fontSize: "11px",
    fontWeight: "400",
    marginLeft: "2px"
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





