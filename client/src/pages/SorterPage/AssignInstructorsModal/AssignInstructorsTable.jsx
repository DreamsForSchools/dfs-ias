import React, { useEffect, useState, useContext } from 'react';
import { Table, Badge, OverlayTrigger, Popover } from 'react-bootstrap';

import './AssignInstructorsTable.scss';
import { InstructorsRow } from './AssignInstructorsTableRow';
import { GlobalContext } from '../../../context/GlobalContextProvider';

/**
 * Export this so that 'Class.jsx' can access it to filter instructors.
 */
export let availableInstructorsForTheSelectedSeason = [];

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
        var isAvailable = false;
        instructorAvailabilityArray.forEach((availability) => {
            if (availability.weekday === weekday && availability.startTime <= startTime && availability.endTime >= endTime)
                console.log('true true true')
                isAvailable = true;
                return isAvailable;
        });
        return isAvailable;
    }

    function applyUserSelectedFilters(instructors) {
        console.log(props.filters);

        return instructors.filter((instructor) => { 

            if (
                props.filters.hasCar.length > 0 &&
                !props.filters.hasCar.includes(instructor.hasCar)
            ) {
                return false;
            }
            // return false if does not meet filter requirements for 'isASL'
            if (
                props.filters.isASL.length > 0 &&
                !props.filters.isASL.includes(instructor.isASL)
            ) {
                return false;
            }
            
            // return false if does not meet filter requirements for 'preference'
            let preferences = [
                instructor.firstPref,
                instructor.secondPref,
                instructor.thirdPref,
                instructor.fourthPref,
            ];
            if (
                props.filters.preference.length > 0 &&
                !props.filters.preference.some((pref) =>
                    preferences.includes(pref)
                )
            ) {
                return false;
            }
            // return false if does not meet filter requirements for 'year'
            if (
                props.filters.year.length > 0 &&
                !props.filters.year.includes(instructor.schoolYear)
            ) {
                return false;
            }
        })
    }

    function filterAvailableInstructors() {
        let tempInstructors = Object.values(instructorData);
        const availableInstructors = tempInstructors.filter(function (i) {
            return instructorIsAvailable(
                time.startTime,
                time.endTime,
                time.weekday,
                i.availability
            );
        });
        // TODO: Fix -- 'availableInstructors' is coming out empty after being filtered.
        console.log('available intructors');
        console.log(availableInstructors);
        availableInstructorsForTheSelectedSeason = availableInstructors;

        const filteredInstructors =
            applyUserSelectedFilters(availableInstructors);
        setInstructors(filteredInstructors);
    }

    // console.log('About to print instructor data');
    // console.log(props.instructorData);

    useEffect(() => {
        if (show) {
            // Fetch available instructors only once the modal appears
            filterAvailableInstructors();
        }
    }, [show, instructorData, props.filters]);

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
                    {availableInstructorsForTheSelectedSeason.map((el, idx) => (
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
