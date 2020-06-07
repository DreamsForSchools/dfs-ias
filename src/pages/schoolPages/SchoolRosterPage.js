import React from 'react'

import SideNavBar from '../.././components/sidebar/SideNavBar';
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import fire from '../.././config/fire';

export default function SchoolRosterPage() {

    const [user, setUser] = useState(null);

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

    const convertTime = (dayTimesArray) => {
        return convertMins(dayTimesArray[0]) + "-" + convertMins(dayTimesArray[1])
    }
    
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

      const [appjamRoster, setAppjamRoster] = useState([])
      const [spheroRoster, setSpheroRoster] = useState([])
      const [webjamRoster, setWebjamRoster] = useState([])
      const appjamRosterCollection = useRef(fire.database().ref().child('AppJam+/institutions'));
      const spheroRosterCollection = useRef(fire.database().ref().child('SpheroElementary/institutions'));
      const webjamRosterCollection = useRef(fire.database().ref().child('WebJam/institutions'));

      useEffect(() => {
          var latestRoster = 0;
          appjamRosterCollection.current.on('value', (snap) => {
              snap.forEach((doc) =>{
                  console.log(parseInt(doc.key), "NEW!!!!NEW!!!")
                  if (latestRoster < doc.key){
                      latestRoster = doc.key
                  }
              });
              console.log("LATEST ROSTER:",latestRoster)
          });
  
  
          appjamRosterCollection.current.once('value', (snap) => {     
              const rosterFire = []      
              snap.forEach((doc) =>{
                  if (latestRoster === doc.key){
                      console.log("LATEST ROSTER DOC.KEY:",doc.key, doc.val())
                      const schoolArray = doc.val();
                      for (var school in schoolArray){
                        //   console.log(school)
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
            //   console.log(rosterFire)
              setAppjamRoster(rosterFire)
          });

          var latestRoster = 0;
          spheroRosterCollection.current.on('value', (snap) => {
              snap.forEach((doc) =>{
                  console.log(parseInt(doc.key), "NEW!!!!NEW!!!")
                  if (latestRoster < doc.key){
                      latestRoster = doc.key
                  }
              });
              console.log("LATEST ROSTER:",latestRoster)
          });
  
  
          spheroRosterCollection.current.once('value', (snap) => {     
              const rosterFire = []      
              snap.forEach((doc) =>{
                  if (latestRoster === doc.key){
                      console.log("LATEST ROSTER DOC.KEY:",doc.key, doc.val())
                      const schoolArray = doc.val();
                      for (var school in schoolArray){
                        //   console.log(school)
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
            //   console.log(rosterFire)
                setSpheroRoster(rosterFire)
          });

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
  
  
          webjamRosterCollection.current.once('value', (snap) => {     
              const rosterFire = []      
              snap.forEach((doc) =>{
                  if (latestRoster === doc.key){
                      console.log("LATEST ROSTER DOC.KEY:",doc.key, doc.val())
                      const schoolArray = doc.val();
                      for (var school in schoolArray){
                        //   console.log(school)
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
            //   console.log(rosterFire)
                setWebjamRoster(rosterFire)
          });



        },[]);


    return (
        <div>
            <SideNavBar />

            <div className="programPageContainer">
                <h1 className="programPageTitle">school rosters </h1>

                <div className="hozLineDivider"></div>

                <div style={programSchools}>
                    <h1 style={schoolText}>Appjam+ Schools</h1>
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


                        {appjamRoster.map((school,i) => (
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

                <div style={fixMargin}>
                    <div style={programSchools}>
                        <h1 style={schoolText}>Sphero Schools</h1>
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


                            {spheroRoster.map((school,i) => (
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
                </div>
                <div style={fixMargin}>
                    <div style={programSchools}>
                        <h1 style={schoolText}>WebJam Schools</h1>
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


                            {webjamRoster.map((school,i) => (
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
                </div>
                    
                


            </div>

        </div>
    )
}

const fixMargin = {
    marginTop: "-380px"
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
    // marginTop: "-0.5px"
}

const yes1 = {
    backgroundColor: "red"
}

const yes2 = {
    backgroundColor: "yellow"
}

const yes3 = {
    backgroundColor: "orange"
}

const yes4 = {
    backgroundColor: "pink"
}

const yes5 = {
    backgroundColor: "blue"
}

const yes6 = {
    backgroundColor: "gray"
}

const yes7 = {
    backgroundColor: "green"
}

const yes8 = {
    backgroundColor: "purple"
}

const yes9 = {
    backgroundColor: "lightblue"
}

