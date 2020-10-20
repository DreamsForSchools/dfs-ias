import React from 'react'
import dfs_logo_reverse_icon from "../.././assets/dfs_logo_reverse_icon.svg"
import {Link,useHistory} from 'react-router-dom';
import fire from '../.././config/fire';
import { useState, useEffect } from 'react';

/*
    this component is the universal side navigation bar
 */

export default function SideNavBar() {

    //auth variable
    const [user, setUser] = useState(null);
    
    //navigation variable to naviagate to other pages
    let history = useHistory();

    //logs the current user out
    const logout = () => {
        if(user){
            setUser(null); 
            fire.auth().signOut().then(function() {
                console.log('Signed Out');
              }, function(error) {
                console.error('Sign Out Error', error);
              });   
        }
        history.push('/');
    }

    //checks if the user is logged in
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
        <div className="sideNavbarWrapper">
            <nav className="sideNavbar">
                <h3 className="sideNavBarTitle">IAS</h3>

                <ul className="sideNavbarLinks sideNavbarSchool">
                    <Link to="/schoolhome">
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
                                <div className="sideNavbarLink">sphero</div>   
                            </li>
                        </Link>

                        <Link to="/appjamhome">
                            <li>
                                <div className="sideNavbarLink">appjam</div>   
                            </li>
                        </Link>

                        <Link to="/webjamhome">
                            <li>
                                <div className="sideNavbarLink">webjam</div>   
                            </li>
                        </Link>

                    </ul>
                </div>
                
                <ul className="sideNavbarLinks sideNavbarSignOut">
                    
                    {/* <Link to='/'> */}
                        <li>
                            <div> {/* className="sideNavbarLink sideNavbarSignOutLink" */}
                                <button onClick={logout} className="sideNavbarLink sideNavbarSignOutLink">
                                    sign out
                                </button>
                            </div>   
                        </li>
                    {/* </Link> */}
                </ul>

                <img src={dfs_logo_reverse_icon} className="sideNavbarLogo" alt="logo"/>
            </nav>
            
        </div>
    )

}