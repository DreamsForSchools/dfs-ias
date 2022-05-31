import React, { useState, useContext, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './Section.scss';
import Instructor from '../Instructor.jsx';
import { CalendarWeek, People, PencilSquare } from 'react-bootstrap-icons';
import { formatAvailability } from '../../../util/formatData';
import { Button, Modal, Form, FormControl, InputGroup } from 'react-bootstrap';
import { GlobalContext } from '../../../context/GlobalContextProvider';
import AssignInstructorsTable from '../AssignInstructorsModal/AssignInstructorsTable';
import '../../ClassesPartnersPage/OptionsBar.scss';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { MDBCol } from 'mdbreact';
import { toast } from 'react-toastify';
import axios from 'axios';
import { createToken } from '../../../fire';
import ReactDOM from 'react-dom';
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

const Section = ({
    id,
    partner,
    time,
    instructorsNeeded,
    instructors,
    programId,
    state,
    parentLockStatus,
}) => {
    const { seasonSelected, programColorMap } = useContext(GlobalContext);
    const [numInstructors, setNumInstructors] = useState(0);
    const [lock, setLock] = useState(false);
    const [assignPopup, setAssignPopup] = useState(false);
    const availability = [
        { value: 1, label: 'Monday' },
        { value: 2, label: 'Tuesday' },
        { value: 3, label: 'Wednesday' },
        { value: 4, label: 'Thursday' },
        { value: 5, label: 'Friday' },
    ];
    const preference = [
        { value: 'Mobile App Development (AppJam+)', label: 'AppJam' },
        { value: 'Website Development', label: 'WebJam' },
        { value: "Let's Explore STEM", label: 'LESTEM' },
        { value: 'Coding Games with Scratch', label: 'Scratch' },
        { value: 'Engineering Inventors', label: 'Engineering Inventors' },
    ];
    const year = [
        { value: '1st', label: '1st' },
        { value: '2nd', label: '2nd' },
        { value: '3rd', label: '3rd' },
        { value: '4th+', label: '4th+' },
        { value: 'Graduate', label: 'Graduate' },
    ];
    const hasCar = [
        { value: 0, label: 'No Car' },
        { value: 1, label: 'Car' },
    ];
    const isASL = [
        { value: 0, label: 'Does not know ASL' },
        { value: 1, label: 'Knows ASL' },
    ];
    const initialCheckedItems = {
        // hasCar: [0, 1],
        // availability: [],
        // preference: ["Mobile App Development (AppJam+)", "Website Development", "Let's Explore STEM", "Coding Games with Scratch","Engineering Inventors"],
        // year: ["1st","2nd","3rd", "4th+","Graduate"],
        // isASL: [0, 1]
        name: '',
        hasCar: [0, 1],
        preference: [],
        year: [],
        isASL: [0, 1],
    };
    const [filters, setFilters] = useState(Object.assign({}, initialCheckedItems));
    const [showFilter, setShowFilter] = useState(false);
    const [checkedItems, setCheckedItems] = useState(Object.assign({}, initialCheckedItems));
    const [searchText, setSearchText] = useState("");
    const handleLock = () => {
        setLock(true);
    };
    const handleUnlock = () => {
        setLock(false);
    };

    const handleCloseFilter = () => setShowFilter(false);
    useEffect(() => {
        const { name, hasCar, preference, year, isASL } = filters;
        setCheckedItems({
            name: name,
            hasCar: [...hasCar],
            preference: [...preference],
            year: [...year],
            isASL: [...isASL],
        });
    }, [showFilter]);

    useEffect(() => { 
        if (!instructors) { return; }
        const instructorIds = instructors.map((i) => { 
            return i.instructorId
        })
        setSelectedInstructors(instructorIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [instructors])

    const handleApplyFilters = (checkedItems) => {
        const { name, hasCar, preference, year, isASL } = checkedItems;
        setFilters({
            name: name,
            hasCar: [...hasCar],
            preference: [...preference],
            year: [...year],
            isASL: [...isASL],
        });
        setShowFilter(false);
    };

    useEffect(() => {
        let val = true;
        if (instructors) {
            for (const instructor of instructors) {
                if (!state['lockedInstructors'].includes(instructor.instructorId)) {
                    val = false;
                }
            }
        }
        let count = instructors ? instructors.length : 0;
        setNumInstructors(count);
        if (count === 0) {
            setLock(false);
        } else if (parentLockStatus === true || val) {
            setLock(true);
        } else {
            setLock(false);
        }
        resetFilters();
    }, [parentLockStatus, setNumInstructors, instructors]);

    const resetFilters = () => {
        setCheckedItems(Object.assign({}, initialCheckedItems));
        handleApplyFilters(Object.assign({}, initialCheckedItems));
    };

    const handleSearchChange = e => {
        const value = e.target.value;
        setSearchText(value);
        setCheckedItems({...filters, name: value});
    }

    /**
     * 
     * @param {*} e Object that contains 'name'
     * @param {*} value Filter category
     */
    const handleCheckboxChange = (e, value) => {
        const name = e.target.name;
        let checkedValue;
        // if 'hasCar' or 'isASL'
        if (name == 'hasCar' || name == 'isASL') {
            let boxValue = e.target.checked;
            // if checkbox is checked
            if (boxValue) {
                checkedItems[name] = [1];
                checkedValue = checkedItems[name];
            } else {
                checkedItems[name] = [0, 1];
                checkedValue = checkedItems[name];
            }
        }
        // if 'year' or 'preference'
        else {
            const valIndex = checkedItems[name].indexOf(value);
            if (valIndex >= 0) {
                // Filter is being removed
                checkedItems[name].splice(valIndex, 1);
                checkedValue = checkedItems[name];
            } else {
                // Filter is being added
                checkedValue = [...checkedItems[name], value];
            }
        }
        setCheckedItems({ ...checkedItems, [name]: checkedValue });
    };
    const assignToggle = () => {
        setAssignPopup(true);
    };

    // A queue of operations that need to be executed when the confirm button is pressed.
    const [ operationQueue, setOperationQueue] = useState([]);

    const [selectedInstructors, setSelectedInstructors] = useState([]);
    /**
     * Saves selected instructors from the `AssignInstructorsTable` component to the `seasonAssignments` table.
     */
    async function saveInstructorAssignments() {
        for (const o of operationQueue) { 
            try {
                const header = await createToken();
                if (o.route === 'assign') { 
                    await axios.post(
                        '/api/assign',
                        {
                            seasonId: seasonSelected.seasonId,
                            instructorId: o.instructorId,
                            classId: id,
                        },
                        header
                    );
                } else if (o.route === 'unassign') { 
                    await axios.post(
                        '/api/unassign',
                        {
                            seasonId: seasonSelected.seasonId,
                            instructorId: o.instructorId,
                            classId: id,
                        },
                        header
                    );
                } else { 
                    console.log(`Unknown operation: ${o}`)
                }
            } catch (e) {
                console.log(e);
                toast(`❌ ${e}`);
            }
        }
        toast(`👍 Instructor assignments successfully updated.`);
    }

    return (
        <div className="section">
            <div className="header">
                <h1 className="partner-name">{partner}</h1>
                {/*<div className="lock" onClick={() => { setLock(!lock) }}>*/}
                {/*    {lock ? <LockFill onClick={handleUnlock} className="icon" size={18}/> :*/}
                {/*        <UnlockFill onClick={handleLock} className="icon" size={18}/>}*/}
                {/*</div>*/}
            </div>
            <div className="section-info">
                <div>
                    <CalendarWeek /> {formatAvailability(time)}{' '}
                </div>
                <div>
                    <People /> {numInstructors}/{instructorsNeeded}
                </div>
            </div>
            {/* implementing for the modal pop up */}
            <div className="assign-modal-btns">
                <Button
                    size="md"
                    style={{ marginRight: '0.5rem' }}
                    onClick={assignToggle}
                    data-testid="assignToProgram">
                    Assign Instructors
                    <span style={{ marginLeft: '0.5rem' }}>
                        <PencilSquare />
                    </span>
                </Button>
            </div>
            <Droppable
                droppableId={programId + '-' + partner + '-' + id}
                type="INSTRUCTOR">
                {(provided) => {
                    return (
                        <div
                            className={'spacer'}
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            {/* This is the assignment of instructors to program space. */}
                            {instructors?.map((instructor, index) => {
                                return (
                                    <Draggable
                                        key={instructor.instructorId}
                                        draggableId={instructor.instructorId.toString()}
                                        index={index}
                                        isDragDisabled={state[
                                            'lockedInstructors'
                                        ].includes(instructor.instructorId)}>
                                        {(provided) => {
                                            return (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>
                                                    <Instructor
                                                        key={
                                                            instructor.instructorId
                                                        }
                                                        instructor={instructor}
                                                        sectionId={id}
                                                        state={state}
                                                        parentLockStatus={lock}
                                                    />
                                                </div>
                                            );
                                        }}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    );
                }}
            </Droppable>
            <Modal
                size="xl"
                show={assignPopup}
                onHide={() => { setAssignPopup(false); setSearchText(""); resetFilters();}}
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="modal-90w"
                centered>
                <Modal.Header
                    closeButton
                    style={{ padding: '2rem 3rem 0 3rem', border: '0' }}>
                    <Modal.Title>Assign Instructors</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: '1rem 3rem' }}>
                    <div style={{ padding: 5, justifyContent: 'flex-end' }}>
                        <h5>{partner}</h5>
                        <h10>
                            <CalendarWeek /> {formatAvailability(time)}{' '}
                        </h10>
                        <h11 style={{ float: 'right' }}>
                            <People /> {numInstructors}/{instructorsNeeded}{' '}
                        </h11>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            padding: 0,
                            justifyContent: 'center',
                        }}>
                        <div
                            style={{
                                padding: 5,
                                justifyContent: 'flex-end',
                                border: '5px',
                                width: '40%',
                            }}>
                            <MDBCol md="40">
                            <InputGroup>
                                    <FormControl
                                        placeholder="🔍 Search Instructors..."
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                        value={searchText}
                                        onChange={handleSearchChange}
                                        />
                                </InputGroup>
                            </MDBCol>
                        </div>

                        <div
                            style={{
                                padding: 5,
                                justifyContent: 'flex-end',
                                border: '5px ',
                            }}>
                                <div class="dropdown">
                                <Button variant="light" class="dropbtn">
                                    {' '}
                                    Car
                                </Button>
                                <div class="dropdown-content">
                                    <Form.Check
                                        type="checkbox"
                                        label=" Owns a Car"
                                        name="hasCar"
                                        onChange={(e) => {
                                            handleCheckboxChange(e, 'hasCar');
                                        }}
                                        checked={checkedItems.hasCar.length == 1}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                padding: 5,
                                justifyContent: 'flex-end',
                                border: '5px',
                            }}>
                                <div class="dropdown">
                                <Button variant="light" class="dropbtn">
                                    {' '}
                                    ASL
                                </Button>
                                <div class="dropdown-content">
                                    <Form.Check
                                        type="checkbox"
                                        label=" Knows ASL"
                                        name="isASL"
                                        onChange={(e) => {
                                            handleCheckboxChange(e, 'isASL');
                                        }}
                                        checked={checkedItems.isASL.length == 1}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                padding: 5,
                                justifyContent: 'flex-end',
                                border: '5px',
                            }}>
                                <div class="dropdown">
                                <Button variant="light" class="dropbtn">
                                    {' '}
                                    Year
                                </Button>
                                <div class="dropdown-content">
                                    <Form.Group className="filter-group">
                                        {year.map((year) => (
                                            <Form.Check
                                                key={year.value}
                                                type="checkbox"
                                                label={year.label}
                                                name="year"
                                                onChange={(e) =>
                                                    handleCheckboxChange(
                                                        e,
                                                        year.value
                                                    )
                                                }
                                                checked={checkedItems.year.includes(
                                                    year.value
                                                )}
                                            />
                                        ))}
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                padding: 5,
                                justifyContent: 'flex-end',
                                border: '5px',
                            }}>
                                <div class="dropdown">
                                <Button variant="light" class="dropbtn">
                                    {' '}
                                    Preference
                                </Button>
                                <div class="dropdown-content">
                                    <Form.Group className="filter-group">
                                        {preference.map((pref) => (
                                            <Form.Check
                                                key={pref.value}
                                                type="checkbox"
                                                label={pref.label}
                                                name="preference"
                                                onChange={(e) =>
                                                    handleCheckboxChange(
                                                        e,
                                                        pref.value
                                                    )
                                                }
                                                checked={checkedItems.preference.includes(
                                                    pref.value
                                                )}
                                            />
                                        ))}
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                padding: 5,
                                justifyContent: 'flex-end',
                                border: '5px',
                            }}>
                            <Button
                                variant="outline-primary"
                                onClick={resetFilters}>
                                Reset Filters
                            </Button>
                        </div>
                        </div>

                    <AssignInstructorsTable
                        show={assignPopup}
                        time={time[0]}
                        programsColorKey={programColorMap}
                        operationQueue={operationQueue}
                        selectedInstructors={selectedInstructors}
                        // seasonSelected={seasonSelected}
                        filters={checkedItems}
                    />
                </Modal.Body>
                <Modal.Footer style={{ border: '0' }}>
                    <Button
                        variant="outline-danger"
                        onClick={() => { setAssignPopup(false); resetFilters();}}>
                        Cancel
                    </Button>
                    <Button
                        variant="success"
                        onClick={saveInstructorAssignments}>
                            Confirm Instructor Selections
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default Section;