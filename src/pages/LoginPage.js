import React from 'react';
import dfs_logo_fullcolor_320x132_google from './../assets/dfs_logo_fullcolor_320x132_google.png';
import fire from '.././config/fire';

// import {useHistory} from 'react-router-dom';


class LoginPage extends React.Component {
  
    
    constructor(props){
        super(props)
        this.state={
            email: "",
            password: "",
            invalidCredentialstyle : {
                invalidEmail: {
                    color: "white",
                    fontSize: 10
                },
                wrongPassword: {
                    color: "white",
                    fontSize: 10,
                },
            }
        }
    }

    componentDidMount(){
        fire.auth().onAuthStateChanged(user => {
            if (user){
                this.props.history.push('/schoolhome');
            }else{
                this.props.history.push('/');
            }
            
          })
    }

    // on change handler for email and password input fields
    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    // what happens when "login" button is clicked
    onSubmit = (e) => {
        e.preventDefault();

        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
            console.log(u);
            this.props.history.push('/schoolhome');
        }).catch((err)=>{
            if (err.code === "auth/invalid-email"){
                console.log("Invalid Email. Please try again.")

                this.setState({
                    invalidCredentialstyle : {
                        invalidEmail: {
                            color: "red",
                            fontSize: 10
                        },
                        wrongPassword: {
                            color: "white",
                            fontSize: 10,
                        },
                    }
                  });

            }else if (err.code === "auth/wrong-password"){
                console.log("Wrong Password. Please try again.")

                this.setState({
                    invalidCredentialstyle : {
                        invalidEmail: {
                            color: "white",
                            fontSize: 10
                        },
                        wrongPassword: {
                            color: "red",
                            fontSize: 10,
                        },
                    }
                  });
            }
        });
    }
  
    render() {
    return (

        <div className = "mainContainer" style = {mainContainerStyle}>
            <div className="flex-container" style = {flexContainerStyle}>
                
                <div style ={iconRow}>

                    <img src={dfs_logo_fullcolor_320x132_google} alt="Logo" style={logoStyle}/>

                </div>

                <form onSubmit = {this.onSubmit} style = {formStyle}>
                    <input 
                        type = "text"
                        name = "email"
                        placeholder = "Email..."
                        style ={usernameRow}
                        value = {this.state.email}
                        onChange = {this.onChange}
                    />

                    <h3 style={this.state.invalidCredentialstyle.invalidEmail}>Invalid Email. Please try again.</h3>

                    <input 
                        type = "password"
                        name = "password"
                        placeholder = "Password..."
                        style ={passwordRow}
                        value = {this.state.password}
                        onChange = {this.onChange}
                    />
                    <h3 style={this.state.invalidCredentialstyle.wrongPassword}>Wrong Password. Please try again.</h3>

                    <input 
                        type = 'submit'
                        value = 'Submit'
                        className = 'button'
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
    fontSize: 12,

}

export default LoginPage;