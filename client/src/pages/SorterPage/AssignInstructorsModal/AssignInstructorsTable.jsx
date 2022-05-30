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
    /**
     * @param {*} show Boolean value that tracks whether this modal is shown or not
     * @param {*} time The time the section takes place
     * @param {*} programsColorKey Check GlobalContext
     * @param {*} operationQueue A queue of database queries that will be executed once the confirm button is pressed.
     * @param {*} selectedInstructors Instructors that are already set in the database. This shouldn't be edited here.
     */
    const {
        show,
        time,
        programsColorKey,
        operationQueue,
        selectedInstructors,
    } = props;

    const { seasonSelected, instructorData } = useContext(GlobalContext);
    const [instructors, setInstructors] = useState([]);

    function instructorIsAvailable(
        startTime,
        endTime,
        weekday,
        instructorAvailabilityArray
    ) {
        var isAvailable = false;
        instructorAvailabilityArray.forEach((availability) => {
            if (
                availability.weekday === weekday &&
                availability.startTime <= startTime &&
                availability.endTime >= endTime
            )
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
        });
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
     * Adds an assign / unassign query operation to the `operationQueue`. Operations will be called in `Section.jsx`
     * @param {*} e The instructor being added / removed
     */
    const toggleSelectedInstructor = (e) => {
        const instructorId = e.instructorId;
        if (selectedInstructors.includes(instructorId)) { 
            operationQueue.push({route: 'unassign', instructorId: instructorId})
        } else { 
            operationQueue.push({route: 'assign', instructorId: instructorId})
        }
    };

    function isSelected(instructorId) { 
        return selectedInstructors.includes(instructorId);
    }

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
                            isSelected={isSelected(el.instructorId)}
                            instructor={el}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AssignInstructorsTable;
