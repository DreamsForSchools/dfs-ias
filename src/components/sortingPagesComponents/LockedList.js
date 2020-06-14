import React from 'react'

import { useState, useEffect, useRef } from 'react';

import fire from '../.././config/fire';
// import firebase from 'firebase';

/*
    This component is shows locked students
*/
export default function LockedList({program}) {

    const [lockedSchools, setLockedSchools] = useState([]);

    const appjamSortedRosterCollection = useRef(fire.database().ref().child(program+'/matches'));

    useEffect(() => {

        var latestRoster = 0;
        appjamSortedRosterCollection.current.on('value', (snap) => {
            snap.forEach((doc) =>{
                console.log(parseInt(doc.key), "NEW!!!!NEW!!!")
                if (latestRoster < doc.key){
                    latestRoster = doc.key
                }
            });
            console.log("LATEST ROSTER:",latestRoster)
        });


        appjamSortedRosterCollection.current.on('value', (snap) => {     
            const lockedList = []      
            snap.forEach((doc) =>{
                if (latestRoster === doc.key){
                    console.log("LATEST ROSTER DOC.KEY:",doc.key, doc.val())
                    const schoolArray = doc.val();
                    for (var school in schoolArray){
                        // console.log("LOCKED LIST", school)
                        if (school === "Locked"){
                            for (var lockedSchool in schoolArray[school]){
                                // console.log("LOCKED LIST SCHOOL", lockedSchool)
                                const lockedSchoolStudents = []
                                for (var lockedSchoolName in schoolArray[school][lockedSchool]){
                                    lockedSchoolStudents.push(lockedSchoolName)
                                }
                                // console.log({school:lockedSchool, instructors:lockedSchoolStudents})
                                lockedList.push({school:lockedSchool, instructors:lockedSchoolStudents})
                            }
                        }
                    }
                }
            });
            console.log("LOCKED LIST",lockedList)
            setLockedSchools(lockedList);
        });
      },[]);

    return (
        <div style={pendingLockedBox}>
            <h3 style={pendingLockedTitle}>Locked</h3>
            <div style={pendingLockedNameContainer}>
                {lockedSchools.map((lockedlMentors,i) => (
                    <div style={pendingLockedNameShool} key={lockedlMentors.school}>
                        <h4 style={pendingLockedSchool}>{lockedlMentors.school}</h4>
                        {lockedlMentors.instructors.map((lockedlMentorName,i) => (
                                <h4 style={pendingLockedName} key={lockedlMentorName}>{lockedlMentorName}</h4>
                        ))}
                    </div>
                ))}
                {/* <div style={pendingLockedNameShool}>
                    <h4 style={pendingLockedSchool}>Carr Intermediate</h4>
                    <h4 style={pendingLockedName}>Hannah Fragante</h4>
                    <h4 style={pendingLockedName}>Hannah Fragante</h4>
                </div>
                <div style={pendingLockedNameShool}>
                    <h4 style={pendingLockedSchool}>Carr Intermediate</h4>
                    <h4 style={pendingLockedName}>Hannah Fragante</h4>
                    <h4 style={pendingLockedName}>Hannah Fragante</h4>
                    <h4 style={pendingLockedName}>Hannah Fragante</h4>
                    <h4 style={pendingLockedName}>Hannah Fragante</h4>
                </div> */}
            </div>
        </div>
    )
} 

const pendingLockedBox = {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    minWidth: "300px",
    maxWidth:"500px",
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px",
    flexWrap: "wrap",
    // width: "290px"
}

const pendingLockedNameShool = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "5px",
    flexWrap: "wrap"
}

const pendingLockedName = {
    fontWeight: "400",
    fontSize: "12px",
    // margin: "1px",
    padding: "1px",
    color: "#202E47",
    // backgroundColor: "#A4A3CE",
    // width: "300px",
    textAlign: "center"
}

const pendingLockedSchool = {
    fontWeight: "500",
    fontSize: "12px",
    // margin: "1px",
    padding: "1px",
    color: "#202E47",
    // backgroundColor: "#A4A3CE",
    // width: "300px",
    textAlign: "center"
}