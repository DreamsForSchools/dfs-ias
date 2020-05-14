import React from 'react'

import SideNavBar from '../../../components/sidebar/SideNavBar';
import SortingPagesNavbar from '../../../components/sortingPagesComponents/SortingPagesNavbar'
import TitleToolbar from '../../.././components/sortingPagesComponents/TitleToolbar';
import SortedInstructorsCard from '../../../components/sortingPagesComponents/SortedInstructorsCard';
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import fire from '../../.././config/fire';
import firebase from 'firebase';

import userCollection from '../../../mockDatabase/MockDatabase';

// const sortedRosterCollection = fire.database().ref().child('sortedroster');
export default function AppjamSortedRosterPage() {

    //User auth 
    const [user, setUser] = useState(null);
    // console.log(userCollection);

    const [carr, setCarr] = useState(
        {
            "school": "Carr Intermediate",
            "mentors": [
                {
                    "name":"Hannah Fragante",
                    "firstName": "Hannah",
                    "car": "Yes",
                    "languages": "Tagalog",
                    "multipleDays": "Yes",
                    "prevMentor": "Yes",
                    "region": "Orange County",
                    "schoolName": "Carr",
                },
                {
                    "name":"Dylan Fragante",
                    "firstName": "Dylan",
                    "car": "Yes",
                    "languages": "Tagalog",
                    "multipleDays": "Yes",
                    "prevMentor": "No",
                    "region": "Orange County",
                    "schoolName": "Carr",
                },
                {
                    "name":"Annie Fragante",
                    "firstName": "Annie",
                    "car": "Yes",
                    "languages": "Tagalog",
                    "multipleDays": "Yes",
                    "prevMentor": "Yes",
                    "region": "Orange County",
                    "schoolName": "Carr",
                },
                {
                    "name":"Deodato Fragante",
                    "firstName": "Deodato",
                    "car": "Yes",
                    "languages": "Tagalog",
                    "multipleDays": "Yes",
                    "prevMentor": "Yes",
                    "region": "Orange County",
                    "schoolName": "Carr",
                },

            ]
            
        }
    );
    const [schools, setSchools] = useState([]);    
    const sortedRosterCollection = useRef(fire.database().ref().child('sortedroster'))

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

      
    useEffect(() => {
        sortedRosterCollection.current.once('value', (snap) => {
            const roster = []
            snap.forEach((doc) =>{
                const school = doc.key;
                const mentorList = doc.val();
                const mentorArray = [];
                for (var k in mentorList){
                    mentorArray.push(
                        {
                            "name":k,
                            "firstName": k.split(" ")[0],
                            "car": mentorList[k]["Car"],
                            "languages": mentorList[k]["Languages"],
                            "multipleDays": mentorList[k]["MultipleDays"],
                            "prevMentor": mentorList[k]["PreviousMentor"],
                            "region": mentorList[k]["Region"],
                            "schoolName": mentorList[k]["SchoolName"],
                        }
                    )
                }
                // console.log(mentorArray)
                const schoolMentor = {school:school, mentors: mentorArray};
                roster.push(schoolMentor);

                // if (doc.key==="Carr Intermediate"){
                //     const school = doc.key;
                //     const mentorList = doc.val();
                //     const mentorArray = [];
                //     for (var k in mentorList){
                //         mentorArray.push(
                //             {
                //                 "name":k,
                //                 "firstName": k.split(" ")[0],
                //                 "car": mentorList[k]["Car"],
                //                 "languages": mentorList[k]["Languages"],
                //                 "multipleDays": mentorList[k]["MultipleDays"],
                //                 "prevMentor": mentorList[k]["PreviousMentor"],
                //                 "region": mentorList[k]["Region"],
                //                 "schoolName": mentorList[k]["SchoolName"],
                //             }
                //         )
                //     }
                //     console.log(mentorArray)
                //     const schoolMentor = {school:school, mentors: mentorArray};
                //     setCarr(schoolMentor)
                // }
            });
            setSchools(roster);
        });
    },[]);

    console.log(carr)
    console.log(schools)

    const test = () => {
        return {"school":"carr"}
    }



    return (
        <div>
            <TitleToolbar program="appjam+" season="Spring" year="2020"/>

            <div className="programPageContainer">

                {/* {
                    userCollection.map(user => 
                        <h3>{user.name}</h3>
                    )
                } */}
                
                <div className="sortedInstructorCardsWrapper">
                    <div className="instructorCardsContainer">
                        {schools.map((schoolMentors,i) => (
                            <SortedInstructorsCard instructors={schoolMentors} SbgColor="#7FC9FF" SborderColor="#0099FF"/>
                        ))}
                        {/* <SortedInstructorsCard instructors={carr} SbgColor="#7FC9FF" SborderColor="#0099FF"/>
                        <SortedInstructorsCard instructors={carr} SbgColor="#7FC9FF" SborderColor="#0099FF"/>
                        <SortedInstructorsCard SbgColor="#A4A3CE" SborderColor="#49479D"/>
                        <SortedInstructorsCard SbgColor="#A4A3CE" SborderColor="#49479D"/>
                        <SortedInstructorsCard SbgColor="#9AE4E3" SborderColor="#40CCC8"/>
                        <SortedInstructorsCard SbgColor="#9AE4E3" SborderColor="#40CCC8"/>
                        <SortedInstructorsCard SbgColor="#F9DEA6" SborderColor="#F3BF4D"/>
                        <SortedInstructorsCard SbgColor="#F9DEA6" SborderColor="#F3BF4D"/> */}

                    </div>
                </div>
            </div> 

        </div>
    )
}