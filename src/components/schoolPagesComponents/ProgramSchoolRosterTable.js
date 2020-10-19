import React from 'react'

import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import fire from '../../config/fire';

/*
    table component that displays school rosters,
    given a specific program
*/
export default function ProgramSchoolRosterTable({program, databaseName}) {

    //auth variable
    const [user, setUser] = useState(null);

    //for navigation
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

    // variable to store roster from the database 
    const [roster, setRoster] = useState([])

    // database reference of {program} roster
    const programRosterCollection = useRef(fire.database().ref().child(databaseName+'/institutions'));

    //accesses the database and store the roster respectively
    useEffect(() => {
        //finds the latest roster in the database
        var latestRoster = 0;
        programRosterCollection.current.on('value', (snap) => {
            snap.forEach((doc) =>{
                if (latestRoster < doc.key){
                    latestRoster = doc.key
                }
            });
            console.log("LATEST ROSTER:",latestRoster)
        });


        programRosterCollection.current.once('value', (snap) => {     
            const rosterFire = []      
            snap.forEach((doc) =>{
                if (latestRoster === doc.key){
                    const schoolArray = doc.val();
                    for (var school in schoolArray){
                        const schoolID = school;
                        const schoolList = schoolArray[school];
                        rosterFire.push(
                            {
                                "mentorID": schoolID,
                                "address": schoolList["Address"],
                                "county": schoolList["County"],
                                "instructors": schoolList["Instructors"],
                                "name": schoolList["Name"],
                                "schedule": convertSchedule(schoolList["Schedule"]),
                            }
                        )
                        
                    }
                }
            });
            setRoster(rosterFire)
        });

      },[]);


    return (
        <div style={programSchools}>
            <h1 style={schoolText}>{program} Schools</h1>
            <div style={gridWrapper}>
                <div style={gridContainer}>
                    <div style={titleRow}>Name</div>
                    <div style={titleRow}>Address</div>
                    <div style={titleRow}>County</div>
                    <div style={titleRow}># of Instructors</div>
                    <div style={titleRow}>Mon</div>
                    <div style={titleRow}>Tue</div>
                    <div style={titleRow}>Wed</div>
                    <div style={titleRow}>Thu</div>
                    <div style={titleRow}>Fri</div>
                </div>


                {roster.map((school,i) => (
                    <div style={gridEntryContainer} key={school.name}>
                        <div style={entryRow}>{school.name}</div>
                        <div style={entryRow}>{school.address}</div>
                        <div style={entryRow}>{school.county}</div>
                        <div style={entryRow}>{school.instructors}</div>
                        <div style={entryRow}>{school.schedule.mon}</div>
                        <div style={entryRow}>{school.schedule.tue}</div>
                        <div style={entryRow}>{school.schedule.wed}</div>
                        <div style={entryRow}>{school.schedule.thu}</div>
                        <div style={entryRow}>{school.schedule.fri}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const programSchools = {
    marginTop: "20px"
}

const schoolText = {
    color: "#5B7082",
    marginLeft: "10%"
}

const gridWrapper = {
    display: "flex",
    flexDirection: "column",
}

const gridContainer = {
    display: "grid",
    gridTemplateColumns: "200px 300px 200px 150px 80px 80px 80px 80px 80px ",
    gridTemplateRows: "50px 50px 50px 50px 50px 50px 50px 50px 50px ",
    justifyContent: "center",
    marginTop: "10px"

}

const gridEntryContainer = {
    display: "grid",
    gridTemplateColumns: "200px 300px 200px 150px 80px 80px 80px 80px 80px ",
    gridTemplateRows: "50px 50px 50px 50px 50px 50px 50px 50px 50px ",
    justifyContent: "center",
    marginTop: "-405px"

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