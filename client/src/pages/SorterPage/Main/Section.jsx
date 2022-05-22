import React, { useState, useContext, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './Section.scss';
import Instructor from '../Instructor.jsx';
import {
    CalendarWeek,
    People,
    PencilSquare,
} from 'react-bootstrap-icons';
import { formatAvailability } from '../../../util/formatData';
import { Button, Modal, Form } from 'react-bootstrap';
import { GlobalContext } from '../../../context/GlobalContextProvider';
import AssignInstructorsTable, {
    availableInstructorsForTheSelectedSeason,
} from '../AssignInstructorsModal/AssignInstructorsTable';
import '../../ClassesPartnersPage/OptionsBar.scss';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { MDBCol } from 'mdbreact';
import ReactDOM from 'react-dom';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

const Section = ({
    id,
    partner,
    time,
    instructorsNeeded,
    instructors,
    programId,
    state,
    parentLockStatus,
    seasonSelected
}) => {
    const { programColorMap } = useContext(GlobalContext);

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
        hasCar: [],
        preference: [],
        year: [],
        isASL: [],
    };
    const [filters, setFilters] = useState(
        Object.assign({}, initialCheckedItems)
    );
    const [showFilter, setShowFilter] = useState(false);
    const [filteredInstructors, setFilteredInstructors] = useState([
        ...Object.values(availableInstructorsForTheSelectedSeason),
    ]);
    const [checkedItems, setCheckedItems] = useState(
        Object.assign({}, initialCheckedItems)
    );
    const handleLock = () => {
        setLock(true);
    };
    const handleUnlock = () => {
        setLock(false);
    };

    const handleCloseFilter = () => setShowFilter(false);
    /*
    const handleApplyFilters = (checkedItems) => {
      const { car, availability, preference, year, asl } = checkedItems;
      console.log(checkedItems);
      setFilters({
          name: filters.name,
          car: [...car],
          availability: [...availability],
          preference: [...preference],
          year: [...year],
          asl: [...asl],
      });
      handleCloseFilter();
  }
  */
    //useEffect is for filtering /

    // useEffect(() => {
    //   //{ car: [], availability: [], preference: [], year: [], asl: [] };
    //   for (const i in instructors)
    //   {
    //     let preferences = [instructors[i].firstPref, instructors[i].secondPref,instructors[i].thirdPref,instructors[i].fourthPref];
    //     if (checkedItems.car.includes(instructors[i].hasCar))
    //     {
    //       //they dont have a car
    //       console.log(instructors[i].firstName + " matches car criteria");
    //     }
    //     else if (checkedItems.asl.includes(instructors[i].isASL))
    //     {
    //       console.log(instructors[i].firstName + " matches ASL criteria");
    //     }
    //     else  if (checkedItems.preference.some(pref => preferences.includes(pref)))
    //     {
    //       console.log(instructors[i].firstName + " matches Preference criteria");

    //     }
    //     else if (checkedItems.year.includes(instructors[i].schoolYear))
    //     {
    //       console.log(instructors[i].firstName + " matches school year criteria");

    //     }
    //     else{
    //       console.log(instructors[i].firstName + " does NOT match Filtered Criteria");
    //     }

    //   }

    /*
        if (filters.car.length > 0 && !filters.car.includes(instructor.hasCar)) {
            return false;
        }
        const weekdays = instructor.availability.map(ability => ability.weekday);
        if (filters.availability.length > 0 &&
          !filters.availability.some(ability => weekdays.includes(ability))) {
            return false;
        }
        let preferences = [instructor.firstPref, instructor.secondPref,instructor.thirdPref, instructor.fourthPref];
        if (filters.preference.length > 0 &&
          !filters.preference.some(pref => preferences.includes(pref))) {
            return false;
        }
        if (filters.year.length > 0 && !filters.year.includes(instructor.schoolYear)) {
            return false;
        }
        if (filters.asl.length > 0 && !filters.asl.includes(instructor.isASL)) {
            return false;
        }
        */

    // }, [checkedItems])

    useEffect(() => {
        setFilteredInstructors([
            ...Object.values(availableInstructorsForTheSelectedSeason),
        ]);
    }, [availableInstructorsForTheSelectedSeason]);

    useEffect(() => {
        const instructors = Object.values(
            availableInstructorsForTheSelectedSeason
        ).filter((instructor) => {
            // return false if does not meet filter requirements for 'hasCar'
            if (
                checkedItems.hasCar.length > 0 &&
                !checkedItems.hasCar.includes(instructor.hasCar)
            ) {
                return false;
            }
            // return false if does not meet filter requirements for 'isASL'
            if (
                checkedItems.isASL.length > 0 &&
                !checkedItems.isASL.includes(instructor.isASL)
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
                checkedItems.preference.length > 0 &&
                !checkedItems.preference.some((pref) =>
                    preferences.includes(pref)
                )
            ) {
                return false;
            }
            // return false if does not meet filter requirements for 'year'
            if (
                checkedItems.year.length > 0 &&
                !checkedItems.year.includes(instructor.schoolYear)
            ) {
                return false;
            }
            return true;
        });
        setFilteredInstructors(instructors);
        console.log('filtered instructors:');
        console.log(instructors);
    }, [filters]);

    useEffect(() => {
        const { hasCar, preference, year, isASL } = filters;
        setCheckedItems({
            hasCar: [...hasCar],
            preference: [...preference],
            year: [...year],
            isASL: [...isASL],
        });
    }, [showFilter]);

    const handleApplyFilters = (checkedItems) => {
        const { hasCar, preference, year, isASL } = checkedItems;
        setFilters({
            hasCar: [...hasCar],
            preference: [...preference],
            year: [...year],
            isASL: [...isASL],
        });
        setShowFilter(false);
    };

    const changedBox = (e, category) => {
        // const value = e[e.length-1].value;
        // const label = e[e.length-1].label;

        // console.log("label: ", label, "value: ", value);
        // console.log("this box is checked with " + e);
        //if target is clicked
        // let boxValue = e.target.checked;
        // console.log(boxValue,'HERE')
        //box value is boolean, true for checked, false for unchecked

        // if button is clicked and category is unchecked
        if (checkedItems[category].length == 2) {
            // change category to checked
            checkedItems[category] = [1];
        }
        // if button is clicked and category is checked
        else {
            // change category to unchecked
            checkedItems[category] = [0, 1];
        }

        // console.log(checkedItems[category] + "checked");
        // console.log(availableInstructorsForTheSelectedSeason);

        // console.log("start");
        // console.log(checkedItems);
        // print instructors that satify this category
        // for( const i in availableInstructorsForTheSelectedSeason)
        // {
        //   const instructor = availableInstructorsForTheSelectedSeason[i];
        //   // car && asl checked
        //   if(checkedItems.hasCar.includes(instructor.hasCar) && checkedItems.isASL.includes(instructor.isASL)) {
        //     console.log(instructor);
        //   }
        //   // car checked
        //   else if(checkedItems.hasCar.includes(instructor.hasCar)) {
        //     console.log(instructor);
        //   }
        //   // asl checked
        //   else if(checkedItems.isASL.includes(instructor.isASL)) {
        //     console.log(instructor);
        //   }
        //   // none checked
        //   else {
        //     console.log(instructor);
        //   }
        // }
    };

    // const handleCheckboxChange = (e, value) => {
    //   const name = e.target.name;
    //   let checkedValue;
    //   const valIndex = checkedItems[name].indexOf(value);
    //   if (valIndex >= 0) {
    //     checkedItems[name].splice(valIndex, 1);
    //     checkedValue = checkedItems[name];
    //   } else {
    //     checkedValue = [...checkedItems[name], value];
    //   }
    //   setCheckedItems({ ...checkedItems, [name]: checkedValue });
    //   console.log(availableInstructorsForTheSelectedSeason, 'HERE')

    // }

    // const resetFilters = () => {
    //   setCheckedItems(Object.assign({}, initialCheckedItems));
    //   handleApplyFilters(Object.assign({}, initialCheckedItems));
    // }

    /*
    useEffect(() => {
      const { car, availability, preference, year, asl } = filters;
      setCheckedItems({
        name: filters.name,
        car: [...car],
        availability: [...availability],
        preference: [...preference],
        year: [...year],
        asl: [...asl],
      });
    }, [e]);
    */
    useEffect(() => {
        let val = true;
        if (instructors) {
            for (const instructor of instructors) {
                if (
                    !state['lockedInstructors'].includes(
                        instructor.instructorId
                    )
                ) {
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
    }, [parentLockStatus, setNumInstructors, instructors]);

    const resetFilters = () => {
        setCheckedItems(Object.assign({}, initialCheckedItems));
        handleApplyFilters(Object.assign({}, initialCheckedItems));
    };

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
                onHide={() => setAssignPopup(false)}
                // aria-labelledby="contained-modal-title-vcenter"
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
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Search Instructors..."
                                    aria-label="Search"
                                />
                            </MDBCol>
                        </div>

                        <div
                            style={{
                                padding: 5,
                                justifyContent: 'flex-end',
                                border: '5px ',
                            }}>
                            <div section="dropdown">
                                <Button variant="light" section="dropbtn">
                                    {' '}
                                    Car
                                </Button>
                                <div section="dropdown-content">
                                    <Form.Check
                                        type="checkbox"
                                        label=" Owns a Car"
                                        name="hasCar"
                                        onChange={(e) => {
                                            handleCheckboxChange(e, 'hasCar');
                                        }}
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
                            <div section="dropdown">
                                <Button variant="light" section="dropbtn">
                                    {' '}
                                    ASL
                                </Button>
                                <div section="dropdown-content">
                                    <Form.Check
                                        type="checkbox"
                                        label=" Knows ASL"
                                        name="isASL"
                                        onChange={(e) => {
                                            handleCheckboxChange(e, 'isASL');
                                        }}
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
                            <div section="dropdown">
                                <Button variant="light" section="dropbtn">
                                    {' '}
                                    Year
                                </Button>
                                <div section="dropdown-content">
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
                            <div section="dropdown">
                                <Button variant="light" section="dropbtn">
                                    {' '}
                                    Preference
                                </Button>
                                <div section="dropdown-content">
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
                        <div
                            style={{
                                padding: 5,
                                justifyContent: 'flex-end',
                                border: '5px',
                            }}>
                            <Button
                                variant="primary"
                                onClick={() =>
                                    handleApplyFilters(checkedItems)
                                }>
                                {' '}
                                Apply Filters
                            </Button>
                        </div>
                    </div>

                    <AssignInstructorsTable
                        show={assignPopup}
                        time={time[0]}
                        programsColorKey={programColorMap}
                        seasonSelected={seasonSelected}
                        filters={checkedItems}
                        data={filteredInstructors.reverse()}
                    />
                </Modal.Body>
                <Modal.Footer style={{ border: '0' }}>
                    <Button
                        variant="outline-danger"
                        onClick={() => setAssignPopup(false)}>
                        Cancel
                    </Button>
                    <Button variant="success">
                        {/* needs onclick */}
                        Confirm Instructor Selections
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Section;
