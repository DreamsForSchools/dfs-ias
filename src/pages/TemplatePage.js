import React from 'react'

import SideNavBar from '../components/sidebar/SideNavBar';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';

import fire from '.././config/fire';

export default function TemplatePage() {

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


    return (
        <div>
            <SideNavBar />

            <div className="programPageContainer">
                <h1 className="programPageTitle">template page</h1>

                <div className="hozLineDivider"></div>

            </div>

        </div>
    )
}