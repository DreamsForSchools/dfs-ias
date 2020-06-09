import React from 'react'

import TitleToolbar from '../../.././components/sortingPagesComponents/TitleToolbar';
import SortedInstructorsCard from '../../../components/sortingPagesComponents/SortedInstructorsCard';
import LockedList from '../../../components/sortingPagesComponents/LockedList'
import PendingList from '../../../components/sortingPagesComponents/PendingList'

import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import GeneratePDF from '../SaveAsPDF/GeneratePDF';
import { PDFDownloadLink } from "@react-pdf/renderer";

import car from '../../.././assets/car.png';
import carMentor from '../../.././assets/carMentor.png';
import mentor from '../../.././assets/mentor.png';
import birb from '../../.././assets/animalIcons/birb.png';

import fire from '../../.././config/fire';

/* 
    this page shows the sorted roster for sphero
*/
export default function SpheroSortedRosterPage() {

    //User auth 
    const [user, setUser] = useState(null);

    //variable for toggling the modal to ask user if they really want to re-sort
    const [showResortModal, setShowResortModal] = useState(false)

    //stores the sorted roster taken from the database
    const [schools, setSchools] = useState([]);    

    //stores the quarter from the database
    const [quarter, setQuarter] = useState("");

    //stores the year from the database
    const [year, setYear] = useState("");

    //loading modal when resorting
    const [isLoading, setIsLoading] = useState(false);

    //History hook for navigation
    let history = useHistory();

    //checks if user is currently logged in (authenticates user)
    useEffect(() => {
        fire.auth().onAuthStateChanged(user => {
            if (user){
                setUser(user);
            }else{
                history.push('/');
            }
            
          })
      },[]);

    //accesses firebase for sphero's quarter and year
    const quarterYearDatabase = useRef(fire.database().ref().child('seasonYear/-M8idEUsNN1M5VcJDv-I/sphero'))

    //accesses firebase for quarter and the year
    useEffect(() => {
        quarterYearDatabase.current.once('value', (snap) => {
            const quarterYear = snap.val();
            console.log("CURRENT QUARTER:", quarterYear)
            setQuarter(quarterYear.quarter);
            setYear(quarterYear.year);
        });
    },[]);

      //convers mins into hours and mins in a day 
      // i.e. 900 -> 3:00
      const convertMins = (mins) => {
        var num = mins;
        var finHours = Math.trunc(num/60%12)
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        if (rminutes == 0){
            rminutes="00"
        }
        return finHours + ":" + rminutes;
    }

    //takes in an array of start and end time and converts it respectfully
    //i.e [900 - 1020] -> 3:00-5:00
    const convertTime = (dayTimesArray) => {
        return convertMins(dayTimesArray[0]) + "-" + convertMins(dayTimesArray[1])
    }
    
    // converts schedule from database to a more readable format
    const convertSchedule = (schedArray) => {
        // console.log(schedArray)
        var finalSchedArray = {
            "mon": "",
            "tue": "",
            "wed": "",
            "thu": "",
            "fri": ""
        }

        for (var day in schedArray){
            if (day == 1){
                finalSchedArray["mon"] = convertTime(schedArray[day][0])
            }else if (day == 2){
                finalSchedArray["tue"] = convertTime(schedArray[day][0])
            }else if (day == 3){
                finalSchedArray["wed"] = convertTime(schedArray[day][0])
            }else if (day == 4){
                finalSchedArray["thu"] = convertTime(schedArray[day][0])
            }else if (day == 5){
                finalSchedArray["fri"] = convertTime(schedArray[day][0])
            }
        }
        return finalSchedArray
    }

    const spheroSortedRosterCollection = useRef(fire.database().ref().child('SpheroElementary/matches'));
    const firstChild = useRef(fire.database().ref().child('SpheroElementary/matches').limitToFirst(1));

    useEffect(() => {
        var matchesLen = 0;

        var latestRoster = 0;
        spheroSortedRosterCollection.current.on('value', (snap) => {
            matchesLen = snap.numChildren();
            // console.log("NUMBER OF MATCHES", matchesLen)
            snap.forEach((doc) =>{
                console.log(parseInt(doc.key), "NEW!!!!NEW!!!")
                if (latestRoster < doc.key){
                    latestRoster = doc.key
                }
            });
            console.log("LATEST ROSTER:",latestRoster)
            
            if (parseInt(matchesLen) > 10){
                // console.log("ADASDDASDSADSA", matchesLen)
                firstChild.current.once('value', (snap) => {
                    snap.forEach((doc) =>{
                        console.log("OLDEST MATCH",doc.key);
                        doc.ref.remove();
                    });
                })
            }
        });


        spheroSortedRosterCollection.current.once('value', (snap) => {     
            const roster = []      
            snap.forEach((doc) =>{
                if (latestRoster === doc.key){
                    // console.log("LATEST ROSTER DOC.KEY:",doc.key, doc.val())
                    const schoolArray = doc.val();
                    for (var school in schoolArray){
                        // console.log(school)
                        const mentorInfoArray = []
                        for (var mentor in schoolArray[school]){
                            if (schoolArray[school][mentor]["TeacherName"] != undefined){
                                mentorInfoArray.push(
                                    {
                                        "name":schoolArray[school][mentor]["TeacherName"],
                                        "firstName": schoolArray[school][mentor]["TeacherName"].split(" ")[0],
                                        "car": schoolArray[school][mentor]["Car"],
                                        "ethnicity": schoolArray[school][mentor]["Ethnicity"],
                                        "gender": schoolArray[school][mentor]["Gender"],
                                        "languages": schoolArray[school][mentor]["Languages"],
                                        "multipleDays": schoolArray[school][mentor]["MultipleDays"],
                                        "prevMentor": schoolArray[school][mentor]["PreviousMentor"],
                                        "shirtSize": schoolArray[school][mentor]["ShirtSize"],
                                        "university": schoolArray[school][mentor]["University"],
                                        "year": schoolArray[school][mentor]["Year"],
                                        "teacherSchedule": convertSchedule(schoolArray[school][mentor]["TeacherSchedule"]),
                                        "region": schoolArray[school][mentor]["Region"],
                                        "schoolName": schoolArray[school][mentor]["SchoolName"],
                                        "schoolSchedule": convertSchedule(schoolArray[school][mentor]["Schedule"]),
                                        "isLocked": schoolArray[school][mentor]["Locked"],
                                    }
                                )
                            }
                            
                        }
                        // console.log("AJDLSAJDLKSADSA", school)
                        if (school === "Locked" || school === "Removed" || school === "Available"){
                            console.log("THIS IS LOCKED, SKIP", school)
                        }else{
                            roster.push({"school":school, "mentors":mentorInfoArray})
                        }
                        
                    }
                    // console.log("THE NEW ROSTER YES",roster)
                }
            });
            setSchools(roster)
        });
      },[]);

    // console.log(schools)

    const resortRoster = () => {
        return fetch('https://apurva29.pythonanywhere.com/resort', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({"Program":"SpheroElementary"}),
        })
        .then(response => response.json())
    }

    const promiseRoster = () =>{
        return Promise.all([resortRoster()])
    }


    //shows modal if user really wants to re-sort
    const resortClicked = () => {
        console.log("resort");
        setShowResortModal(!showResortModal);
    }

    //re-sort when clicked yes on the modal
    const resortYes = () => {
        console.log("YES RESORT!");
        setShowResortModal(!showResortModal);

        setIsLoading(!isLoading);
        promiseRoster()
        .then(([sorted]) => {
            // both have loaded!
            setIsLoading(!isLoading);
            console.log("PROMISE DONE=RESORTED!!!!",sorted);
            window.location.reload();
        })


    }

    //don't resort when no is clicked on the modal
    const resortNo = () => {
        console.log("DONT RESORT!");
        setShowResortModal(!showResortModal);
    }


    return (
        <div>

            {isLoading?(
                <div style={loading}>
                <h3>RE-SORTING.... Please Wait.</h3>
            </div>
            ):null}
    
            <TitleToolbar program="Shpero" season={quarter} year={year} urlPath="sphero"/>

            <div className="programPageContainer">

                <div style={iconGuideWrapper}>
                    <div style={box}>
                        <div style={iconGuideContainer}>
                            <div style={iconGuideNamePair}>
                                <div style={iconGuideNamePairAnimal}>
                                    <img src={birb} style={iconGuideIconStyle}/>
                                    <h6 style={iconGuideTextAnimalStyle}>name</h6>
                                </div>
                                <h6 style={iconGuideTextStyle}>previous mentor</h6>
                            </div>

                            <div style={iconGuideNamePair}>
                                <img src={car} style={iconGuideIconStyle}/>
                                <h6 style={iconGuideTextStyle}>has a car</h6>
                            </div>

                            <div style={iconGuideNamePair}>
                                <img src={mentor} style={iconGuideIconStyle} />
                                <h6 style={iconGuideTextStyle}>previous mentor</h6>
                            </div>

                            <div style={iconGuideNamePair}>
                                <img src={carMentor} style={iconGuideIconStyle} />
                                <h6 style={iconGuideTextStyle}>has a car AND previous mentor</h6>
                            </div>
                        </div>
                    </div>

                    <div style={saveResort}>
                        <button onClick={resortClicked} style={resortBtn}>Re-sort!</button>
                        {showResortModal?(
                            <div style={modalContainer}>
                                <div style={modal}>
                                    <h3>Are you sure you want to re-sort?</h3>
                                    <div style={modalOptions}>
                                        <button onClick={resortNo} style={noBtn}>NO</button>
                                        <button onClick={resortYes} style={yesBtn}>Yes</button>
                                    </div>
                                </div>
                            </div>
                        ):null}
                        {/* <button onClick={save} style={saveBtn}>SAVE!</button> */}

                        <PDFDownloadLink
                            document = {<GeneratePDF sortedRoster={schools}/>}
                            fileName="sortedRoster.pdf"
                            style={saveBtn}
                        >
                            Save as PDF!
                        </PDFDownloadLink>

                    </div>
                </div>
                
                <div className="sortedInstructorCardsWrapper">
                    <div style={pendingLockedContainer}>
                        <PendingList program="SpheroElementary"/>
                        <LockedList program="SpheroElementary"/>
                    </div>

                    <div className="instructorCardsContainer">
                        {schools.map((schoolMentors,i) => (
                            <SortedInstructorsCard program="SpheroElementary" instructors={schoolMentors} SbgColor="#7FC9FF" SborderColor="#0099FF" key={schoolMentors.school}/>
                        ))}
                    </div>
                </div>
            </div> 



        </div>
    )
}

const pendingLockedContainer = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
    flexWrap: "wrap",
    marginTop: "-10px"
}

const pendingLockedBox = {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    width: "300px",
    minHeight: "50px",
    maxHeight: "500px",
    backgroundColor: "white",
    marginLeft: "10px",
    borderRadius: "12px",
    border: "1px solid #A4A3CE",
    marginTop: "10px"
}

const pendingLockedTitle = {
    fontSize: "14px",
    fontWeight: "500",
    padding: "5px",
    backgroundColor: "#A4A3CE",
    width: "100%",
    textAlign: "center",
    color: "white",
    borderRadius: "10px"
}

const pendingLockedNameContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px"
}

const pendingLockedName = {
    fontWeight: "400",
    fontSize: "12px",
    // margin: "1px",
    padding: "1px",
    color: "#202E47",
    // backgroundColor: "#A4A3CE",
    width: "300px",
    textAlign: "center"
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

const saveResort = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "20px"
}

const saveBtn = {
    fontSize: "14px",
    color: "white",
    backgroundColor: "#49479D",
    borderRadius: "28px",
    height: "46px",
    paddingLeft: "15px",
    paddingRight: "15px",
    paddingTop: "15px",
    // padding: "10px",
    marginLeft: "10px",
    justifyContent: "center",
    alignItems: "center"

}

const resortBtn = {
    fontSize: "14px",
    color: "#49479D",
    backgroundColor: "white",
    border: "0.5px solid #49479D",
    borderRadius: "28px",
    height: "46px",
    paddingLeft: "15px",
    paddingRight: "15px",

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

const iconGuideWrapper = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: "5%",
    marginBottom: "2%"
}

const box = {
    width: "670px",
    height: "70px",
    backgroundColor: "#D2D5DA",
    borderRadius: "10px"
}

const iconGuideContainer = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "7px"
}

const iconGuideNamePairAnimal = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
}

const iconGuideTextAnimalStyle = {
    fontSize: "12px",
    fontWeight: "400",
    marginLeft: "3px",
    color: "#202E47",
}

const iconGuideNamePair = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginleft: "15px",
    marginRight: "15px"
}

const iconGuideIconStyle = {
    width: "35px",
}

const iconGuideTextStyle = {
    fontSize: "12px",
    fontWeight: "400",
    marginLeft: "3px",
    color: "#202E47",
    color: "#49479D"
}

const loading = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(32, 46, 71, 0.7)",
    color: "white"
}