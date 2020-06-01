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


    return (
        <div>
            <TitleToolbar program="Shpero" season="Spring" year="2020" urlPath="sphero"/>

            <div className="programPageContainer">
                <h1>Sphero SORTED ROSTER Page</h1>
            </div>

        </div>
    )
}