import React from 'react'
import add from '.././assets/add.svg'
import groupIcon2 from '.././assets/groupIcon2.svg';

import SideNavBar from '../components/sidebar/SideNavBar';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';

import fire from '.././config/fire';

export default function SpheroHomePage() {

    const [user, setUser] = useState(null);

    let history = useHistory();
    const addRoster = () => {
        fire.auth().onAuthStateChanged(user => {
            if (user){
                history.push('/spherohome/addrosterform');
            }else{
                history.push('/');
            }
            
          })

    }

    const currentRoster = () => {
        fire.auth().onAuthStateChanged(user => {
            if (user){
                history.push('/spherohome/roster');
                // history.push('/appjamhome/roster');
            }else{
                history.push('/');
            }
            
          })

    }

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
            <SideNavBar chosen="sphero"/>

            <div className="programPageContainer">
                <h1 className="programPageTitle">sphero</h1>

                <div className="hozLineDivider"></div>

                <div style={buttonsContainer}>
                    <button onClick={currentRoster} className="programPageAddRosterBtn1">
                        <img src={groupIcon2} className="addLogo1" alt="logo"/>
                        <h4 className="addRosterLaber1">Check Existing Roster</h4>
                    </button>

                    <button onClick={addRoster} className="programPageAddRosterBtn">
                        <img src={add} className="addLogo" alt="logo"/>
                        <h4 className="addRosterLaber">New Roster</h4>
                    </button>
                </div>

            </div>

        </div>
    )
}

const buttonsContainer = {
    display: "flex",
    flexDirection: "row",
    marginLeft: "51px"
}