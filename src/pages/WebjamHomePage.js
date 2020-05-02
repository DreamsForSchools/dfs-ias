import React from 'react'
import add from '.././assets/add.svg'

import SideNavBar from '../components/sidebar/SideNavBar';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';

import fire from '.././config/fire';

export default function WebjamHomePage() {

    const [user, setUser] = useState(null);

    let history = useHistory();
    const addRoster = () => {
        fire.auth().onAuthStateChanged(user => {
            if (user){
                history.push('/template');
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
            <SideNavBar chosen="webjam"/>

            <div className="programPageContainer">
                <h1 className="programPageTitle">webjam</h1>

                <div className="hozLineDivider"></div>

                <button onClick={addRoster} className="programPageAddRosterBtn">
                    <img src={add} className="addLogo" alt="logo"/>
                    <h4 className="addRosterLaber">Add Roster</h4>
                </button>

            </div>

        </div>
    )
}