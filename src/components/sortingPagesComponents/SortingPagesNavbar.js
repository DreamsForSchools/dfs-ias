import React from 'react'

import {Link,useHistory, useLocation} from 'react-router-dom';
import fire from '../.././config/fire';
import { useState, useEffect } from 'react';


/*
    This component serves as the navbar when a user
    goes to a program's home page and check the existing roster
*/
export default function SortingPagesNavbar({urlPath}) {

    //auth variable
    const [user, setUser] = useState(null);

    //variable for toggling the roster option's style when hovered over
    const [rosterLinkStyle, setRosterLinkStyle] = useState({
        paddingLeft: "50px",
        paddingRight: "50px",
        height: "4vh",
        display: "flex",
        justifyContent: "space-around",
        alignTtems: "center",
    })

     //variable for toggling the sorted roster option's style when hovered over
    const [sortedRosterLinkStyle, setSortedRosterLinkStyle] = useState({
        paddingLeft: "50px",
        paddingRight: "50px",
        height: "4vh",
        display: "flex",
        justifyContent: "space-around",
        alignTtems: "center",
    })

     //variable for toggling the shirt summary option's style when hovered over
    const [shirtLinkStyle, setShirtLinkStyle] = useState({
        paddingLeft: "50px",
        paddingRight: "50px",
        height: "4vh",
        display: "flex",
        justifyContent: "space-around",
        alignTtems: "center",
    })

    console.log(urlPath)

    //navigation variable to naviagate to other pages
    let history = useHistory();

    //variable to find out the page's current url path
    let location = useLocation();
    
    //checks if the user is logged in
    //also checks if the user is either currently on the
    //roster, sortedroster or shirt page and highlights 
    //the corresponding tab in the nav bar
    useEffect(() => {
        fire.auth().onAuthStateChanged(user => {
            if (user){
                setUser(user);
            }else{
                history.push('/');
            }
          });

          console.log(location.pathname)
          if (location.pathname === "/"+urlPath+"home/sortedroster"){
            setSortedRosterLinkStyle({
                backgroundColor: "#9097A3",
                color: "white", 
            });
        }else if (location.pathname === "/"+urlPath+"home/roster"){
            setRosterLinkStyle({
                backgroundColor: "#9097A3",
                color: "white", 
            });
        }else if(location.pathname === "/"+urlPath+"home/shirtsummary"){
            setShirtLinkStyle({
                backgroundColor: "#9097A3",
                color: "white", 
            });
        }
      }, [location.pathname, history]);

    //changes roster tab color when hovered over
    const rosterEnter = () => {
        if (!(location.pathname === "/"+urlPath+"home/roster")){
            setRosterLinkStyle({
                backgroundColor: "#D2D5DA",
                color: "white",
            })
        }
        
    }
    //changes roster tab color back to white when mouse is not hovering over it
    const rosterLeave = () => {
        if (!(location.pathname === "/"+urlPath+"home/roster")){
            setRosterLinkStyle({
                backgroundColor: "white",
                color: "#5B7082",
            })
        }
    }

    //changes sorted roster tab color when hovered over
    const SortedRosterEnter = () => {
        if (!(location.pathname === "/"+urlPath+"home/sortedroster")){
            setSortedRosterLinkStyle({
                backgroundColor: "#D2D5DA",
                color: "white",
            })
        }
    }

    //changes sorted roster tab color back to white when mouse is not hovering over it
    const SortedRosterLeave = () => {
        if (!(location.pathname === "/"+urlPath+"home/sortedroster")){
            setSortedRosterLinkStyle({
                backgroundColor: "white",
                color: "#5B7082",
            })
        }
    }

    //changes shirt tab color when hovered over
    const shirtEnter = () => {
        if (!(location.pathname === "/"+urlPath+"home/shirtsummary")){
            setShirtLinkStyle({
                backgroundColor: "#D2D5DA",
                color: "white",
            })
        }
    }

    //changes shirt tab color back to white when mouse is not hovering over it
    const shirtLeave = () => {
        if (!(location.pathname === "/"+urlPath+"home/shirtsummary")){
            setShirtLinkStyle({
                backgroundColor: "white",
                color: "#5B7082",
            })
        }
    }

    return (
        <div className="sortingPagesNavbarWrapper">
            <nav className="sortingPagesNavbar">
                <ul className="sortingPagesNavbarLinks">
                    <Link to={"/"+urlPath+"home/roster"}>
                        <li onMouseEnter={rosterEnter} onMouseLeave={rosterLeave} style={rosterLinkStyle} className="sortedRosterNavLink" >roster</li>
                    </Link>

                    <Link to={"/"+urlPath+"home/sortedroster"}>
                        <li onMouseEnter={SortedRosterEnter} onMouseLeave={SortedRosterLeave} style={sortedRosterLinkStyle} className="sortedRosterNavLink">sorted roster</li>
                    </Link>

                    <Link to={"/"+urlPath+"home/shirtsummary"}>
                        <li onMouseEnter={shirtEnter} onMouseLeave={shirtLeave} style={shirtLinkStyle} className="sortedRosterNavLink">shirt sizes</li>
                    </Link>
                </ul>
            </nav>
            
        </div>
    )

}