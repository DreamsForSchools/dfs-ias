import React from 'react'

import SideNavBar from '../../../components/sidebar/SideNavBar';
import SortingPagesNavbar from '../../../components/sortingPagesComponents/SortingPagesNavbar'
import TitleToolbar from '../../.././components/sortingPagesComponents/TitleToolbar';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';

import fire from '../../.././config/fire';

export default function AppjamSortedRosterPage() {

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
            {/* <SideNavBar />

            <div className="programPageContainer">
                <h1 className="sortedPagePageTitle">appjam+ [SEASON] [YEAR]</h1>

                <SortingPagesNavbar />

            </div> */}
            <TitleToolbar program="appjam+" season="Spring" year="2020"/>

            <div className="programPageContainer">
                <h1>Shirt Summary Page</h1>
            </div> 

        </div>
    )
}