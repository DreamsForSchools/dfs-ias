import React, {useEffect, useState, useContext} from 'react';
import { Table, Badge, OverlayTrigger, Popover } from 'react-bootstrap';
import { TelephoneFill, CalendarWeek, X, Check } from 'react-bootstrap-icons';
import { formatAvailability, formatPhoneNumber } from "../../../util/formatData";
import Dot from '../../../design-system/dots';
import './AssignInstructorsTable.scss';
import { createToken } from "../../../fire";

import { GlobalContext}  from "../../../context/GlobalContextProvider";

export let availableInstructorsForTheSelectedSeason = [];

const InstructorsRow = (props) => {

    const {
        programsColorKey,
        onClick,
        instructor        
    } = props;

    const [ activeState, setActiveState] = useState(false);

    // row highlighting
    const {
        firstName,
        lastName,
        gender,
        ethnicity,
        isActive,
        year,
        major,
        otherLanguages,
        programmingLanguages,
        university,
        firstPref,
        secondPref,
        thirdPref,
        fourthPref,
        schoolYear,
        hasCar,
        isASL
    } = instructor;

    useEffect(() => { 
        console.log("Instructor: ");
        console.log(instructor);
    }, [instructor])

    const toggleRowClicked = () => {
        onClick(instructor);
        // setActiveState(true);
        setActiveState(activeState => !activeState);
    }

    return (
        // put onclick funct for the tr
       
        <tr className={`assn-instructor-row${activeState ? '-active' : ''} `}  onClick={toggleRowClicked}>
            <td className={"info-stacks"}>
                <ul>
                <li>{firstName + " " + lastName}</li>
                <li> </li>
                {/* <li> {gender.charAt(0) + ", " + ethnicity} </li> */}
                <li>
                    <div style={{display: "inline-block"}}>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                            <Popover>
                                <Popover.Title as="h3">{`Program Preferences`}</Popover.Title>
                                <Popover.Content>
                                    {
                                        [firstPref, secondPref, thirdPref, fourthPref].map((el, idx) =>
                                            programsColorKey[el] && <h6 key={idx}>
                                                <Dot color={programsColorKey[el]} />
                                                <span style={{
                                                    paddingLeft: 8
                                                }}>{el}</span>
                                            </h6>
                                        )
                                    }
                                </Popover.Content>
                            </Popover>
                        }
                        >
                         <div style={{padding: "0 1rem"}}>
                            {[firstPref, secondPref, thirdPref, fourthPref].map((el, idx) =>
                                programsColorKey[el] && <Dot color={programsColorKey[el]} key={idx}/>
                            )}
                        </div>
                    </OverlayTrigger> 
                    </div>
                </li>
                </ul>
            </td>
            <td className={"info-stacks"}>
                <ul>
                    <li>{university}</li>
                    <li>{schoolYear}</li>
                    <li>{major}</li>
                </ul>
            </td>
            <td>{otherLanguages}</td>
            <td>{programmingLanguages}</td>
            {/* <td >                
                {formatAvailability(instructor.availability).map((e) =>
                    <p key={e}>{e}</p>
                )}
            </td> */}
            <td>
            <div style={{ fontSize: "0.875 rem" }}>
                {
                    hasCar ? 
                    <Badge pill variant="success"> <Check /> Car </Badge> : 
                    <Badge pill variant="danger"> <X /> Car </Badge>
                }
                {
                    isASL ? 
                    <Badge pill variant="success"> <Check /> ASL </Badge> : 
                    <Badge pill variant="danger"> <X /> ASL </Badge>
                }
              </div>
            </td>            
        </tr>
        
        
    )
}



const AssignInstructorsTable = (props) => {

    // Fetch all instructors that have an availibility for this class
    // Iterate through each instructor to calculate distance from the university to the partnerPlaceId (classes don't store location of where they're taught)
    // The 'time' prop is an array of JSON values, where each has 'endTime', 'weekday', and 'startTime' keys

    const {
        show,
        time,
    } = props;

    const {   
        seasonSelected,    
      } = useContext(GlobalContext);

    useEffect(() => { }, [])

    const clickRow = () => {
        console.log("Row clicked");
    }

    const [availableInstructors, setAvailableInstructors] = useState([]);

    async function fetchInstructorById(id) { 
        try { 
            const header = await createToken();
            const request = await axios.post(`/api/instructor/find/${id}`, {}, header);
            return (request.data);
        } catch (e) { return (e); }
    }

    /**
    * Fetches the available instructors on a specified weekday between start and end times. Should be called when presenting the 
    * AssingmentInstructorsTable component.
    * @param {*} dayOfTheWeek Day of the week, represented as a number. 0 - 6 starting with 'Sunday'
    * @param {*} startTime Time, as a string, in the format "HOUR:MINUTES:SECONDS" i.e. 6:00pm is written as "18:00:00"
    * @param {*} endTime Time, as a string, in the format "HOUR:MINUTES:SECONDS" i.e. 6:00pm is written as "18:00:00"
    */
    async function fetchAvailableInstructors(time) { 
        try { 
            const header = await createToken();
            let response = await axios.post('/api/availableInstructors', {
                'seasonSelected': seasonSelected,
                'startTime': time.startTime,
                'endTime': time.endTime,
                'weekday': time.weekday
            }, header);

            // Looks like: {instructorId: 365, startTime: "14:00:00", endTime: "17:00:00", weekday: 1}
            let instructors = response['data']['data'];
            console.log(instructors);

            // Iterate through every item in the `instructors` array and return just the IDs
            const availInstructors = instructors.map(i => { return i.instructorId; });

            
            for (let i = 0; i < availInstructors.length; i++) { 
                availableInstructorsForTheSelectedSeason[i] = await fetchInstructorById(availInstructors[i]);
            }

            setAvailableInstructors(availableInstructorsForTheSelectedSeason);
            console.log("available instructors for the selected season");
            console.log(availableInstructorsForTheSelectedSeason);
        } catch (err) { 
            console.log("Error in fetch: ");
            console.log(err);
        }
    }

    useEffect(() => {
        // Fetch available instructors only once the modal appears
        if (show) {  fetchAvailableInstructors(time); }
      }, [show]);

    const axios = require('axios');

    return (
        <div className="assn-table" >
            {/* <Badge pill variant="success"></Badge> */}
            <Table borderless>
                
        
                <thead className="assn-table-heading">
                <tr>
                    <th className = "nameColumn">Name</th>
                    <th>School</th>
                    <th>Other Languages</th>
                    <th>Programming Languages</th>
                    <th className="sched">Schedule</th>
                    <th>Tags</th>
                </tr>
                </thead>
                <tbody>
                    {/* Loops over 'filteredInstructors' and creates a row for each one */}
                    {availableInstructors.map((el, idx) =>
                    <InstructorsRow programsColorKey={props.programsColorKey} onClick = {clickRow} instructor={el}/>
                    )} 
                    {/* <InstructorsRow
                            key={idx}    
                        /> */}
                </tbody>
            </Table>
        </div>
    )
}

export default AssignInstructorsTable;