import React from 'react'

import { useState, useEffect, useRef } from 'react';
import MoveInstructor from './MoveInstructor'

import fire from '../.././config/fire';
// import firebase from 'firebase';

/*
    This component is shows names on the pending list
    when their name is clicked they can be moved back to 
    the sorted roster to an available school
*/
export default function PendingListNameButton({name, program}) {

    const [availableSchools, setAvailableSchools] = useState([]);

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
            const availableList = []      
            snap.forEach((doc) =>{
                if (latestRoster === doc.key){
                    console.log("LATEST ROSTER DOC.KEY:",doc.key, doc.val())
                    const schoolArray = doc.val();
                    for (var school in schoolArray){
                        // console.log("LOCKED LIST", school)
                        if (school === "Available"){
                            for (var school in schoolArray[school]){
                                availableList.push(school)
                            }
                        }
                    }
                }
            });
            console.log("AVAILABLE LIST",availableList)
            setAvailableSchools(availableList);
        });
      },[]);

    //toggle condition for moving instructors
    const[isMove, setIsMove] = useState(false);

    //passed into MoveInstructor Component so the modal can be toggled off
    const moveBtnClickedInMoveInstructor = (e) => {
        console.log("MOVED FROM DROPDOWNINSTRUCTORS!!!")
        // alert("MOVED FROM DROPDOWNINSTRUCTORS")
        setIsMove(!isMove);
    }

    //function that triggers when name is clicked
    const nameClicked = (e, name) => {
        console.log("MOVE " + name);
        setIsMove(!isMove);
    }

    return (
        <div>
            {isMove? (<MoveInstructor instructor={name} onMove={moveBtnClickedInMoveInstructor} schools={availableSchools} program={program}/>) : null}
            <h4 onClick={(e) => { nameClicked(e, name) }} className="pendingLockedName">{name}</h4>
        </div>
    )
} 