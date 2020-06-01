import React from 'react'

import dfs_logo_fullcolor_320x132_google from './../assets/dfs_logo_fullcolor_320x132_google.png';

import { useHistory } from "react-router-dom";
import { useState } from 'react';

import fire from '.././config/fire';

export default function ResetPassword() {

    // const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");

    let history = useHistory();

    //checks if user is currently logged in
    // useEffect(() => {
    //     fire.auth().onAuthStateChanged(user => {
    //         if (user){
    //             setUser(user);
    //         }else{
    //             history.push('/');
    //         }
            
    //       })
    //   });

    // on change handler for email and password input fields
    const onChange = (e) => {
        setEmail(e.target.value);
    };

    //firebase sends a reset password email to the given email
    const onSubmit = (e) => {
        fire.auth().sendPasswordResetEmail(email).then(function() {
            console.log("email sent")
          }).catch(function(error) {
            console.log(error)
          });

        alert("Password Reset Details has been sent to " + email);

        history.push('/');
    }


    return (
        <div className = "mainContainer" style = {mainContainerStyle}>
            <div className="flex-container" style = {flexContainerStyle}>
                
                <div style ={iconRow}>

                    <img src={dfs_logo_fullcolor_320x132_google} alt="Logo" style={logoStyle}/>

                </div>

                <h3 style={enterPassText}>Please enter your email to reset your password</h3>

                <form onSubmit = {onSubmit} style = {formStyle}>
                    <input 
                        type = "text"
                        name = "email"
                        placeholder = "Email..."
                        style ={usernameRow}
                        value = {email}
                        onChange = {onChange}
                    />

                    <input 
                        type = 'submit'
                        value = 'Reset Password'
                        className = 'button'
                        style ={loginBtnRow}
                    />
                </form>

            </div>
        </div>
    )
}


const mainContainerStyle = {
    width: '100vw',
    height: '100vh',
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#CCEAFF'
}

const flexContainerStyle = {
    display: "flex",
    flexDirection: 'column',
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "30%",
    width: "25%",
    borderRadius: "29px"

}

const iconRow = {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // backgroundColor: "red",
    padding: 10,
    margin: 15
}

const logoStyle = {
    width: "40%"
}

const formStyle = {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    width: "60%"
}

const usernameRow = {
    width: "100%",
    // backgroundColor: "yellow",
    margin: 5,
    padding: 10,
    borderColor: "#5B7082",
    borderRadius: 3,
    borderWidth: 0.5,
    fontSize: 12
}


const loginBtnRow = {
    width: "40%",
    // backgroundColor: "green",
    marginTop: 10,
    marginBottom: 10,
    alignItems: "right",
    marginLeft: "auto",
    padding: 8,
    borderRadius: 3,
    borderWidth: 0,
    backgroundColor: "#0099FF",
    color: "#FFFFFF",
    fontSize: 12,

}

const enterPassText = {
    fontSize: "13px",
    fontWeight: "500",
    color: "#5B7082",
    marginBottom: "15px"
}

