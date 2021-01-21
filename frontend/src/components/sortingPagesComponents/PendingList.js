import React from 'react'

import { useState, useEffect, useRef } from 'react';
import PendingListNameButton from './PendingListNameButton'

import fire from '../.././config/fire';
// import firebase from 'firebase';

/*
    This component is shows pending students
    meaning they are temporarily removed from the sorted roster
*/
export default function PendingList({program}) {


    const [removedInstructors, setRemovedInstructors] = useState([]);

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
            const removedList = []      
            snap.forEach((doc) =>{
                if (latestRoster === doc.key){
                    console.log("LATEST ROSTER DOC.KEY:",doc.key, doc.val())
                    const schoolArray = doc.val();
                    for (var school in schoolArray){
                        // console.log("LOCKED LIST", school)
                        if (school === "Removed"){
                            for (var removedInstructor in schoolArray[school]){
                                removedList.push(removedInstructor)
                            }
                        }
                    }
                }
            });
            console.log("REMOVED LIST",removedList)
            setRemovedInstructors(removedList);
        });
      },[]);

    return (
        <div style={pendingLockedBox}>
            <h3 style={pendingLockedTitle}>Pending</h3>
            <div style={pendingLockedNameContainer}>
                {removedInstructors.map((instructors,i) => (
                    <PendingListNameButton name={instructors} program={program} key={i}/>
                ))}
                {/* <PendingListNameButton name="Hannah Fragante"/>
                <PendingListNameButton name="Dylan Fragante"/>
                <PendingListNameButton name="Annie Fragante"/>
                <PendingListNameButton name="Deodato Fragante"/>
                <PendingListNameButton name="Rodita Fragante"/> */}
            </div>
        </div>
    )
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