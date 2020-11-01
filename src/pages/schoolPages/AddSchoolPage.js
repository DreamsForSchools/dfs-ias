
import React, {Component} from 'react';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import '../manual.css';

// Page for manually uploading instructors to database. Currently not in use, but is fully functional a definite future implementation into the web app.
class AddSchoolPage extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            address: '', 
            programs: [],
            number_of_instructors: '',
            program_time_flexibility: '',
            special_language_request: [],
            is_virtual: '',
            region: '',
            location_preferences: ''
            




//            name: '',
 //           gender: '',
//            ethnicity: '',
//            region: '',
//            univ: '',
//            year: '',
//            returner: '',
//            car: '',
//            language: '',
//            shirtsize: '',
//            multipledays: '',
//            monday: '',
//           tuesday: '',
//            wednesday: '',
//            thursday: '',
//            friday: '',
//            programs: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    // Alters state when an input field is changed
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Handles the toggle checkbox buttons for programs
    handleCheck(e) {
        if (this.state.programs.includes(e.target.value)) {
            console.log(this.state.programs, e.target.value);
            var idx = this.state.programs.indexOf(e.target.value);
            this.state.programs.splice(idx, 1);
        }
        else {
            this.state.programs.push(e.target.value);
        }
        this.setState({
            [e.target.name]: this.state.programs
        });
    }

    // These functions could definitely be optimized, but I couldn't figure out how to use the time range picker that I installed. These just alter the schedule sections of the state.
    onMonday = monday => {
        this.setState({
            monday
        });
    }

    onTuesday = tuesday => {
        this.setState({
            tuesday
        });
    }

    onWednesday = wednesday => {
        this.setState({
            wednesday
        });
    }

    onThursday = thursday => {
        this.setState({
            thursday
        });
    }

    onFriday = friday => {
        this.setState({
            friday
        });
    }

    // Calls the API with the current state to push data to database and then resets the state.
    handleSubmit(e) {
        e.preventDefault();
        const instructor = {
            "Name": this.state.name,
            "Gender": this.state.gender,
            "Ethnicity": this.state.ethnicity,
            "Region": this.state.region,
            "University": this.state.univ,
            "Year": this.state.year,
            "Virtual": this.state.virtual,
            "PreviousMentor": this.state.returner,
            "Car": this.state.car,
            "Languages": this.state.language,
            "ShirtSize": this.state.shirtsize,
            "MultipleDays": this.state.multipledays,
            "Monday": this.state.monday,
            "Tuesday": this.state.tuesday,
            "Wednesday": this.state.wednesday,
            "Thursday": this.state.thursday,
            "Friday": this.state.friday,
            "Program": this.state.programs,
            "New": false
        }

        console.log(JSON.stringify(instructor));

        fetch('https://apurva29.pythonanywhere.com/uploadinstructors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(instructor)
        })

        this.setState({
            name: '',
            gender: '',
            ethnicity: '',
            region: '',
            univ: '',
            year: '',
            returner: '',
            car: '',
            language: '',
            shirtsize: '',
            multipledays: '',
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            programs: []
        });
    }

    // Routing for the page
    goNext=()=> {
        // this.props.history.push("/schoolhome");
        // console.log(this.props.location.state.isNewRoster)
        this.props.history.push("/"+this.props.location.state.program+"home/roster");
    }

    render() {
        const {value} = this.state;
        return (
            <React.Fragment>
                <div className="app" align="center">
                    <div className="container">
                        <div className="title">
                            <h1>Add New School</h1>
                        </div>
                        <div className="info_container">
                            <section className="column">
                                <form onSubmit={this.handleSubmit}>
                                    <div className = "form-row">
                                        <div className="inputs">
                                            <label>Name</label>
                                            <input type="text" name="univ" placeholder="University of California Irvine" onChange={this.handleChange} value={this.state.name}/>
                                        </div>
                                        <div className="inputs">
                                            <label>Region</label>
                                            <input id="region-input" type="text" name="region" placeholder="Orange County" onChange={this.handleChange} value={this.state.region}/>
                                        </div>
                                        <div className="inputs">
                                            <label>Address</label>
                                            <input id="region-input" type="text" name="region" placeholder="Street address, City, State, Zip" onChange={this.handleChange} value={this.state.address}/>
                                        </div> 
                                        <div className="inputs">
                                        <label>Virtual</label>
                                        <div className = "radio-toolbar">
                                            <input id="yes-virtual-btn" type="radio" name="virtual" value="Yes" checked={value} onChange={this.handleChange}/>
                                                <label for="yes-virtual-btn">Yes</label>
                                            <input id="no-virtual-btn" type="radio" name="virtual" value="No" checked={value} onChange={this.handleChange}/>
                                                <label for="no-virtual-btn">No</label>

                                       </div> 
                                    </div>

                                        <div className="inputs">
                                            <label>Languages</label>
                                            <div className="radio-toolbar">
                                                <input id="1st-year-btn" type="checkbox" name="special_language_request" value="English" checked={value} onChange={this.handleCheck}/>
                                                <label for="1st-year-btn">English</label>
                                                <input id="2nd-year-btn" type="checkbox" name="special_language_request" value="Spanish" checked={value} onChange={this.handleCheck}/>
                                                <label for="2nd-year-btn">Spanish</label>
                                                <input id="3rd-year-btn" type="checkbox" name="special_language_request" value="Mandarin" checked={value} onChange={this.handleCheck}/>
                                                <label for="3rd-year-btn">Mandarin</label>
                                                <input id="4th-year-btn" type="checkbox" name="special_language_request" value="Hindi" checked={value} onChange={this.handleCheck}/>
                                                <label for="4th-year-btn">Hindi</label>
                                                <input id="grad-year-btn" type="checkbox" name="special_language_request" value="French" checked={value} onChange={this.handleCheck}/>
                                                <label for="grad-year-btn">French</label>
                                                <input id="German" type="checkbox" name="special_language_request" value="German" checked={value} onChange={this.handleCheck}/>
                                                <label for="German">German</label>
                                                <input id="Korean" type="checkbox" name="special_language_request" value="Korean" checked={value} onChange={this.handleCheck}/>
                                                <label for="Korean">Korean</label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </section>
                            <section className="column">
                                <form onSubmit={this.handleSubmit}>
                                    <h2>Schedule</h2>
                                    <div className = "form-row">
                                        <div className="inputs">
                                            <label>Monday</label>
                                            <TimeRangePicker
                                                name="monday"
                                                value={this.state.monday}
                                                onChange={this.onMonday}
                                            />
                                        </div>
                                        <div className="inputs">
                                            <label>Tuesday</label>
                                            <TimeRangePicker
                                                name="tuesday"
                                                value={this.state.tuesday}
                                                onChange={this.onTuesday}
                                            />
                                        </div>
                                        <div className="inputs">
                                            <label>Wednesday</label>
                                            <TimeRangePicker
                                                name="wednesday"
                                                value={this.state.wednesday}
                                                onChange={this.onWednesday}
                                            />
                                        </div>
                                        <div className="inputs">
                                            <label>Thursday</label>
                                            <TimeRangePicker
                                                name="thursday"
                                                value={this.state.thursday}
                                                onChange={this.onThursday}
                                            />
                                        </div>
                                        <div className="inputs">
                                            <label>Friday</label>
                                            <TimeRangePicker
                                                name="friday"
                                                value={this.state.friday}
                                                onChange={this.onFriday}
                                            />
                                        </div>
                                        <h2>Other</h2>
                                        <div className="col2-row2">
                                            <div className="inputs">
                                                <label>Previous Mentor</label>
                                                <div className="radio-toolbar">
                                                    <input id="yes-returner-btn" type="radio" name="returner" value="Yes" checked={value} onChange={this.handleChange}/>
                                                    <label for="yes-returner-btn">Yes</label>
                                                    <input id="no-returner-btn" type="radio" name="returner" value="No" checked={value} onChange={this.handleChange}/>
                                                    <label for="no-returner-btn">No</label>
                                                </div>
                                            </div>
                                            <div className="inputs">
                                                <label>Car</label>
                                                <div className="radio-toolbar">
                                                    <input id="yes-car-btn" type="radio" name="car" value="Yes" checked={value} onChange={this.handleChange}/>
                                                    <label for="yes-car-btn">Yes</label>
                                                    <input id="no-car-btn" type="radio" name="car" value="No" checked={value} onChange={this.handleChange}/>
                                                    <label for="no-car-btn">No</label>
                                                </div>
                                            </div>
                                            <div className="inputs">
                                                <label>Multiple Days</label>
                                                <div className="radio-toolbar">
                                                    <input id="yes-multipledays-btn" type="radio" name="multipledays" value="Yes" checked={value} onChange={this.handleChange}/>
                                                    <label for="yes-multipledays-btn">Yes</label>
                                                    <input id="no-multipledays-btn" type="radio" name="multipledays" value="No" checked={value} onChange={this.handleChange}/>
                                                    <label for="no-multipledays-btn">No</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col2-row3">
                                            <div className="inputs">
                                                <label>Shirt Size</label>
                                                <div className="radio-toolbar">
                                                    <input id="S-btn" type="radio" name="shirtsize" value="S" checked={value} onChange={this.handleChange}/>
                                                    <label for="S-btn">S</label>
                                                    <input id="M-btn" type="radio" name="shirtsize" value="M" checked={value} onChange={this.handleChange}/>
                                                    <label for="M-btn">M</label>
                                                    <input id="L-btn" type="radio" name="shirtsize" value="L" checked={value} onChange={this.handleChange}/>
                                                    <label for="L-btn">L</label>
                                                    <input id="XL-btn" type="radio" name="shirtsize" value="XL" checked={value} onChange={this.handleChange}/>
                                                    <label for="XL-btn">XL</label>
                                                    <input id="XXL-btn" type="radio" name="shirtsize" value="XXL" checked={value} onChange={this.handleChange}/>
                                                    <label for="XXL-btn">XXL</label>
                                                </div>
                                            </div>
                                            <div className="inputs">
                                                <label>Program(s)</label>
                                                <div className="radio-toolbar">
                                                    <input id="Sphero-btn" type="checkbox" name="programs" value="SpheroElementary" checked={value} onChange={this.handleCheck}/>
                                                    <label for="Sphero-btn">Sphero</label>
                                                    <input id="appjam-btn" type="checkbox" name="programs" value="AppJam+" checked={value} onChange={this.handleCheck}/>
                                                    <label for="appjam-btn">Appjam+</label>
                                                    <input id="webjam-btn" type="checkbox" name="programs" value="WebJam" checked={value} onChange={this.handleCheck}/>
                                                    <label for="webjam-btn">Webjam</label>
                                                    <input id="webjam-btn" type="checkbox" name="programs" value="WebJam" checked={value} onChange={this.handleCheck}/>
                                                    <label for="webjam-btn">Webjam</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="submitbtn">
                                        Save & Add Another
                                    </button>
                                    <button onClick={this.goNext} className="nextbtn">
                                        Next
                                    </button>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default AddSchoolPage;