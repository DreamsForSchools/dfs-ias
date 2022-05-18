import React from "react";
// import Fade from 'react-reveal/Fade';
import { Trash, CalendarWeek, TelephoneFill, X, Check, PencilSquare } from 'react-bootstrap-icons';
import { Button, OverlayTrigger, Popover, Badge, Modal, Table, CloseButton } from 'react-bootstrap';
import Dot from '../../design-system/dots';
import avatar from '../../assets/avatar.png';
import { formatAvailability, formatPhoneNumber } from "../../util/formatData";
import EditInstructorManuallyModal from "../../components/EditInstructorManuallyModal";
import {Select, Input} from '../../design-system/form';
import {timeSlots, gender, ethnicity, shirtSize, schoolYear} from '../../constant';
import {color} from '../../design-system/style';
import {formatMilitaryTime} from "../../util/formatData";


const InstructorsSideInfo = (props) => {
    const { instructor, programsColorKey, onDeletePress, formInput, setFormInput, editShowModal, setEditShowModal, handleEditInstructorManually, seasonId} = props;
    const [ deleteShow, setDeleteShow ] = React.useState(false);
    
    const [hasCarValue, setCarValue] = React.useState(0);
    const [isASLValue, setASLValue] = React.useState(0);
    const [changeInstructorFocus, setchangeInstructorFocusValue] = React.useState({});


    const [availabilityShow, setAvailabilityShow] = React.useState(false);
    // for time availabilities
    const [timeAvailability, setTimeAvailability] = React.useState([]);

    // // UseState to show edit modal , when True edit modal is displayed. 
    // const [ editShowModal, setEditShowModal] = React.useState(false);
    // const [formInput, setFormInput] = React.useState({
    //     firstName: null,
    //     lastName: null,
    //     email: null,
    //     phoneNumber: null,
    //     gender: null,
    //     ethnicity: null,
    //     university: null,
    //     major: null,
    //     schoolYear: null,
    //     graduationDate: null,
    //     firstPref: null,
    //     secondPref: null,
    //     thirdPref: null,
    //     fourthPref: null,
    //     hasCar: false,
    //     otherLanguages: null,
    //     isASL: false,
    //     shirtSize: null,
    //     availability: null,
    //     programmingLanguages: null,
    //     }
    // );
    
    //For Availability Modal
    const handleTimeSlotInput = (e) => {                
        if (timeAvailability.some(slot => JSON.stringify(slot) === JSON.stringify(e))) {
            setTimeAvailability(timeAvailability.filter(function (ele) {
                return JSON.stringify(ele) != JSON.stringify(e);
            }));
        } else {
            setTimeAvailability([...timeAvailability, e]);
        };
        // console.log(timeAvailability);
        //currently availability default shows Once, but once clicked on modal causes "wipe" losing defaults,
        // but allowing new availability to push/update. 3/21
        formInput.availability = timeAvailability;
        
        
    };
    
    React.useEffect(() => {
        console.log("....");
        parseAvailability(timeAvailability);
        
    }, [timeAvailability])

        

    const parseAvailability = (arr) => {
        let parsed = [];
        arr.sort((a, b) => {
            if (a.weekday > b.weekday) return 1;
            if (a.weekday < b.weekday) return -1;

            if (Number(a.startTime.split(':')[0]) < Number(b.startTime.split(':')[0])) return -1;
            if (Number(a.startTime.split(':')[0]) > Number(b.startTime.split(':')[0])) return 1;
        });

        arr.forEach((e) => {
            if (parsed.length === 0) {
                parsed.push(JSON.parse(JSON.stringify(e)));
            } else {
                if (parsed[parsed.length - 1].weekday === e.weekday) {
                    if (parsed[parsed.length - 1].endTime === e.startTime) {
                        parsed[parsed.length - 1].endTime = e.endTime;
                    } else {
                        parsed.push(JSON.parse(JSON.stringify(e)));
                    }
                } else {
                    parsed.push(JSON.parse(JSON.stringify(e)));
                }
            }
        })
       
        // console.log(parsed);
        // index for going through parsed
        //  advance both parsed and 
        let p_idx = 0;
        let idx = 0;
        let merged_time = [];
        
        while(formInput.availability && (idx < formInput.availability.length && p_idx < parsed.length))
        {
            if (formInput.availability[idx].weekday != parsed[p_idx].weekday)
            {
                if(formInput.availability[idx].weekday < parsed[p_idx].weekday)
                {
                    merged_time.push(formInput.availability[idx]);
                    idx++;
                }
                else
                {
                    merged_time.push(parsed[p_idx]);
                    p_idx++;
                }

            }

            else if(formInput.availability[idx].startTime <= parsed[p_idx].startTime && formInput.availability[idx].endTime >= parsed[p_idx].endTime)
            {
                p_idx++;
            }

            else if(formInput.availability[idx].startTime >= parsed[p_idx].startTime && formInput.availability[idx].endTime <= parsed[p_idx].endTime)
            {
                idx++;
            }

            else if (formInput.availability[idx].startTime == parsed[p_idx].endTime || formInput.availability[idx].endTime == parsed[p_idx].startTime)
            {
                parsed[p_idx].startTime = formInput.availability[idx].startTime < parsed[p_idx.startTime] ? formInput.availability[idx].startTime : parsed[p_idx].startTime ;
                parsed[p_idx].endTime = formInput.availability[idx].endTime > parsed[p_idx.endTime] ? formInput.availability[idx].endTime : parsed[p_idx].endTime ;
                // console.log("err"+parsed[p_idx].startTime +"::"+parsed[p_idx].endTime);
                merged_time.push(parsed[p_idx]);
                p_idx++;
                idx++;
            }
            else if(formInput.availability[idx].startTime < parsed[p_idx].startTime)
            {
                merged_time.push(formInput.availability[idx]);
                idx++;
            }
            else 
            {
                merged_time.push(parsed[p_idx]);
                p_idx++;
            }
            // check parsed to see if matching weekday if need to stack time. (if consecutive timeslots, should we stack)
        }

        while(formInput.availability && idx < formInput.availability.length)
        {
            merged_time.push(formInput.availability[idx]);
            idx++;
        }

        while(p_idx < parsed.length)
        {
            merged_time.push(parsed[p_idx]);
            p_idx++;
        }


        // setFormInput({...formInput, availability: parsed}) ORIGINAL  RETURN 
        let merged_finale = [];
        for( let m_idx = 0 ; m_idx < merged_time.length ; m_idx++)
        {
            // NEED TO REMAP OBJECTS WITHOUT AVAILABILITY ID
            merged_finale.push({ startTime: merged_time[m_idx].startTime , endTime: merged_time[m_idx].endTime, weekday: merged_time[m_idx].weekday});
        }


        console.log(merged_time);
        //data WITH AVAILABILITY ID
        // setFormInput({...formInput, availability: merged_time});
        // data WITHOUT AVAILABILITY ID FOR THE API
        
        setFormInput({...formInput, availability: merged_finale});        
        // setFormInput({...formInput, availability: parsed});
        

        
    };

    const renderTimeSlotCheckboxes = (time) => {
        const element = [];
        let default_boxes = [0, 0, 0, 0, 0];

        // console.log("****");
        // console.log(formInput.availability);
        for(let j = 1; j < 6 ; j++)
        {
            
            for(const time_attr of formInput.availability)
            {
                // checking multiblock times. (mondays from 9-5 as opposed to monday 9-10 1-2 4-5)
                if(time_attr.weekday == j)
                    default_boxes[j-1] = (time_attr.startTime <= timeSlots[time].startTime && time_attr.endTime >= timeSlots[time].endTime) ? 1 : 0
            }
            
        }

        for (let i = 0; i < 5; i++) {
            element.push(
                <td key={i} style={{textAlign: 'center'}}>
                     
                    <input
                        onChange={() => handleTimeSlotInput({
                            weekday: i + 1,
                            startTime: timeSlots[time].startTime,
                            endTime: timeSlots[time].endTime                            
                        })}
                        type={'checkbox'}
                        
                        aria-label="Checkbox for following text input"
                        checked={timeAvailability.some(slot => JSON.stringify(slot) === JSON.stringify({
                            weekday: i + 1,
                            startTime: timeSlots[time].startTime,
                            endTime: timeSlots[time].endTime
                        }))|| default_boxes[i]  }
                    />
                    

                </td>
            )
        }

        return element;
    }

    const handleFormInput = (input = null, field) => {
        switch (field) {
            case "First Name":
                setFormInput({...formInput, firstName: input})
                break;
            case "Last Name":
                setFormInput({...formInput, lastName: input})
                break;
            case "E-mail Address":
                setFormInput({...formInput, email: input})
                break;
            case "Phone Number":
                setFormInput({...formInput, phoneNumber: input})
                break;
            case "Sex":
                setFormInput({...formInput, gender: input})
                break;
            case "Ethnicity":
                setFormInput({...formInput, ethnicity: input})
                break;
            case "Shirt size":
                setFormInput({...formInput, shirtSize: input})
                break;
            case "Skilled in (ASL)":
                setFormInput({...formInput, isASL: !formInput.isASL})
                break;
            case "Owns a car":
                setFormInput({...formInput, hasCar: !formInput.hasCar})
                break;
            case "University":
                setFormInput({...formInput, university: input});
                break;
            case "Major":
                setFormInput({...formInput, major: input});
                break;
            case "Languages other than English":
                setFormInput({...formInput, otherLanguages: input});
                break;
            case "School Year":
                setFormInput({...formInput, schoolYear: input});
                break;
            case "Graduation Date":
                setFormInput({...formInput, graduationDate: input});
                break;
            case "Programming Languages":
                setFormInput({...formInput, programmingLanguages: input});
                break;
        }
    };


    if (instructor) {
        formatAvailability(instructor.availability);
        
    }

    if (!instructor) {
        return (
            <></>
        )
    }

    

    const editToggle = () => {
        // setting default values
        setCarValue(instructor.hasCar);
        setASLValue(instructor.isASL);
        // console.log(instructor.availability);

        let clear_availability = [];
        for( let c_idx = 0 ; c_idx < instructor.availability.length ; c_idx++)
        {
            // NEED TO REMAP OBJECTS WITHOUT AVAILABILITY ID
            clear_availability.push({ startTime: instructor.availability[c_idx].startTime , endTime: instructor.availability[c_idx].endTime, weekday: instructor.availability[c_idx].weekday});
        }

        setFormInput(
            {...formInput,
                firstName: instructor.firstName,
                lastName: instructor.lastName,
                email: instructor.email,
                phoneNumber: instructor.phoneNumber,
                gender: instructor.gender,
                ethnicity: instructor.ethnicity,
                university: instructor.university,
                major: instructor.major,
                schoolYear: instructor.schoolYear,
                graduationDate: instructor.graduationDate,
                firstPref: instructor.firstPref,
                secondPref: instructor.secondPref,
                thirdPref: instructor.thirdPref,
                fourthPref: instructor.fourthPref,
                hasCar: instructor.hasCar,
                otherLanguages: instructor.otherLanguages,
                isASL: instructor.isASL,
                shirtSize: instructor.shirtSize,
                availability: clear_availability,
                programmingLanguages: instructor.programmingLanguages,
            }
        );

        
        
        
        // parseAvailability(instructor.availability);
        
        
        setEditShowModal(true);
        setchangeInstructorFocusValue(instructor);
        // console.log(formInput.availability);
        

    }

    
    const updateToggle = () => {
        console.log(formInput);
        
        console.log(instructor.instructorId);
        handleEditInstructorManually(instructor.instructorId, {...formInput, approve: true, seasonId: seasonId});
        setEditShowModal(false);
    }
        

   
  
    const handleCarChange = () => {
        console.log("x"+hasCarValue)
        handleFormInput(null, "Owns a car");
        // console.log("x"+hasCarValue)
        console.log(formInput.hasCar+" : formInputs Car");        
        setCarValue(formInput.hasCar);
        // React.setState.variant = "danger"        
        
    }

   
    const handleASLChange = () => {
        console.log("x"+isASLValue)
        handleFormInput(null, "Skilled in (ASL)");
        // console.log("x"+hasCarValue)
        console.log(formInput.isASL+" : formInputs isASL");        
        setASLValue(formInput.isASL);
        // React.setState.variant = "danger"        
        
    }

    const onDeleteInstructor = () => {
        onDeletePress(instructor.instructorId)
        setDeleteShow(false);
    }
    


// if not empty (focus hasnot changed)
    // if( !changeInstructorFocus && (changeInstructorFocus!=instructor))
    // {
    //     setEditShowModal(false);
    // }


    return (
        <div className={'instructor-side-info'}>
            {(!editShowModal||(changeInstructorFocus != instructor)) && (
            // <Fade right duration={200}>
                <div>
                    <h1 style={{fontWeight: "bold", textAlign: "center"}}>
                        {instructor.firstName + " " + instructor.lastName}
                    </h1>

                    <Button size="md" style={{marginRight: '0.5rem'}}
                                      onClick={editToggle}   data-testid="editClass">Edit
                                    <span style={{marginLeft: '0.5rem'}}><PencilSquare/></span>
                    </Button>

                    <Button variant="danger" onClick={() => setDeleteShow(true)}>Delete Instructor
                        <span style={{marginLeft: '0.5rem'}}><Trash/></span>
                    </Button>

                   
                   

                    <div style={{margin: "2rem 0"}}>
                        <img style={{width: "200px"}} src={avatar} />
                    </div>

                    <h6>Preferences</h6>
                    <div style={{display: "inline-block"}}>
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                                <Popover>
                                    <Popover.Title as="h3">{`Program Preferences`}</Popover.Title>
                                    <Popover.Content>
                                        {
                                            [instructor.firstPref, instructor.secondPref, instructor.thirdPref, instructor.fourthPref].map((el, idx) =>
                                                <h6 key={idx}>
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
                            <div>
                                {[instructor.firstPref, instructor.secondPref, instructor.thirdPref, instructor.fourthPref].map((el, idx) =>
                                    <Dot color={programsColorKey[el]} key={idx}/>
                                )}
                            </div>
                        </OverlayTrigger>
                    </div>

                    <div style={{ fontSize: "1.5rem" }}>
                        {instructor.hasCar
                            ? <Badge pill variant="success">
                                <Check /> Car
                            </Badge>
                            : <Badge pill variant="danger">
                                <X /> Car
                            </Badge>
                        }
                        {instructor.isASL
                            ? <Badge pill variant="success">
                                <Check /> ASL
                            </Badge>
                            : <Badge pill variant="danger">
                                <X /> ASL
                            </Badge>
                        }
                    </div>

                    <div className={"grouped-info_container"}>
                        <div className={"info"} style={{width: "50%"}}>
                            <h6>
                                Year
                            </h6>
                            <h5>
                                {instructor.schoolYear}
                            </h5>
                        </div>

                        <div className={"info"} style={{width: "50%"}}>
                            <h6>
                                Sex
                            </h6>
                            <h5>
                                {instructor.gender}
                            </h5>
                        </div>

                        {/* <div className={"info"} style={{width: "75%"}}>*/}
                        {/*    <h6>*/}
                        {/*        Previously Taught*/}
                        {/*    </h6>*/}
                        {/*    <h5>*/}
                        {/*        {instructor.previouslyTaught}*/}
                        {/*    </h5>*/}
                        {/*</div> */}
                    </div>

                    <div className={"grouped-info_container"}>
                        <div className={"info"} style={{width: "100%", textAlign: "left"}}>
                            <h6>
                                <CalendarWeek/><span style={{marginLeft: "0.5rem"}}>Availability</span>
                            </h6>
                            {formatAvailability(instructor.availability).map((e) =>
                                <h5 key={e}>{e}</h5>
                            )}
                        </div>
                    </div>

                    <div className={"grouped-info_container"}>
                        <div className={"info-transparent"} style={{width: "100%", textAlign: "left"}}>
                            <h4 style={{textAlign: 'left'}}><TelephoneFill /><span style={{marginLeft: '1rem'}}>{formatPhoneNumber(instructor.phoneNumber)}</span></h4>
                        </div>
                    </div>

                    <div className={"grouped-info_container"}>
                        <div className={"info-transparent"} style={{width: "100%", textAlign: "left"}}>
                            <h6>
                                Email
                            </h6>
                            <h5>
                                {instructor.email}
                            </h5>
                        </div>
                    </div>

                    <div className={"grouped-info_container"}>
                        <div className={"info-transparent"} style={{width: "100%", textAlign: "left"}}>
                            <h6>
                                University
                            </h6>
                            <h5>
                                {instructor.university}
                            </h5>
                        </div>
                    </div>

                    <div className={"grouped-info_container"}>
                        <div className={"info-transparent"} style={{width: "60%", textAlign: "left"}}>
                            <h6>
                                Major
                            </h6>
                            <h5>
                                {instructor.major}
                            </h5>
                        </div>
                        <div className={"info-transparent"} style={{width: "40%", textAlign: "left"}}>
                            <h6>
                                Graduation Date
                            </h6>
                            <h5>
                                {instructor.graduationDate}
                            </h5>
                        </div>
                    </div>
                    <div className={"grouped-info_container"}>
                        <div className={"info-transparent"} style={{width: "60%", textAlign: "left"}}>
                            <h6>
                                Ethnicity
                            </h6>
                            <h5>
                                {instructor.ethnicity}
                            </h5>
                        </div>
                        <div className={"info-transparent"} style={{width: "40%", textAlign: "left"}}>
                            <h6>
                                Shirt Size
                            </h6>
                            <h5>
                                {instructor.shirtSize}
                            </h5>
                        </div>
                        
                    </div>
                    <div className={"grouped-info_container"}>
                        <div className={"info-transparent"} style={{width: "100%", textAlign: "left"}}>
                                <h6>
                                    Other Languages
                                </h6>
                                <h5>
                                    {instructor.otherLanguages}
                                </h5>
                        </div>
                    </div>
                    

                    <Modal show={deleteShow}
                           onHide={() => setDeleteShow(false)}
                           aria-labelledby="contained-modal-title-vcenter"
                           centered>
                        <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
                            <Modal.Title>Delete Confirm</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{padding: '1rem 3rem'}}>Do you want to delete this instructor?</Modal.Body>
                        <Modal.Footer style={{border: '0'}}>
                            <Button variant="light" onClick={() => setDeleteShow(false)}>
                                Close
                            </Button>
                            <Button variant="danger"
                                    onClick={() => onDeleteInstructor()}>
                                Confirm
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            // </Fade>
            )}
            {/* EDITABLE UPDATE TOGGLED MODAL*************************************************************************** */}
            {editShowModal  && (
                // <Fade right duration={200}>
                <div>
                    <CloseButton style={{paddingRight: '0.5rem', paddingTop: '0.5rem'}} onClick = {()=> setEditShowModal(false)}  />
                    <h1 style={{fontWeight: "bold", textAlign: "center"}}>
                        {formInput.firstName + " " + instructor.lastName} 
                    </h1>
                    

                    {/* On Click intends to send data (updateToggle) to the database */}
                    <Button size="md"  variant="warning" style={{marginRight: '0.5rem'}}
                                        onClick={updateToggle}   data-testid="updateClass">Update
                                    <span style={{marginLeft: '0.5rem'} }><PencilSquare/></span>
                    </Button>

                    <Button variant="danger" onClick={() => setDeleteShow(true)}>Delete Instructor
                        <span style={{marginLeft: '0.5rem'}}><Trash/></span>
                    </Button>
                    
                    

                    <div style={{margin: "2rem 0"}}>
                        <img style={{width: "200px"}} src={avatar} />
                    </div>

                    {/* this will be a bit different to input for class preferences */}
                    <h6>Preferences</h6>
                    <div style={{display: "inline-block"}}>
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                                <Popover>
                                    <Popover.Title as="h3">{`Program Preferences`}</Popover.Title>
                                    <Popover.Content>
                                        {
                                            [instructor.firstPref, instructor.secondPref, instructor.thirdPref, instructor.fourthPref].map((el, idx) =>
                                                <h6 key={idx}>
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
                            <div>
                                {[instructor.firstPref, instructor.secondPref, instructor.thirdPref, instructor.fourthPref].map((el, idx) =>
                                    <Dot color={programsColorKey[el]} key={idx}/>
                                )}
                            </div>
                        </OverlayTrigger>
                    </div>

                    {/* add an onClick handler for this to change to noCar? */}
                    <div style={{ fontSize: "1.5rem" }}>
                        {formInput.hasCar
                            
                            // ? <Badge  pill onClick={handleCarChange} variant={hasCarValue ? "success" : "danger"}>
                            ? <Badge pill onClick={() => handleFormInput(null, "Owns a car")} variant="success">
                                {formInput.hasCar ? <div><Check /> Car </div> : <div><X /> Car</div>}
                            </Badge>
                            // : <Badge pill onClick={handleCarChange} variant={hasCarValue ? "success" : "danger"}>
                            : <Badge pill onClick={() => handleFormInput(null, "Owns a car")} variant="danger">
                                {formInput.hasCar ? <div><Check /> Car </div> : <div><X /> Car</div>}
                            </Badge>
                        }
                        {formInput.isASL
                            ? <Badge pill onClick={handleASLChange} variant={"success" }>
                                {formInput.isASL ? <div><Check /> ASL </div> : <div><X /> ASL</div>}
                            </Badge>
                            : <Badge pill onClick={handleASLChange} variant={ "danger"}>
                                {formInput.isASL ? <div><Check /> ASL </div> : <div><X /> ASL</div>}
                            </Badge>
                        }
                    </div>
                    
                    <div className={"button-description"}>
                        Click to toggle the tags on and off! 
                    </div>

                    <div className={"grouped-info_container"}>
                        <div className={"info"} style={{width: "50%"}}>
                            {/* <h6>
                                Year
                            </h6>
                            <h5>
                                {instructor.schoolYear}
                            </h5> */}
                            {/* could do inline styling here, like logo or smthn. like a pencil or some shit */}
                            <div className={"text-label"}>
                                <Select options={schoolYear} label={'School Year'} handler={handleFormInput}
                                state={formInput.schoolYear} modal/>
                           </div>
                        </div>

                        <div className={"info"} style={{width: "50%"}}>
                            {/* <h6>
                                Gender
                            </h6>
                            <h5>
                                {instructor.gender}
                            </h5> */}
                            <div className={"text-label"}>
                                <Select options={gender} label={'Sex'} handler={handleFormInput} state={formInput.gender} modal/>
                            </div>
                        </div>

                        {/*<div className={"info"} style={{width: "75%"}}>*/}
                        {/*    <h6>*/}
                        {/*        Previously Taught*/}
                        {/*    </h6>*/}
                        {/*    <h5>*/}
                        {/*        {instructor.previouslyTaught}*/}
                        {/*    </h5>*/}
                        {/*</div>*/}
                    </div>

                    <div className={"grouped-info_container"}>
                        <div onClick ={setAvailabilityShow} className={"info"} style={{width: "100%", textAlign: "left"}}>
                            <h6>
                                <CalendarWeek /><span style={{marginLeft: "0.5rem"}}>Availability</span>
                            </h6>
                            {formatAvailability(formInput.availability).map((e) =>
                                <h5 key={e}>{e}</h5>
                            )}
                        </div>
                    </div>

                    <div className={"grouped-info_container"}>
                        <div className={"info-transparent"} style={{width: "100%", textAlign: "left"}}>
                            {/* <h4 style={{textAlign: 'left'}}><TelephoneFill /><span style={{marginLeft: '1rem'}}>{formatPhoneNumber(instructor.phoneNumber)}</span></h4> */}
                            <div className="text-label" style={{display: "flex"}}><TelephoneFill style={{marginRight:"5px", marginTop:"3px"}} /><Input label={'Phone Number'} handler={handleFormInput} state={formInput.phoneNumber} modal></Input></div>

                        </div>
                    </div>

                    <div className={"grouped-info_container"}>
                        <div className={"info-transparent"} style={{width: "100%", textAlign: "left"}}>
                            {/* <h6>
                                Email
                            </h6>
                            <h5>
                                {instructor.email}
                            </h5> */}
                            <div className={"text-label"}>
                                <Input  label={'E-mail Address'} handler={handleFormInput} state={formInput.email} modal/>
                            </div>
                        </div>
                    </div>

                    <div className={"grouped-info_container"}>
                        <div className={"info-transparent"} style={{width: "100%", textAlign: "left"}}>
                            {/* <h6>
                                University
                            </h6>
                            <h5>
                                {instructor.university}
                            </h5> */}
                            <div className={"text-label"}>
                                <Input label={'University'} handler={handleFormInput} state={formInput.university} modal/>
                            </div>
                        </div>
                    </div>

                    <div className={"grouped-info_container"}>
                        <div className={"info-transparent"} style={{width: "60%", textAlign: "left"}}>
                            {/* <h6>
                                Major
                            </h6>
                            <h5>
                                {instructor.major}
                            </h5> */}
                            <div className={"text-label"}>
                                <Input label={'Major'} handler={handleFormInput} state={formInput.major} modal/>
                            </div>
                        </div>
                        <div className={"info-transparent"} style={{width: "40%", textAlign: "left"}}>
                            {/* <h6>
                                Graduation Date
                            </h6>
                            <h5>
                                {instructor.graduationDate}
                            </h5> */}
                            <div className={"text-label"}>
                                <Input label={'Graduation Date'} handler={handleFormInput} state={formInput.graduationDate} modal/>
                            </div>
                        </div>
                    </div>
                    <div className={"grouped-info_container"}>
                        <div className={"info-transparent"} style={{width: "60%", textAlign: "left"}}>
                            {/* <h6>
                                Ethnicity
                            </h6>
                            <h5>
                                {instructor.ethnicity}
                            </h5> */}
                            <div className={"text-label"}>
                                <Select options={ethnicity} label={'Ethnicity'} handler={handleFormInput} state={formInput.ethnicity}
                                modal/>
                            </div>
                        </div>
                        <div className={"info-transparent"} style={{width: "40%", textAlign: "left"}}>
                            {/* <h6>
                                Shirt Size
                            </h6>
                            <h5>
                                {instructor.shirtSize}
                            </h5> */}
                            <div className={"text-label"}>
                                <Select options={shirtSize} label={'Shirt size'} handler={handleFormInput} state={formInput.shirtSize}
                                modal/>
                            </div>
                        </div>
                        
                    </div>
                    <div className={"grouped-info_container"}>
                        <div className={"info-transparent"} style={{width: "100%", textAlign: "left"}}>
                                {/* <h6>
                                    Other Languages
                                </h6>
                                <h5>
                                    {instructor.otherLanguages}
                                </h5> */}
                                <div className={"text-label"}>
                                    <Input label={'Languages other than English'} handler={handleFormInput} state={formInput.otherLanguages} modal/>
                                </div>
                        </div>
                    </div>
                    

                    <Modal show={deleteShow}
                            onHide={() => setDeleteShow(false)}
                            aria-labelledby="contained-modal-title-vcenter"                            
                            centered>
                        <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
                            <Modal.Title>Delete Confirm</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{padding: '1rem 3rem'}}>Do you want to delete this instructor?</Modal.Body>
                        <Modal.Footer style={{border: '0'}}>
                            <Button variant="light" onClick={() => setDeleteShow(false)}>
                                Close
                            </Button>
                            <Button variant="danger"
                                    onClick={() => onDeleteInstructor()}>
                                Confirm
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal size="lg" show={availabilityShow}
                            onHide={() => setAvailabilityShow(false)}
                            aria-labelledby="contained-modal-title-vcenter"                            
                            centered>
                        <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
                            <Modal.Title>Edit Availability</Modal.Title>
                        </Modal.Header>
                        <Modal.Body   >

                           <div style={{ display: 'flex', flexDirection: 'row'}}>
                            <Table responsive borderless style={{borderSpacing: '0 0.4rem', borderCollapse: 'separate'}}>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Mondays</th>
                                    <th>Tuesdays</th>
                                    <th>Wednesdays</th>
                                    <th>Thursdays</th>
                                    <th>Fridays</th>
                                </tr>
                                </thead>
                                <tbody>
                                {timeSlots.map((e, idx) => (
                                    <tr key={idx} style={{borderRadius: '10px', background: color.neutral.LIGHTGRAY}}>
                                        <td>
                                            {formatMilitaryTime(e.startTime)} - {formatMilitaryTime(e.endTime)}                                            
                                        </td>
                                        {renderTimeSlotCheckboxes(idx)}
                                    </tr>
                                ))}
                                 </tbody>
                            </Table>
                            </div>
                            
                        </Modal.Body>

                        <Modal.Footer style={{border: '0'}}>
                            <Button variant="light" onClick={() => setAvailabilityShow(false)}>
                                Close
                            </Button>
                            {/* does it need to submit? or can confirm just close....? hmmmm . default data */}
                            <Button variant="success" onClick={() => setAvailabilityShow(false)}>
                                    
                                Confirm
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            // </Fade>
            )
            }

        </div>
    )
}

export default InstructorsSideInfo;
