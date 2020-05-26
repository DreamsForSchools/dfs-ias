import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import csv from 'csv';
import fire from '../config/fire';

class UploadInstitutionsPage extends Component {
    
    onDrop(files) {
        this.setState({ files });

        var file = files[0];

        const reader = new FileReader();
        reader.onload = () => {
            csv.parse(reader.result, (err, data) => {

                for (var i = 1; i < data.length; i++) {
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
                    
                    const newInstitution = {"Address": address, "Program": program, "County" : county, "Instructors": instructors, "Monday": monday, "Tuesday": tuesday, "Wednesday": wednesday, "Thursday": thursday, "Friday": friday};
                    fire.database().ref("Institutions").set(name);
                    fire.database().ref("Institutions/"+name).set(newInstitution);
                };
            });
        };

        reader.readAsBinaryString(file);
    }

    goNext=()=> {
        this.props.history.push("/template");
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
                    <button onClick={this.goNext} style={nextButtonStyle}>Next</button>
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

export default UploadInstitutionsPage;