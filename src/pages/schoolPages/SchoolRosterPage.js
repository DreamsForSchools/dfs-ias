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
    
    return (
        <div>
            <SideNavBar />

            <div className="programPageContainer">
                <h1 className="programPageTitle">school rosters </h1>

                <div className="hozLineDivider"></div>

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


