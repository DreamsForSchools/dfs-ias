import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import csv from 'csv';

// For now nothing is routed to the program upload institution pages. There's just one upload institution page from the school home page. This could be implemented if you see it being useful.

// Page for Appjam program for uploading a csv file institution roster
class WebjamUploadInstitutionsPage extends Component {

    // Splits the strings that are read from csv file and returns array with first and third token. Used mainly for the schedule (Monday: 10:00-12:00 returns [10:00, 12:00]
    splitString = (string) => {
        if (string == "") {
            return "";
        }
        else {
            var tokens = string.split(" ");
            return [tokens[0], tokens[2]];
        }
    }

    // Given a program(Appjam, Webjam, Sphero), checks to see if a school for that program has already been uploaded to the database. We do this since we need to change the "New" boolean JSON value for the API to operate properly.
    checkNew = (program, programList) => {
        if (programList.includes(program)) {
            return false;
        }
        else {
            return true;
        }
    }

    // Handles looping through the csv file for the data entries and calling the API to upload to the database
    onDrop(files) {
        this.setState({ files });

        var file = files[0];

        const reader = new FileReader();
        reader.onload = () => {
            csv.parse(reader.result, (err, data) => {

                var programList = [];
                
                const firstInstitution = {"Name": data[1][0], "Address": data[1][1], "Program": [data[1][3]], "County": data[1][2], "Instructors": parseInt(data[1][4]),
                                            "Monday": this.splitString(data[1][5]), "Tuesday": this.splitString(data[1][6]), "Wednesday": this.splitString(data[1][7]),
                                            "Thursday": this.splitString(data[1][8]), "Friday": this.splitString(data[1][9]), "New": true};

                programList.push(data[1][3]);

                fetch('http://apurva29.pythonanywhere.com/uploadinstitutions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(firstInstitution)
                })

                for (var i = 2; i < data.length; i++) {
                    const name = data[i][0];
                    const address = data[i][1];
                    const county = data[i][2];
                    const program = data[i][3];
                    const instructors = data[i][4];
                    const monday = data[i][5];
                    const tuesday = data[i][6];
                    const wednesday = data[i][7];
                    const thursday = data[i][8];
                    const friday = data[i][9];
                    
                    const newInstitution = {"Name": name, "Address": address, "Program": [program], "County" : county, "Instructors": parseInt(instructors), "Monday": this.splitString(monday),
                                            "Tuesday": this.splitString(tuesday), "Wednesday": this.splitString(wednesday), "Thursday": this.splitString(thursday), "Friday": this.splitString(friday), "New": this.checkNew(program, programList)};

                    fetch('http://apurva29.pythonanywhere.com/uploadinstitutions', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newInstitution)
                    })

                    if (programList.includes(program) == false) {
                        programList.push(program);
                    }
                };
            });
        };

        reader.readAsBinaryString(file);
    }

    render() {
        const fontSize = "18px";

        return (
            <div style={mainContainerStyle} align = "center" oncontextmenu="return false">
                <br /><br /><br />
                <div style={dropZoneStyle} className = "dropzone">
                    <h2 style={h2Style}>Please upload your <font size={fontSize} color="#0099FF">CSV </font>institution roster...</h2>
                    <Dropzone accept=".csv" onDropAccepted={this.onDrop.bind(this)} style={dropBoxStyle}>upload new..</Dropzone>
                    <br /><br /><br />
                    <button style={nextButtonStyle}>Next</button>
                </div>
            </div>
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
    width: "30%"
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
    backgroundColor: "#0099FF",
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

export default WebjamUploadInstitutionsPage;