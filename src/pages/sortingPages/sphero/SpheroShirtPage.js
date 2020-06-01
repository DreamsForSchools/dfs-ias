import React from 'react'

import TitleToolbar from '../../.././components/sortingPagesComponents/TitleToolbar';
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import fire from '../../.././config/fire';

/* 
    this page shows the total shirts for each size for sphero
*/
export default function SpheroShirtPage() {

    //auth variable
    const [user, setUser] = useState(null);

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


    return (
        <div>
            <TitleToolbar program="Shpero" season="Spring" year="2020" urlPath="sphero"/>

            <div className="programPageContainer">
                <h1>Sphero SHIRT Page</h1>
            </div>

        </div>
    )
}