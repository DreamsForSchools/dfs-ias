import React, {Component} from 'react';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import '../manual.css';

//page for deleting the school

class DeleteSchoolPage extends Component {
    constructor() {
        super();

        this.state = {
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
        const delete_this_school = {
            "School": this.state.school,
            "Region": this.state.region,
        }

        console.log(JSON.stringify(delete_this_school));

        fetch('127.0.0.1:5000/deleteschool', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(delete_this_school)
        })

        this.setState({
            school: '',
            region: '',
        });
    }

    // Routing for the page
    goBack=()=> {
        // this.props.history.push("/schoolhome");
        // console.log(this.props.location.state.isNewRoster)
        this.props.history.push("/schoolhome/roster");
    }

    render() {
        const {value} = this.state;
        return (
            <React.Fragment>
                <div className="app" align="center">
                    <div className="container">
                        <div className="title">
                            <h1>Delete School</h1>
                        </div>
                        <div className="info_container">
                            <section className="column">
                                <form onSubmit={this.handleSubmit}>
                                    <div className = "form-row">
                                        
                                        <h2>School</h2>
                                    
                                        <div className="inputs">
                                            <label>Name</label>
                                            <input type="text" name="school" placeholder="University of California Irvine"onChange={this.handleChange} value={this.state.school}/>
                                        </div>
                                        <div className="inputs">
                                            <label>Region</label>
                                            <input id="region-input" type="text" name="region" placeholder="Orange County"onChange={this.handleChange} value={this.state.region}/>
                                        </div>
                                     
                                    </div>
                                    <button type="submit" className="deletebtn">
                                        Delete School 
                                    </button>
                                    <button onClick={this.goBack} className="nextbtn">
                                        Back
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

export default DeleteSchoolPage;