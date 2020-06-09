import React from 'react'

import SideNavBar from '../../../components/sidebar/SideNavBar';
import SortingPagesNavbar from '../../../components/sortingPagesComponents/SortingPagesNavbar'
import TitleToolbar from '../../.././components/sortingPagesComponents/TitleToolbar';
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import fire from '../../.././config/fire';

/*
    this page shows the roster for webjam
*/
export default function WebjamRosterPage() {

    //auth variable
    const [user, setUser] = useState(null);

    //stores the quarter from the database
    const [quarter, setQuarter] = useState("");

    //stores the year from the database
    const [year, setYear] = useState("");

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

    //accesses firebase for appjam's quarter and year
    const quarterYearDatabase = useRef(fire.database().ref().child('seasonYear/-M8idEUsNN1M5VcJDv-I/webjam'))

    //accesses firebase for quarter and the year
    useEffect(() => {
        quarterYearDatabase.current.once('value', (snap) => {
            const quarterYear = snap.val();
            console.log("CURRENT QUARTER:", quarterYear)
            setQuarter(quarterYear.quarter);
            setYear(quarterYear.year);
        });
    },[]);

    //stores the roster taken from the database
    const [roster, setRoster] = useState([])

    const webjamRosterCollection = useRef(fire.database().ref().child('WebJam/instructors'));

    useEffect(() => {
        var latestRoster = 0;
        webjamRosterCollection.current.on('value', (snap) => {
            snap.forEach((doc) =>{
                console.log(parseInt(doc.key), "NEW!!!!NEW!!!")
                if (latestRoster < doc.key){
                    latestRoster = doc.key
                }
            });
            console.log("LATEST ROSTER:",latestRoster)
        });

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
        // resulting format looks like this: {mon:"3:00-5:00", tue:"", wed:"3:00-5:00", Tthu:"3:00-5:00", fri:""}
        const convertSchedule = (schedArray) => {
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


        webjamRosterCollection.current.once('value', (snap) => {
            const rosterFire = []
            snap.forEach((doc) =>{
                if (latestRoster === doc.key){
                    console.log("LATEST ROSTER DOC.KEY:",doc.key, doc.val())
                    const instructorArray = doc.val();
                    for (var instructor in instructorArray){
                        // console.log(instructor)
                        const mentorID = instructor;
                        const mentorList = instructorArray[instructor];
                        rosterFire.push(
                            {
                                "mentorID": mentorID,
                                "car": mentorList["Car"],
                                "ethnicity": mentorList["Ethnicity"],
                                "friday": mentorList["Friday"],
                                "gender": mentorList["Gender"],
                                "languages": mentorList["Languages"],
                                "monday": mentorList["Monday"],
                                "multipleDays": mentorList["MultipleDays"],
                                "name": mentorList["Name"],
                                "prevMentor": mentorList["PreviousMentor"],
                                "region": mentorList["Region"],
                                "shirtSize": mentorList["ShirtSize"],
                                "thursday": mentorList["Thursday"],
                                "tuesday": mentorList["Tuesday"],
                                "university": mentorList["University"],
                                "wednesday": mentorList["Wednesday"],
                                "year": mentorList["Year"],
                                "schedule": convertSchedule(mentorList["Schedule"])

                            }
                        )

                    }
                    // console.log("THE NEW ROSTER YES",roster)
                }
            });
            console.log(rosterFire)
            setRoster(rosterFire)
        });
      },[]);

    const sortClicked = (e, name) => {
        history.push('/webjamhome/sortedroster');
    }

    const addClicked = (e) => {
        // history.push('/appjamhome/sortedroster');
        history.push({
            pathname: "/manualaddinstructor",
            state: {isNewRoster: false}
        });
    }


    return (
        <div>

            <TitleToolbar program="webjam" season={quarter} year={year}  urlPath="webjam"/>

            <div className="programPageContainer">

            <div style={buttonContainer}>
                <div style={sortBtnContainer}>
                    <button onClick={addClicked} style={addBtn}>Add Instructor</button>
                </div>
                <div style={sortBtnContainer}>
                    <button onClick={sortClicked} style={sortBtn}>SORT!</button>
                </div>
            </div>


                            <h1 style={programText}>Webjam</h1>

                            <div style={gridWrapper}>
                            <div style={gridContainer}>
                                <div style={titleRow}>Name</div>
                                <div style={titleRow}>Gender</div>
                                <div style={titleRow}>Ethnicity</div>
                                <div style={titleRow}>Languages</div>
                                <div style={titleRow}>University</div>
                                <div style={titleRow}>Year</div>
                                <div style={titleRow}>Region</div>
                                <div style={titleRow}>Mon</div>
                                <div style={titleRow}>Tue</div>
                                <div style={titleRow}>Wed</div>
                                <div style={titleRow}>Thu</div>
                                <div style={titleRow}>Fri</div>
                                <div style={titleRow}>Prev Mentor</div>
                                <div style={titleRow}>Car</div>
                                <div style={titleRow}>Multiple Days</div>
                                <div style={titleRow}>Shirt Size</div>
                            </div>


                                {roster.map((mentor) => (
                                    <div style={gridEntryContainer} key={mentor.mentorID}>
                                    <div style={entryRow}>{mentor.name}</div>
                                    <div style={entryRow}>{mentor.gender}</div>
                                    <div style={entryRow}>{mentor.ethnicity}</div>
                                    <div style={entryRow}>{mentor.languages}</div>
                                    <div style={entryRow}>{mentor.university}</div>
                                    <div style={entryRow}>{mentor.year}</div>
                                    <div style={entryRow}>{mentor.region}</div>
                                    <div style={entryRow}>{mentor.schedule.mon}</div>
                                    <div style={entryRow}>{mentor.schedule.tue}</div>
                                    <div style={entryRow}>{mentor.schedule.wed}</div>
                                    <div style={entryRow}>{mentor.schedule.thu}</div>
                                    <div style={entryRow}>{mentor.schedule.fri}</div>
                                    <div style={entryRow}>{mentor.prevMentor}</div>
                                    <div style={entryRow}>{mentor.car}</div>
                                    <div style={entryRow}>{mentor.multipleDays}</div>
                                    <div style={entryRow}>{mentor.shirtSize}</div>

                                    </div>
                    ))}

                </div>
            </div>

        </div>
    )
}

const programSchools = {
    marginTop: "20px"
}


const programText = {
    color: "#5B7082",
    marginLeft: "5%"
}

const gridWrapper = {
    display: "flex",
    flexDirection: "column",
}

const gridContainer = {
    display: "grid",
    gridTemplateColumns: "200px 80px 200px 150px 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px ",
    gridTemplateRows: "50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px ",
    justifyContent: "center",
    marginTop: "10px",
    marginLeft: "30%"

}

const gridEntryContainer = {
    display: "grid",
    gridTemplateColumns: "200px 80px 200px 150px 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px",
    gridTemplateRows: "50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px  ",
    justifyContent: "center",
    marginTop: "-750px",
    marginLeft: "30%"


}

const titleRow = {
    backgroundColor: "#5B7082",
    color: "white",
    fontSize: "14px",
    textAlign: "center",
    border: "0.5px solid #D2D5DA",
    height: "50px",
    paddingTop: "15px",
    marginLeft: "-0.5px"
}

const entryRow = {
    backgroundColor: "white",
    color: "#202E47",
    fontSize: "12px",
    textAlign: "center",
    border: "0.5px solid #D2D5DA",
    height: "50px",
    paddingTop: "16px",
    marginLeft: "-0.5px",
}



const buttonContainer = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
}


const firebaseRoster = {
    display: "flex",
    flexDirection: "column",
	// justifyContent: "center",
    // alignItems: "center",
    // display: "grid",
    // gridTemplateColumns: "auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto "
}

const mentorContainer = {
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
}

const data = {
    padding: "10px",
    fontWeight: "300",
    fontSize: "12px",
    border: "0.5px solid #49479D",
    marginRight: "-1px",
    marginTop: "-1px",
}

const sortBtnContainer = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: "50vw"
}

const sortBtn = {
    fontSize: "18px",
    fontWeight: "500",
    color: "white",
    backgroundColor: "#49479D",
    borderRadius: "28px",
    height: "46px",
    paddingLeft: "15px",
    paddingRight: "15px",
    marginLeft: "10px",
    marginBottom: "20px",
    width: "300px"

}

const addBtn = {
    fontSize: "18px",
    fontWeight: "500",
    color: "#49479D",
    backgroundColor: "white",
    borderRadius: "28px",
    height: "46px",
    paddingLeft: "15px",
    paddingRight: "15px",
    marginLeft: "10px",
    marginBottom: "20px",
    width: "300px",
    border: "1px solid #49479D"
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
