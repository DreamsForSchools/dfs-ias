import React from 'react';
import dfs_logo_fullcolor_320x132_google from './../assets/dfs_logo_fullcolor_320x132_google.png'


class Login extends React.Component {
  render() {
    return (
        <div className = "mainContainer" style = {mainContainerStyle}>
            <div className="flex-container" style = {flexContainerStyle}>
                
                <div style ={iconRow}>

                    <img src={dfs_logo_fullcolor_320x132_google} alt="Logo" style={logoStyle}/>

                </div>

                <form style = {formStyle}>
                    <input 
                        type = "text"
                        name = "username"
                        placeholder = "Username..."
                        style ={usernameRow}
                    />

                    <input 
                        type = "text"
                        name = "password"
                        placeholder = "Password..."
                        style ={passwordRow}
                    />

                    <input 
                        type = 'submit'
                        value = 'Submit'
                        className = 'btn'
                        style ={loginBtnRow}
                    />
                </form>

            </div>
        </div>
    )
  }
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
    height: "35%",
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

const passwordRow = {
    width: "100%",
    // backgroundColor: "blue",
    margin: 10,
    padding: 10,
    borderColor: "#5B7082",
    borderRadius: 3,
    borderWidth: 0.5,
    fontSize: 12
}

const loginBtnRow = {
    width: "30%",
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
    fontSize: 12

}

export default Login;