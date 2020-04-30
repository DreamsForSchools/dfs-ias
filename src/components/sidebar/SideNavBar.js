import React from 'react'
import dfs_logo_reverse_icon from "../.././assets/dfs_logo_reverse_icon.svg"
import {Link} from 'react-router-dom';

export default function SideNavBar() {
    return (
        <div className="sideNavbarWrapper">
            <nav className="sideNavbar">
                <h3 className="sideNavBarTitle">IAS</h3>

                <ul className="sideNavbarLinks sideNavbarSchool">
                    <Link to="/">
                        <li>
                            <div className="sideNavbarLink">school</div>   
                        </li>
                    </Link>

                </ul>

                <div className="sideNavbarPrograms">

                    <h6 className="sideNavbarProgramsLabel">PROGRAMS</h6>
                    
                    <ul className="sideNavbarLinks">
                        <Link to="/spherohome">
                            <li>
                                <div className="sideNavbarLink sideNavbarLinkAppjam">sphero</div>   
                            </li>
                        </Link>

                        <Link to="/appjamhome">
                            <li>
                                <div className="sideNavbarLink sideNavbarLinkAppjam">appjam</div>   
                            </li>
                        </Link>

                        <Link to="/webjamhome">
                            <li>
                                <div className="sideNavbarLink sideNavbarLinkAppjam">webjam</div>   
                            </li>
                        </Link>

                    </ul>
                </div>
                
                <ul className="sideNavbarLinks sideNavbarSignOut">
                    
                    <Link to="/login">
                        <li>
                            <div className="sideNavbarLink sideNavbarSignOutLink">sign out</div>   
                        </li>
                    </Link>
                </ul>

                <img src={dfs_logo_reverse_icon} className="sideNavbarLogo" alt="logo"/>
            </nav>
            
        </div>
    )
}