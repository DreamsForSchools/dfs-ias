import React from 'react'
import add from '.././assets/add.svg'

import SideNavBar from '../components/sidebar/SideNavBar';
import { useHistory } from "react-router-dom";

export default function TemplatePage() {


    return (
        <div>
            <SideNavBar />

            <div className="programPageContainer">
                <h1 className="programPageTitle">template page</h1>

                <div className="hozLineDivider"></div>

            </div>

        </div>
    )
}