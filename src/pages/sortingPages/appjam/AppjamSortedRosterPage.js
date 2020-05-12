import React from 'react'

import SideNavBar from '../../../components/sidebar/SideNavBar';
import SortingPagesNavbar from '../../../components/sortingPagesComponents/SortingPagesNavbar'
import TitleToolbar from '../../.././components/sortingPagesComponents/TitleToolbar';
import SortedInstructorsCard from '../../../components/sortingPagesComponents/SortedInstructorsCard';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';

import fire from '../../.././config/fire';

import userCollection from '../../../mockDatabase/MockDatabase';

export default function AppjamSortedRosterPage() {

    const [user, setUser] = useState(null);
    console.log(userCollection);

    let history = useHistory();

    //checks if user is currently logged in (authenticates user)
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
                <h1>Sorted Roster Page</h1> 
                {/* {
                    userCollection.map(user => 
                        <h3>{user.name}</h3>
                    )
                } */}
                
                <div className="sortedInstructorCardsWrapper">
                    <div className="instructorCardsContainer">
                        <SortedInstructorsCard bgColor="#7FC9FF" borderColor="#0099FF"/>
                        <SortedInstructorsCard bgColor="#7FC9FF" borderColor="#0099FF"/>
                        <SortedInstructorsCard bgColor="#A4A3CE" borderColor="#49479D"/>
                        <SortedInstructorsCard bgColor="#A4A3CE" borderColor="#49479D"/>
                        <SortedInstructorsCard bgColor="#9AE4E3" borderColor="#40CCC8"/>
                        <SortedInstructorsCard bgColor="#9AE4E3" borderColor="#40CCC8"/>
                        <SortedInstructorsCard bgColor="#F9DEA6" borderColor="#F3BF4D"/>
                        <SortedInstructorsCard bgColor="#F9DEA6" borderColor="#F3BF4D"/>

                    </div>
                </div>

                {/* <SortedInstructorsCard /> */}
            </div> 

        </div>
    )
}