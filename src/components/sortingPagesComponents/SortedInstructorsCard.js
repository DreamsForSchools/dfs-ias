import React from 'react'

import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';

import fire from '../../config/fire';

import userCollection from '../../mockDatabase/MockDatabase';

export default function SortedInstructorsCard() {

    const [user, setUser] = useState(null);
    console.log(userCollection);

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

            <div>
                <h1>Sorted Instructors Card Component</h1> 
                <div className="collapsedCard">

                </div>

            </div> 

        </div>
    )
}