import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {Redirect} from 'react-router-dom';
import csv from 'csv';

class AppjamUploadRosterPage extends Component {
    
    onDrop (files) {
        this.setState({ files });

        var file = files[0];

        const reader = new FileReader();
        reader.onload = () => {
            csv.parse(reader.result, (err, data) => {

                var userList = [];

                for (var i = 1; i < data.length; i++) {
                    const name = data[i][0];
                    const gender = data[i][1];
                    const ethnicity = data[i][2];
                    const region = data[i][3];
                    const university = data[i][4];
                    const year = data[i][5];
                    const returner = data[i][6];
                    const car = data[i][7];
                    const languages = data[i][8];
                    const shirtsize = data[i][9];
                    const multipledays = data[i][10];
                    const Monday = data[i][11];
                    const Tuesday = data[i][12];
                    const Wednesday = data[i][13];
                    const Thursday = data[i][14];
                    const Friday = data[i][15];
                    const newUser = {"Name": name, "Gender": gender, "Ethnicity": ethnicity, "Region": region, "University": university, "Year": year,
                                    "PreviousMentor": returner, "Car": car, "Languages": languages, "ShirtSize": shirtsize,
                                    "MultipleDays": multipledays, "Monday": Monday, "Tuesday": Tuesday, "Wednesday": Wednesday, "Thursday": Thursday, "Friday": Friday};
                    userList.push(newUser);

                    fetch('https://dfs-ias.firebaseio.com/AppJam+/instructors.json', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newUser)
                    })
                };
            });
        };

        reader.readAsBinaryString(file);
    }

    goNext=()=> {
        this.props.history.push("/appjamhome/roster");
    }

    render() {
        const wellStyles = {maxWidth: 400, margin: '0 auto 10px' };
        const fontSize = "18px";

        return (
            <div style={mainContainerStyle} align = "center" oncontextmenu="return false">
                <br /><br /><br />
                <div style={dropZoneStyle} className = "dropzone">
                    <h2 style={h2Style}>Please upload your <font size={fontSize} color="#49479D">CSV </font>roster...</h2>
                    <Dropzone accept=".csv" onDropAccepted={this.onDrop.bind(this)} style={dropBoxStyle}>upload new..</Dropzone>
                    <br /><br /><br />
                    <button onClick={this.goNext} style={nextButtonStyle}>Next</button>
                </div>
            </div>
            // <h1>HELLO WORLD</h1>
        )
    }
}

const mainContainerStyle = {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#D2D5DA",
}

const dropZoneStyle = {
    position: "relative",
    backgroundColor: "white",
    borderRadius: '29px',
    display: "inline-block",
    boxShadow: '0 4px 4px rgba(0,0,0,0.25)',
    top: "25%",
    width: "30%",
}

const dropBoxStyle = {
    width: "40%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "4px",
    borderColor: "#9097A3",
    fontFamily: "Rubik",
    color: "#5B7082",
    cursor: "pointer",
    marginTop: "40px",
    paddingTop: "8px",
    paddingBottom: "8px"
}

const h2Style = {
    fontFamily: "Rubik",
    fontWeight: "normal",
    fontStyle: "normal",
    fontSize: "18px",
    lineHeight: "21px",
    paddingTop: "50px"
}

const nextButtonStyle = {
    backgroundColor: "#49479D",
    border: "none",
    color: "white",
    fontFamily: "Rubik",
    fontSize: "1vw",
    paddingLeft: "50px",
    paddingRight: "50px",
    paddingTop: "10px",
    paddingBottom: "10px",
    position: "relative",
    left: "120px",
    bottom: "10px",
    borderRadius: "3px",
    marginBottom: "45px",
    cursor: "pointer"
}

export default AppjamUploadRosterPage;