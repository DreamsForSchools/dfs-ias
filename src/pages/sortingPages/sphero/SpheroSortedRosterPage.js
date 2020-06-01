import React from 'react'

import TitleToolbar from '../../.././components/sortingPagesComponents/TitleToolbar';
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import fire from '../../.././config/fire';

/* 
    this page shows the sorted roster for sphero
*/
export default function SpheroSortedRosterPage() {

    //User auth 
    const [user, setUser] = useState(null);

    //stores the quarter from the database
    const [quarter, setQuarter] = useState("");

    //stores the year from the database
    const [year, setYear] = useState("");

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

    //accesses firebase for appjam's quarter and year
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

    return (
        <div>
            <TitleToolbar program="Shpero" season={quarter} year={year} urlPath="sphero"/>

            <div className="programPageContainer">
                <h1>Sphero SORTED ROSTER Page</h1>
            </div>

        </div>
    )
}