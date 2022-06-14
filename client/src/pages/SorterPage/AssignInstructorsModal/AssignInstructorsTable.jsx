import React, { useEffect, useState, useContext } from 'react';
import { Table, Badge, OverlayTrigger, Popover } from 'react-bootstrap';
import './AssignInstructorsTable.scss';
import { InstructorsRow } from './AssignInstructorsTableRow';
import { GlobalContext } from '../../../context/GlobalContextProvider';

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
    // Fetch all instructors that have an availibility for this class
    // Iterate through each instructor to calculate distance from the university to the partnerPlaceId (classes don't store location of where they're taught)
    // The 'time' prop is an array of JSON values, where each has 'endTime', 'weekday', and 'startTime' keys


    const { seasonSelected, instructorData } = useContext(GlobalContext);
    const [instructors, setInstructors] = useState([]);
    const [tempSelectedInstructors, setTempSelectedInstructors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(4);

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
        console.log("FILTER")
        console.log(props.filters);

        return instructors.filter((instructor) => {
            if (props.filters.name) {
                const formattedText = props.filters.name.toLowerCase();
                const fullName = instructor.firstName + " " + instructor.lastName;
                if (!fullName.toLowerCase().includes(formattedText)) {
                    return false;
                }
            }
            if (props.filters.hasCar.length > 0 && !props.filters.hasCar.includes(instructor.hasCar)) {
                return false;
            }
            // return false if does not meet filter requirements for 'isASL'
            if (props.filters.isASL.length > 0 && !props.filters.isASL.includes(instructor.isASL)) {
                return false;
            }
            // return false if does not meet filter requirements for 'preference'
            let preferences = [instructor.firstPref, instructor.secondPref, instructor.thirdPref, instructor.fourthPref];
            if (props.filters.preference.length > 0 && !props.filters.preference.some((pref) => preferences.includes(pref))) {
                return false;
            }
            // return false if does not meet filter requirements for 'year'
            if (props.filters.year.length > 0 && !props.filters.year.includes(instructor.schoolYear)) {
                return false;
            }
            return true;
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
        const filteredInstructors = applyUserSelectedFilters(availableInstructors);
        setInstructors(filteredInstructors);
    }

    function isSelected(instructorId) { 
        return selectedInstructors.includes(instructorId);
    }

    /**
     * Adds an assign / unassign query operation to the `operationQueue`. Operations will be called in `Section.jsx`
     * @param {*} e The instructor being added / removed
     */
    const toggleSelectedInstructor = (e) => {
        const instructorId = e.instructorId;
        if (selectedInstructors.includes(instructorId)) { 
            operationQueue.push({route: 'unassign', instructorId: instructorId})
        } 
        else { 
            operationQueue.push({route: 'assign', instructorId: instructorId})
        }
        // let selected_idx = tempSelectedInstructors.indexOf(instructorId);

        // if (selected_idx > -1) {
        if(tempSelectedInstructors.includes(instructorId)){
            console.log("removing " + instructorId)
            let selected_idx = tempSelectedInstructors.indexOf(instructorId);
            
            tempSelectedInstructors.splice(selected_idx, 1); // 2nd parameter means remove one item only
            setTempSelectedInstructors(tempSelectedInstructors);
            console.log("new state: "+ tempSelectedInstructors);
        }       
        else { 
            console.log("adding " + instructorId)
            // using splice to add
            tempSelectedInstructors.push(instructorId);
            setTempSelectedInstructors(tempSelectedInstructors);

            console.log("new state: "+ tempSelectedInstructors);
        }
    };

    // function isSelected(instructorId) { 
    //     return selectedInstructors.includes(instructorId);
    // }

    // console.log('About to print instructor data');
    // console.log(props.instructorData);

    useEffect(() => {
        if (show) {
            // Fetch available instructors only once the modal appears
            filterAvailableInstructors();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show, instructorData, props.filters]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // gets N number of instructors per page
    const currentPosts = instructors.slice(indexOfFirstPost, indexOfLastPost);
    
    const pages = [];
    //if index is less than or equal to total post/post per page (round up ceiling)
    for(let i = 1; i <= Math.ceil(instructors.length / postsPerPage); i++) {
       pages.push(i);
    }
    
    const paginate = (page) => setCurrentPage(page)
    
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
                    {currentPosts.map((el, idx) => (
                        <InstructorsRow
                            programsColorKey={programsColorKey}
                            onClick={toggleSelectedInstructor}
                            isSelected={isSelected(el.instructorId)}
                            instructor={el}
                            key={idx} 
                            tempSelectedInstructors = {tempSelectedInstructors}
                        />
                    ))}
                </tbody>
            </Table>
            <div>
                <nav>
                    <ul className = "pagination">
                        {pages.map(number => (
                            <li key={number} className = "page-item">
                                <a onClick={() => paginate(number)} className="page-link">
                                    {number}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default AssignInstructorsTable;