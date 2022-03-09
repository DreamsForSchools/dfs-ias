import React, { useState, useContext, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './Class.scss';
import Instructor from '../Instructor.jsx';
import { CalendarWeek, People, LockFill, UnlockFill, PencilSquare } from 'react-bootstrap-icons';
import { formatAvailability } from "../../../util/formatData";
import { Button, Modal  } from 'react-bootstrap';
import {GlobalContext} from "../../../context/GlobalContextProvider";
import AssignInstructorsTable from './AssignInstructorsTable';
import '../../ProgramsPartnersPage/OptionsBar.scss';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { MDBCol } from "mdbreact";
import ReactDOM from "react-dom";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";




const Class = ({ id, partner, time, instructorsNeeded, instructors, programId, state, parentLockStatus ,instructorData, handleSearch, lockedInstructors}) => {
  const {
    programColorMap,
} = useContext(GlobalContext);

  const [numInstructors, setNumInstructors] = useState(0);
  const [lock, setLock] = useState(false);
  const [assignPopup, setAssignPopup] = useState(false);
  const initialCheckedItems = { car: [], availability: [], preference: [], year: [], asl: [] };
  const [filters, setFilters] = useState(Object.assign({}, initialCheckedItems));
  const [showFilter, setShowFilter] = useState(false);

  const [checkedItems, setCheckedItems] = useState(Object.assign({}, initialCheckedItems));

  const availabilityOptions = [
    {value: 1, label: "Monday"},
    {value: 2, label: "Tuesday"},
    {value: 3, label: "Wednesday"},
    {value: 4, label: "Thursday"},
    {value: 5, label: "Friday"},
  ]

  const preferenceOptions = [
    {value: "Mobile App Development (AppJam+)", label: "AppJam"},
    {value: "Website Development", label: "WebJam"},
    {value: "Let's Explore STEM", label: "LESTEM"},
    {value: "Coding Games with Scratch", label: "Scratch"},
    {value: "Engineering Inventors", label: "Engineering Inventors"}
  ]

  const yearOptions = [
    {value: "1st", label: "1st"},
    {value: "2nd", label: "2nd"},
    {value: "3rd", label: "3rd"},
    {value: "4th+", label: "4th+"},
    {value: "Graduate", label: "Graduate"},
  ]

  const car = [
    {value: 0, label: "No Car"},
    {value: 1, label: "Car"},
  ]

  const asl = [
    {value:0, label: "Does not know ASL"},
    {value:1, label: "Knows ASL"},
  ]


    const handleLock = () => {
        setLock(true);
    }
    const handleUnlock = () => {
        setLock(false);
    }

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

    //useEffect is for filtering /

    useEffect(() => {
      const unassignedInstructors = Object.values(instructorData).filter(instructor => {
          return (
            !lockedInstructors.includes(instructor.instructorId)
          );
      });

      const filterInstructors = unassignedInstructors.filter(instructor => {

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

          return true;
      });

      handleSearch(filterInstructors);
  }, [filters])
  */
  const handleCheckboxChange = (e) => {
    //const label = e.target.label;
    
    const label = e[e.length-1].label;
    const value = e[e.length-1].value;
    console.log("label: " + label);
    console.log("value: " + value);
    let category;
    for (let obj in availabilityOptions)
    {
      if (availabilityOptions[obj].label === label)
      {
        category = "availability";
      }
    }
    for (let obj in preferenceOptions)
    {
      if (preferenceOptions[obj].label === label)
      {
        category = "preference";
      }
    }
    for (let obj in yearOptions)
    {
      if (yearOptions[obj].label === label)
      {
        category = "year";
      }
    }
    for (let obj in car)
    {
      if (car[obj].label === label)
      {
        category = "car";
      }
    }
    for (let obj in asl)
    {
      if (asl[obj].label === label)
      {
        category = "asl";
      }
    }
    let checkedValue;
    checkedValue = [...checkedItems[category], value];
    console.log(checkedValue);
    setCheckedItems({ ...checkedItems, [category]: checkedValue});
  }
    // { car: [], availability: [], preference: [], year: [], asl: [] };
    /*
    const valIndex = checkedItems[label].indexOf(value);
    if (valIndex >= 0) {
      checkedItems[name].splice(valIndex, 1);
      checkedValue = checkedItems[name];
    } else {
      checkedValue = [...checkedItems[name], value];
    }
    //setCheckedItems({ ...checkedItems, [label]: checkedValue });
    
  
    
  }
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
      if(instructors){
          for(const instructor of instructors){
              if(!state["lockedInstructors"].includes(instructor.instructorId)){
                  val = false;
              }
          }
      }
      let count = (instructors ? instructors.length : 0);
      setNumInstructors(count);
      if(count === 0){
          setLock(false);
      } else if(parentLockStatus === true || val) {
          setLock(true);
      } else {
          setLock(false);
      }

  }, [parentLockStatus,setNumInstructors, instructors])

  const assignToggle = () => {
      setAssignPopup(true);
  }

  return (
    <div className="class">
      <div className="header">
        <h1 className="partner-name">{partner}</h1>
        {/*<div className="lock" onClick={() => { setLock(!lock) }}>*/}
        {/*    {lock ? <LockFill onClick={handleUnlock} className="icon" size={18}/> :*/}
        {/*        <UnlockFill onClick={handleLock} className="icon" size={18}/>}*/}
        {/*</div>*/}
      </div>
      <div className="class-info">
        <div><CalendarWeek /> {formatAvailability(time)} </div>
        <div><People /> {numInstructors}/{instructorsNeeded}</div>
      </div>

    {/* implementing for the modal pop up */}
    <div className="assign-modal-btns">
      <Button size="md"   style={{marginRight: '0.5rem'}}
                                          onClick={assignToggle}   data-testid="assignToProgram">Assign Instructors
                                      <span style={{marginLeft: '0.5rem'} }><PencilSquare/></span>
      </Button>
    </div>

      <Droppable droppableId={programId + "-" + partner + "-" + id} type="INSTRUCTOR">
        {(provided) => {
          return (
            <div className={"spacer"}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >

              {/* This is the assignment of instructors to program space. */}
              { instructors?.map((instructor, index) => {
                return (
                  <Draggable
                    key={instructor.instructorId}
                    draggableId={instructor.instructorId.toString()}
                    index={index}
                    isDragDisabled={state["lockedInstructors"].includes(instructor.instructorId)}
                  >
                    {(provided) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Instructor
                            key={instructor.instructorId}
                            instructor={instructor}
                            classId={id}
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
        <Modal size="xl" show={assignPopup}
        onHide={() => setAssignPopup(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
          <Modal.Title>Assign Instructors</Modal.Title>
        </Modal.Header>
          <Modal.Body style={{padding: '1rem 3rem'}}>
          <div style={{padding: 5, justifyContent: 'flex-end'}}>
          <h5>{partner}</h5>
          <h10><CalendarWeek /> {formatAvailability(time)} </h10>
          <h11 style={{float: 'right'}}><People /> {numInstructors}/{instructorsNeeded} </h11>
          </div>
          <div style={{


                  display: 'flex',
                  padding: 0,

                  justifyContent: 'flex-end'

                  }}>

                  <div style={{padding: 5}}>


                              <MDBCol md="40">
                                 <div className="active-pink-3 active-pink-4 mb-4">
                                    <input className="form-control" type="text" placeholder="Search Instructors..." aria-label="Search" />
                                </div>
                              </MDBCol>
                    </div>

                  <div style={{padding: 5, justifyContent:'flex-end'}}>


                  <Dropdown placement="bottomStart">
                    <Dropdown.Toggle variant="outline">
                      Sort By
                    </Dropdown.Toggle>
                    <Dropdown.Menu>


                      <Dropdown.Item href="#">
                        Owns Car
                      </Dropdown.Item>
                      <Dropdown.Item href="#">
                        Knows ASL
                      </Dropdown.Item>
                      
                      <Dropdown.Item href="#">
                        Preference
                      </Dropdown.Item>
                      <Dropdown.Item href="#">
                        Year
                      </Dropdown.Item>
                      
                    </Dropdown.Menu>
                  </Dropdown>

                  </div>




                  <div style={{padding: 5, justifyContent: 'flex-end'}}>
                  <ReactMultiSelectCheckboxes 
                  options={[...car, ...availabilityOptions, ...yearOptions, ...preferenceOptions, ...asl]} 
                  placeholderButtonLabel="Filter By" 
                  variant="outline"
                  //handleApplyFilters={handleApplyFilters}
                  onExited={handleCloseFilter}
                  filters = {filters}
                  onChange={(e) => {handleCheckboxChange(e); console.log(checkedItems);}}
                  //value={selectedOptions}
                  //onChange={onChange}
                  />


                  </div>
                  </div>
                  <AssignInstructorsTable filteredInstructors={instructors}  programsColorKey = {programColorMap} />

          </Modal.Body>
          <Modal.Footer style={{border: '0'}}>
        <Button variant="light" onClick={() => setAssignPopup(false)}>
            Close
        </Button>
        <Button variant="light">
        {/* needs onclick */}

            Confirm
        </Button>
        </Modal.Footer>
        </Modal>
    </div>






  );
}

export default Class;
