import React, { useEffect, useState, useContext } from 'react';
import { Table, Badge, OverlayTrigger, Popover } from 'react-bootstrap';
import { TelephoneFill, CalendarWeek, X, Check } from 'react-bootstrap-icons';
import {
    formatAvailability,
    formatPhoneNumber,
} from '../../../util/formatData';

import './AssignInstructorsTable.scss';
import { InstructorsRow } from '../AssignInstructorsModal/AssignInstructorsTableRow';
import { createToken } from '../../../fire';
import { GlobalContext } from '../../../context/GlobalContextProvider';

const AssignInstructorsTable = (props) => {
    // Fetch all instructors that have an availibility for this class
    // Iterate through each instructor to calculate distance from the university to the partnerPlaceId (classes don't store location of where they're taught)
    // The 'time' prop is an array of JSON values, where each has 'endTime', 'weekday', and 'startTime' keys

    // TODO: Enable pagination

    const { show, time } = props;

    const { seasonSelected, instructorData } = useContext(GlobalContext);
    const [instructors, setInstructors] = useState([]);

    const clickRow = () => {
        console.log('Row clicked');
    };

    function instructorIsAvailable(startTime, endTime, weekday, instructorAvailabilityArray) { 
        let isAvailable = false;
        instructorAvailabilityArray.forEach((availability) => { 
            if (availability.weekday == weekday && availability.startTime <= startTime && availability.endTime >= endTime)
                isAvailable = true;
        })
        return isAvailable;
    }

    function filterAvailableInstructors() {
        let tempInstructors = Object.values(instructorData);
        const d = tempInstructors.filter(function(i) { return instructorIsAvailable(time.startTime, time.endTime, time.weekday, i.availability); });
        console.log(d);
        setInstructors(d);
    }

    // console.log('About to print instructor data');
    // console.log(props.instructorData);

    useEffect(() => {
        
        // Fetch available instructors only once the modal appears
        if (show) {
            // fetchAvailableInstructors(time);
            filterAvailableInstructors();
        }
    }, [show, instructorData]);

    const axios = require('axios');

    return (
        <div className="assn-table">
            {/* <Badge pill variant="success"></Badge> */}
            <Table borderless>
                <thead className="assn-table-heading">
                    <tr>
                        <th className="nameColumn">Name</th>
                        <th>School</th>
                        <th>Other Languages</th>
                        <th>Programming Languages</th>
                        <th className="sched">Schedule</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                <tbody>
                    {instructors.map((el, idx) => (
                        <InstructorsRow
                            programsColorKey={props.programsColorKey}
                            onClick={clickRow}
                            instructor={el}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AssignInstructorsTable;
