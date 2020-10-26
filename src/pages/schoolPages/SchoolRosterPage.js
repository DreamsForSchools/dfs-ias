import React from 'react'

import SideNavBar from '../.././components/sidebar/SideNavBar';
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import ProgramSchoolRosterTable from '../../components/schoolPagesComponents/ProgramSchoolRosterTable'

import fire from '../.././config/fire';

/*
    This page shows the schools available from each program
    in a table
 */
export default function SchoolRosterPage() {

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
      const addClicked = (e) => {
        // history.push('/appjamhome/sortedroster');
        history.push({
            pathname: "/DeleteSchoolPage",
            state: {isNewRoster: false, program:"sphero"}
        });
    } 
    return (
        <div>
            <SideNavBar />

            <div className="programPageContainer">
                <h1 className="programPageTitle">school rosters </h1>

                <div className="hozLineDivider"></div>

                <div style={buttonContainer}>
                    <div style={sortBtnContainer}>
                        <button onClick={addClicked} style={addBtn}>Delete School</button>
                    </div>
                </div> 
                <ProgramSchoolRosterTable program="AppJam+" databaseName="AppJam+"/>

                <div style={fixMargin}>
                    <ProgramSchoolRosterTable program="Sphero" databaseName="SpheroElementary" />
                </div>

                <div style={fixMargin}>
                    <ProgramSchoolRosterTable program="WebJam" databaseName="WebJam"/>
                </div>

            </div>

        </div>
    )
}

const fixMargin = {
    marginTop: "-380px"
}



const buttonContainer = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
}


const sortBtnContainer = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: "50vw"
}
const addBtn = {
    fontSize: "18px",
    fontWeight: "500",
    color: "#49479D",
    backgroundColor: "white",
    borderRadius: "28px",
    height: "46px",
    paddingLeft: "15px",
    paddingRight: "15px",
    marginLeft: "10px",
    marginBottom: "20px",
    width: "300px",
    border: "1px solid #49479D"
}