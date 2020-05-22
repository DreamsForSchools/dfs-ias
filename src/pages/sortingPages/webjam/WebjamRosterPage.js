import React from 'react'

import SideNavBar from '../../../components/sidebar/SideNavBar';
import SortingPagesNavbar from '../../../components/sortingPagesComponents/SortingPagesNavbar'
import TitleToolbar from '../../.././components/sortingPagesComponents/TitleToolbar';
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import fire from '../../.././config/fire';

export default function WebjamRosterPage() {

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
            <TitleToolbar program="webjam" season="Spring" year="2020" urlPath="webjam"/>

            <div className="programPageContainer">
                <h1>Webjam ROSTER Page</h1>
            </div>

        </div>
    )
}