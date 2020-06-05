import React from 'react'

import SideNavBar from '../../../components/sidebar/SideNavBar';
import SortingPagesNavbar from '../../../components/sortingPagesComponents/SortingPagesNavbar'
import TitleToolbar from '../../.././components/sortingPagesComponents/TitleToolbar';
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import fire from '../../.././config/fire';

/*
    this page shows the roster for appjam
*/
export default function AppjamRosterPage(props) {

    //auth variable
    const [user, setUser] = useState(null);

    //navigation variable to naviagate to other pages
    let history = useHistory();

    //stores the quarter from the database
    const [quarter, setQuarter] = useState("");

    //stores the year from the database
    const [year, setYear] = useState("");

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

    //accesses firebase for appjam's quarter and year
    const quarterYearDatabase = useRef(fire.database().ref().child('seasonYear/-M8idEUsNN1M5VcJDv-I/appjam'))

    //accesses firebase for quarter and the year
    useEffect(() => {
        quarterYearDatabase.current.once('value', (snap) => {
            const quarterYear = snap.val();
            console.log("CURRENT QUARTER:", quarterYear)
            setQuarter(quarterYear.quarter);
            setYear(quarterYear.year);
        });
    },[]);

    //stores the roster taken from the database
    const [roster, setRoster] = useState([])

    // //accesses firebase for the appjam instructors roster
    // const sortedRosterCollection = useRef(fire.database().ref().child('AppJam+/instructors'))

    // //accesses firebase for the roster
    // useEffect(() => {
    //     sortedRosterCollection.current.once('value', (snap) => {
    //         const rosterFire = []
    //         snap.forEach((doc) =>{
    //             const mentorID = doc.key;
    //             const mentorList = doc.val();
    //             rosterFire.push(
    //                 {
    //                     "mentorID": mentorID,
    //                     "car": mentorList["Car"],
    //                     "ethnicity": mentorList["Ethnicity"],
    //                     "friday": mentorList["Friday"],
    //                     "gender": mentorList["Gender"],
    //                     "languages": mentorList["Languages"],
    //                     "monday": mentorList["Monday"],
    //                     "multipleDays": mentorList["MultipleDays"],
    //                     "name": mentorList["Name"],
    //                     "prevMentor": mentorList["PreviousMentor"],
    //                     "region": mentorList["Region"],
    //                     "shirtSize": mentorList["ShirtSize"],
    //                     "thursday": mentorList["Thursday"],
    //                     "tuesday": mentorList["Tuesday"],
    //                     "university": mentorList["University"],
    //                     "wednesday": mentorList["Wednesday"],
    //                     "year": mentorList["Year"]
    //                 }
    //             )
    //         });
    //         setRoster(rosterFire);
    //     });
    // },[]);

    const appjamRosterCollection = useRef(fire.database().ref().child('AppJam+/instructors'));

    useEffect(() => {
        var latestRoster = 0;
        appjamRosterCollection.current.on('value', (snap) => {
            snap.forEach((doc) =>{
                console.log(parseInt(doc.key), "NEW!!!!NEW!!!")
                if (latestRoster < doc.key){
                    latestRoster = doc.key
                }
            });
            console.log("LATEST ROSTER:",latestRoster)
        });


        appjamRosterCollection.current.once('value', (snap) => {     
            const rosterFire = []      
            snap.forEach((doc) =>{
                if (latestRoster === doc.key){
                    console.log("LATEST ROSTER DOC.KEY:",doc.key, doc.val())
                    const instructorArray = doc.val();
                    for (var instructor in instructorArray){
                        // console.log(instructor)
                        const mentorID = instructor;
                        const mentorList = instructorArray[instructor];
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
                        
                    }
                    // console.log("THE NEW ROSTER YES",roster)
                }
            });
            console.log(rosterFire)
            setRoster(rosterFire)
        });
      },[]);

    const sortClicked = (e, name) => {
        history.push('/appjamhome/sortedroster');
    }

    return (
        <div>

            <TitleToolbar program="appjam+" season={quarter} year={year}  urlPath="appjam"/>

            <div className="programPageContainer">

                <div style={sortBtnContainer}>
                    <button onClick={sortClicked} style={sortBtn}>SORT!</button>
                </div>


                <table class="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Ethnicity</th>
                    <th>Languages</th>
                    <th>University</th>
                    <th>Year</th>
                    <th>Region</th>
                    <th>M</th>
                    <th>T</th>
                    <th>W</th>
                    <th>Th</th>
                    <th>Fri</th>
                    <th>PrevMentor</th>
                    <th>Car</th>
                    <th>Multiple Days</th>
                    <th>Shirt Size</th>

                  </tr>
                </thead>
                </table>

                <div style={firebaseRoster}>

                    {roster.map((mentor) => (

                        <div style={mentorContainer} key={mentor.mentorID}>

                        <table class="table table-condensed">

                           <tbody>
                             <tr>
                             <td class= "">{mentor.name}</td>
                               <td className="center">{mentor.gender}</td>
                               <td>{mentor.ethnicity}</td>
                               <td>{mentor.languages}</td>
                               <td>{mentor.university}</td>
                               <td>{mentor.year}</td>
                               <td>{mentor.region}</td>
                               <td>{mentor.monday}</td>
                               <td>{mentor.tuesday}</td>
                               <td>{mentor.wednesday}</td>
                               <td>{mentor.thursday}</td>
                               <td>{mentor.friday}</td>
                               <td>{mentor.prevMentor}</td>
                               <td>{mentor.car}</td>
                               <td>{mentor.multipleDays}</td>
                               <td>{mentor.shirtSize}</td>


                             </tr>

                           </tbody>
                         </table>

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
    // marginLeft: "50vw"
}

const sortBtn = {
    fontSize: "18px",
    fontWeight: "500",
    color: "white",
    backgroundColor: "#49479D",
    borderRadius: "28px",
    height: "46px",
    paddingLeft: "15px",
    paddingRight: "15px",
    marginLeft: "10px",
    marginBottom: "20px",
    width: "300px"

}
