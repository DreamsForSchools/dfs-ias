import React from 'react'

import TitleToolbar from '../../.././components/sortingPagesComponents/TitleToolbar';
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import fire from '../../.././config/fire';

/* 
    this page shows the total shirts for each size for webjam
*/
export default function WebjamShirtPage() {

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
            <TitleToolbar program="webjam" season="Spring" year="2020" urlPath="webjam"/>

            <div className="programPageContainer">
                <h1>Webjam SHIRT Page</h1>
            </div>

        </div>
    )
}