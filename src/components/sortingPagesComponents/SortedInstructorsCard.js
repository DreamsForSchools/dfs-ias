import React from 'react'

import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useMousePosition } from "../../customHooks/useMousePosition";

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

export default function SortedInstructorsCard(props) {

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
        backgroundColor: props.bgColor,
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
        backgroundColor: props.bgColor,
        borderLeft: "solid 3px " + props.borderColor,
        borderRight: "solid 3px " + props.borderColor,
        borderBottom: "solid 3px " + props.borderColor,
    }); 

    //uncollapsed (expanded) school info style (color is based on props.borderColor property)
    const [schoolInfoStyle, setSchoolInfoStyle] = useState({
        fontSize: "14px",
        fontWeight: "500",
        color: props.borderColor
    });

    //style to determine where to render instructor info when hovering over them
    const[hoverPosition, setHoverPosition] = useState({
        position: "fixed",
        // left: position.x+"px",
        // top: position.y+"px",
    })

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

    //save the randomized icons for uncollapsed and collapsed card once page loads
    useEffect(()=> {
        if (savedIcon.length < 4){
            for (var i=0; i < 4; i++){
                setSavedIcon(savedIcon.concat(animalIconsArray[Math.floor(Math.random()*animalIconsArray.length)]))
            }
        }
    }, [savedIcon])

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
            backgroundColor: props.bgColor,
            borderColor: !isOpen ? props.borderColor : null,
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

    return ( 

        <div className="instructorCard">

            <div style={collapsedCardStyle}> {/* className="collapsedCard" */}
                <div className="schoolStyle" style={schoolStyle}>
                    <h3 style={schoolNameStyle}>Lathrop Intermediate</h3>
                </div>

                <div className="instructorsStyle" style={instructorsStyle}>
        
                    <div style={nameIconPairStyle} onMouseEnter={hoveredOver} onMouseLeave={removeHoveredOver}>
                        {isHovered? (
                            // START --> ON HOVER MORE INFORMATION PER INSTRUCTOR 
                            <div className="hoverPosition" style={hoverPosition}>
                                <div className="hoverMoreInfoWrapper">
                                    <div className="hoverMoreInfoContainer">
                                        <div className="hoverMoreInfoHeaderContainer">
                                            <div className="hoverMoreInfoHeaderIcon">
                                                <img src={savedIcon[0]} style={hoverIcon}/>
                                            </div>
                                            <div className="hoverMoreInfoHeaderNameContainer">
                                                <div className="hoverMoreInfoHeaderName">
                                                    <h3 style={hoverName}>Phineas Flynn</h3>
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
                                                    <h3 style={hoverRegionSchoolText}>Orange County</h3>
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
                                                        <img src={mentor} style={hoverDetailIcon}/>
                                                        <h3 style={hoverDetailText}>Returning Mentor</h3>
                                                    </div>
                                                    <div className="hoverMoreInfoDetailsOtherItem">
                                                        <img src={car} style={hoverDetailIcon}/>
                                                        <h3 style={hoverDetailText}>Has car</h3>
                                                    </div>
                                                    <div className="hoverMoreInfoDetailsOtherItem">
                                                        <img src={shirt} style={hoverDetailIcon}/>
                                                        <h3 style={hoverDetailText}>XS</h3>
                                                    </div>
                                                    <div className="hoverMoreInfoDetailsOtherItem">
                                                        <img src={language} style={hoverDetailIcon}/>
                                                        <h3 style={hoverDetailText}>English, Spanish</h3>
                                                    </div>
                                                    <div className="hoverMoreInfoDetailsOtherItem">
                                                        <h3 style={hoverDetailTextTeach}>Can't teach multiple days</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            // END --> ON HOVER MORE INFORMATION PER INSTRUCTOR 
                        ):null}
                        <img src={savedIcon[0]} style={animalIcon}/>
                        <h3 style={instructorNameStyle}>Phineas</h3>
                    </div>

                    <div style={nameIconPairStyle} >                        
                        <img src={savedIcon[1]} style={animalIcon}/>
                        <h3 style={instructorNameStyle}>Ferb</h3>
                    </div>

                    <div style={nameIconPairStyle}>
                        <img src={savedIcon[2]} style={animalIcon}/>
                        <h3 style={instructorNameStyle}>Isabella</h3>
                    </div>

                    <div style={nameIconPairStyle}>
                        <img src={savedIcon[3]} style={animalIcon}/>
                        <h3 style={instructorNameStyle}>Perry</h3>
                    </div>
                
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
                        <h3 style={schoolInfoStyle}>Lathrop Intermediate</h3>
                        <h3 style={schoolInfoStyle}>Mon/Wed</h3>
                        <h3 style={schoolInfoStyle}>3:50-5:30</h3>
                    </div>
                    
                    <div style={instructorsInfoContainer}>
                        <div style={instructorsInfo}>
                            <img src={car} style={carMentorIcon}/>
                            <img src={savedIcon[0]} style={animalIcon}/>
                            <h3 style={instructorInfoNameStyle}>Phineas Flynn</h3>
                            <button style={editBtn}>
                                <img src={options} style={optionsIcon}/>
                            </button>
                        </div>

                        <div style={instructorsInfo}>
                            <img src={mentor} style={carMentorIcon}/>
                            <img src={savedIcon[1]} style={animalIcon}/>
                            <h3 style={instructorInfoNameStyle}>Ferb Fletcher</h3>
                            <button style={editBtn}>
                                <img src={options} style={optionsIcon}/>
                            </button>
                        </div>

                        <div style={instructorsInfo}>
                            <img src={carMentor} style={carMentorIcon}/>
                            <img src={savedIcon[2]} style={animalIcon}/>
                            <h3 style={instructorInfoNameStyle}>Isabella Garcia-Shapiro</h3>
                            <button style={editBtn}>
                                <img src={options} style={optionsIcon}/>
                            </button>
                        </div>

                        <div style={instructorsInfo}>
                            <img src={null} style={carMentorIcon}/>
                            <img src={savedIcon[3]} style={animalIcon}/>
                            <h3 style={instructorInfoNameStyle}>Perry the Platypus</h3>
                            <button style={editBtn}>
                                <img src={options} style={optionsIcon}/>
                            </button>
                        </div>
                    </div>

                </div>
                // END --> ON CLICK OF DOWN BUTTON TO EXPAND CARD 
            ):null}

            {/* <div className="uncollapsedCard">
                <div style={schoolInfo}>
                    <h3 style={schoolInfoStyle}>Lathrop Intermediate</h3>
                    <h3 style={schoolInfoStyle}>Mon/Wed</h3>
                    <h3 style={schoolInfoStyle}>3:50-5:30</h3>
                </div>
                
                <div style={instructorsInfoContainer}>
                    <div style={instructorsInfo}>
                        <img src={isCarMentor()} style={carMentorIcon}/>
                        <img src={savedIcon[0]} style={animalIcon}/>
                        <h3 style={instructorInfoNameStyle}>Phineas Flynn</h3>
                        <button style={editBtn}>
                            <img src={options} style={optionsIcon}/>
                        </button>
                    </div>

                    <div style={instructorsInfo}>
                        <img src={isCarMentor()} style={carMentorIcon}/>
                        <img src={savedIcon[1]} style={animalIcon}/>
                        <h3 style={instructorInfoNameStyle}>Ferb Fletcher</h3>
                        <button style={editBtn}>
                            <img src={options} style={optionsIcon}/>
                        </button>
                    </div>

                    <div style={instructorsInfo}>
                        <img src={isCarMentor()} style={carMentorIcon}/>
                        <img src={savedIcon[2]} style={animalIcon}/>
                        <h3 style={instructorInfoNameStyle}>Isabella Garcia-Shapiro</h3>
                        <button style={editBtn}>
                            <img src={options} style={optionsIcon}/>
                        </button>
                    </div>

                    <div style={instructorsInfo}>
                        <img src={isCarMentor()} style={carMentorIcon}/>
                        <img src={savedIcon[3]} style={animalIcon}/>
                        <h3 style={instructorInfoNameStyle}>Perry the Platypus</h3>
                        <button style={editBtn}>
                            <img src={options} style={optionsIcon}/>
                        </button>
                    </div>
                </div>

            </div> */}

            {/* START --> ON HOVER MORE INFORMATION PER INSTRUCTOR */}
            {/* <div className="hoverMoreInfoWrapper">
                <div className="hoverMoreInfoContainer">
                    <div className="hoverMoreInfoHeaderContainer">
                        <div className="hoverMoreInfoHeaderIcon">
                            <img src={savedIcon[0]} style={hoverIcon}/>
                        </div>
                        <div className="hoverMoreInfoHeaderNameContainer">
                            <div className="hoverMoreInfoHeaderName">
                                <h3 style={hoverName}>Phineas Flynn</h3>
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
                                <h3 style={hoverRegionSchoolText}>Orange County</h3>
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
                                    <img src={mentor} style={hoverDetailIcon}/>
                                    <h3 style={hoverDetailText}>Returning Mentor</h3>
                                </div>
                                <div className="hoverMoreInfoDetailsOtherItem">
                                    <img src={car} style={hoverDetailIcon}/>
                                    <h3 style={hoverDetailText}>Has car</h3>
                                </div>
                                <div className="hoverMoreInfoDetailsOtherItem">
                                    <img src={shirt} style={hoverDetailIcon}/>
                                    <h3 style={hoverDetailText}>XS</h3>
                                </div>
                                <div className="hoverMoreInfoDetailsOtherItem">
                                    <img src={language} style={hoverDetailIcon}/>
                                    <h3 style={hoverDetailText}>English, Spanish</h3>
                                </div>
                                <div className="hoverMoreInfoDetailsOtherItem">
                                    <h3 style={hoverDetailTextTeach}>Can't teach multiple days</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* END --> ON HOVER MORE INFORMATION PER INSTRUCTOR */}


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