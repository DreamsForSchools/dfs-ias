import React from 'react'

import SideNavBar from '../../../components/sidebar/SideNavBar';
import SortingPagesNavbar from '../../../components/sortingPagesComponents/SortingPagesNavbar'
import TitleToolbar from '../../.././components/sortingPagesComponents/TitleToolbar';
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import fire from '../../.././config/fire';

export default function AppjamRosterPage(props) {

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

    const [roster, setRoster] = useState([])
    const sortedRosterCollection = useRef(fire.database().ref().child('Instructors'))

    useEffect(() => {
        sortedRosterCollection.current.once('value', (snap) => {
            const rosterFire = []
            snap.forEach((doc) =>{
                const mentorID = doc.key;
                const mentorList = doc.val();
                rosterFire.push(
                    {
                        "mentorID": mentorID,
                        "car": mentorList["Car"],
                        "ethnicity": mentorList["Ethnicity"],
                        "friday": mentorList["Friday"],
                        "gender": mentorList["Gender"],
                        "languages": mentorList["Languages"],
                        "monday": mentorList["Monday"],
                        "multipleDays": mentorList["MultipleDays"],
                        "name": mentorList["Name"],
                        "prevMentor": mentorList["PreviousMentor"],
                        "region": mentorList["Region"],
                        "shirtSize": mentorList["ShirtSize"],
                        "thursday": mentorList["Thursday"],
                        "tuesday": mentorList["Tuesday"],
                        "university": mentorList["University"],
                        "wednesday": mentorList["Wednesday"],
                        "year": mentorList["Year"]
                    }
                )
            });
            setRoster(rosterFire);
        });
    },[]);

    const sortClicked = (e, name) => {
        history.push('/appjamhome/sortedroster');
    }

    return (
        <div>
            {/* <SideNavBar />
            <div className="programPageContainer">
                <h1 className="sortedPagePageTitle">appjam+ [SEASON] [YEAR]</h1>
                <SortingPagesNavbar />
            </div> */}

            {/* <TitleToolbar program="appjam+" season={props.location.state.quarter} year={props.location.state.year}  urlPath="appjam"/> */}

            <TitleToolbar program="appjam+" season="Spring" year="2020"  urlPath="appjam"/>

            <div className="programPageContainer">

                <div style={sortBtnContainer}>
                    <button onClick={sortClicked} style={sortBtn}>SORT!</button>
                </div>     

                <div style={firebaseRoster}>
                    {roster.map((mentor) => (
                        <div style={mentorContainer} key={mentor.mentorID}>
                            <h3 style={data}>{mentor.name}</h3>
                            <h3 style={data}>{mentor.gender}</h3>
                            <h3 style={data}>{mentor.ethnicity}</h3>
                            <h3 style={data}>{mentor.languages}</h3>
                            <h3 style={data}>{mentor.university}</h3>
                            <h3 style={data}>{mentor.year}</h3>
                            <h3 style={data}>{mentor.region}</h3>
                            <h3 style={data}>{mentor.monday}</h3>
                            <h3 style={data}>{mentor.tuesday}</h3>
                            <h3 style={data}>{mentor.wednesday}</h3>
                            <h3 style={data}>{mentor.thursday}</h3>
                            <h3 style={data}>{mentor.friday}</h3>
                            <h3 style={data}>{mentor.prevMentor}</h3>
                            <h3 style={data}>{mentor.car}</h3>
                            <h3 style={data}>{mentor.multipleDays}</h3>
                            <h3 style={data}>{mentor.shirtSize}</h3>
                        </div>
                    ))}

                </div>
            </div> 

        </div>
    )
}


const firebaseRoster = {
    display: "flex",
    flexDirection: "column",
	// justifyContent: "center",
    // alignItems: "center",
    // display: "grid",
    // gridTemplateColumns: "auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto "
}

const mentorContainer = {
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
}

const data = {
    padding: "10px",
    fontWeight: "300",
    fontSize: "12px",
    border: "0.5px solid #49479D",
    marginRight: "-1px",
    marginTop: "-1px",
}

const sortBtnContainer = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "50vw"
}

const sortBtn = {
    fontSize: "14px",
    color: "white",
    backgroundColor: "#49479D",
    borderRadius: "28px",
    height: "46px",
    paddingLeft: "15px",
    paddingRight: "15px",
    marginLeft: "10px"

}