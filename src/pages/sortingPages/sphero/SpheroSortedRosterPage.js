import React from 'react'

import SideNavBar from '../../../components/sidebar/SideNavBar';
import SortingPagesNavbar from '../../../components/sortingPagesComponents/SortingPagesNavbar'
import TitleToolbar from '../../.././components/sortingPagesComponents/TitleToolbar';
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import fire from '../../.././config/fire';

export default function SpheroSortedRosterPage() {

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
            <TitleToolbar program="Shpero" season="Spring" year="2020" urlPath="sphero"/>

            <div className="programPageContainer">
                <h1>Sphero SORTED ROSTER Page</h1>
            </div>

        </div>
    )
}