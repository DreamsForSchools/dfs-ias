import React from 'react'

import SideNavBar from '../../../components/sidebar/SideNavBar';
import SortingPagesNavbar from '../../../components/sortingPagesComponents/SortingPagesNavbar'
import TitleToolbar from '../../.././components/sortingPagesComponents/TitleToolbar';
import SortedInstructorsCard from '../../../components/sortingPagesComponents/SortedInstructorsCard';
import { useHistory } from "react-router-dom";
import { useState, useEffect, useCallback } from 'react';

import fire from '../../.././config/fire';
import firebase from 'firebase';

import userCollection from '../../../mockDatabase/MockDatabase';

const sortedRosterCollection = fire.database().ref().child('sortedroster');
export default function AppjamSortedRosterPage() {

    //User auth 
    const [user, setUser] = useState(null);
    // console.log(userCollection);

    const [carr, setCarr] = useState({"school":"carr"});
    // console.log(carr)

    //History hook for navigation
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
      },[]);

    //   useEffect(() => {
    //     sortedRosterCollection.once('value', (snap) => {
    //         const roster = []
    //         snap.forEach((doc) =>{
    //             // console.log(doc.key);
    //             // var mentors = doc.val();
    //             // for (var k in mentors){
    //             //     console.log(doc.key, k, mentors[k])
    //             // }
    //             if (doc.key==="Carr Intermediate"){
    //                 var school = doc.key;
    //                 var mentorList = doc.val();
    //                 var schoolMentor = {school:school, mentors: mentorList};
    //                 // roster.push(schoolMentor);
    //                 // console.log(roster.length);
    //                 setCarr(schoolMentor)
    //                 // console.log(carr)
    //             }
    //         });
    //         // console.log(roster)
    //     });
    //   }, [carr]);

    
    const carrSchool = () => {
        sortedRosterCollection.once('value', (snap) => {
            const roster = []
            snap.forEach((doc) =>{
                // console.log(doc.key);
                // var mentors = doc.val();
                // for (var k in mentors){
                //     console.log(doc.key, k, mentors[k])
                // }
                if (doc.key==="Carr Intermediate"){
                    var school = doc.key;
                    var mentorList = doc.val();
                    var schoolMentor = {school:school, mentors: mentorList};
                    // roster.push(schoolMentor);
                    // console.log(roster.length);
                    return schoolMentor
                    console.log(schoolMentor)
                    // console.log(carr)
                }
            });
            // console.log(roster)
        });
    }


    return (
        <div>
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
                        <SortedInstructorsCard instructors={carr} SbgColor="#7FC9FF" SborderColor="#0099FF"/>
                        <SortedInstructorsCard SbgColor="#7FC9FF" SborderColor="#0099FF"/>
                        <SortedInstructorsCard SbgColor="#A4A3CE" SborderColor="#49479D"/>
                        <SortedInstructorsCard SbgColor="#A4A3CE" SborderColor="#49479D"/>
                        <SortedInstructorsCard SbgColor="#9AE4E3" SborderColor="#40CCC8"/>
                        <SortedInstructorsCard SbgColor="#9AE4E3" SborderColor="#40CCC8"/>
                        <SortedInstructorsCard SbgColor="#F9DEA6" SborderColor="#F3BF4D"/>
                        <SortedInstructorsCard SbgColor="#F9DEA6" SborderColor="#F3BF4D"/>

                    </div>
                </div>
            </div> 

        </div>
    )
}