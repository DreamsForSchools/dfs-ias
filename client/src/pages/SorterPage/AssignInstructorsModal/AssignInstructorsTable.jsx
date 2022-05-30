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

    const { show, time, programsColorKey, selectedInstructors } = props;

    const { seasonSelected, instructorData } = useContext(GlobalContext);
    const [ instructors, setInstructors ] = useState([]);

    function instructorIsAvailable(startTime, endTime, weekday, instructorAvailabilityArray) {
        var isAvailable = false;
        instructorAvailabilityArray.forEach((availability) => {
            if (availability.weekday === weekday && availability.startTime <= startTime && availability.endTime >= endTime)
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
        setInstructors(availableInstructors);
    }

    /**
     * Adds or removes an instructor depending on whether they've already been selected
     * @param {*} e The instructor being added / removed
     */
    const toggleSelectedInstructor = (e) => {
        if (selectedInstructors.includes(e)) {
            const index = selectedInstructors.indexOf(e);
            selectedInstructors.splice(index, 1)
        } else { 
            selectedInstructors.push(e);
        }
    };

    useEffect(() => {
        if (show) {
            // Fetch available instructors only once the modal appears
            filterAvailableInstructors();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

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
                            programsColorKey={programsColorKey}
                            onClick={toggleSelectedInstructor}
                            instructor={el}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AssignInstructorsTable;
