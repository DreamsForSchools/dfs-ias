import React from 'react'

import SideNavBar from '.././sidebar/SideNavBar';
import SortingPagesNavbar from './SortingPagesNavbar'
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';

import fire from '../.././config/fire';

// This Component includes the SideNavBar component, 
// the title header and the SortingPagesNavbar component
export default function TitleToolbar(props) {

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

            <div className="sortingPagesContainer">
                <h1 className="sortedPagePageTitle">{props.program} {props.season} {props.year}</h1>

                <SortingPagesNavbar />

            </div>

        </div>
    )
}