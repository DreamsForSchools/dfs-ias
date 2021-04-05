import React, {useState} from 'react';
import {ChevronLeft, ChevronRight} from 'react-bootstrap-icons';
import {color} from '../../design-system/style';
import {InputGroup, FormControl, Modal, Button, Table} from 'react-bootstrap';
import {formatMilitaryTime, formatTimeSlot} from "../../util/formatData";

const timeSlots = [
    {
        startTime: "09:00:00",
        endTime: "10:00:00"
    },
    {
        startTime: "10:00:00",
        endTime: "11:00:00"
    },
    {
        startTime: "11:00:00",
        endTime: "12:00:00"
    },
    {
        startTime: "13:00:00",
        endTime: "14:00:00"
    },
    {
        startTime: "15:00:00",
        endTime: "16:00:00"
    },
    {
        startTime: "16:00:00",
        endTime: "17:00:00"
    },
    {
        startTime: "17:00:00",
        endTime: "18:00:00"
    }

]

export default function AddInstructorManuallyModal() {
    const [step, setStep] = useState(0);

    const activeStep = {
        fontWeight: 'bold',
        color: color.solid.BLUE,
    };

    const inactiveStep = {
        fontWeight: '400',
        color: color.neutral.MIDGRAY,
    };

    const handleNextStep = () => setStep(step + 1);

    const handlePrevStep = () => setStep(step - 1);

    const renderTimeSlotCheckboxes = (day) => {
        const element = [];

        for (let i = 0; i < 5; i++) {
            element.push(
                <td style={{textAlign: 'center'}}>
                    <input type={'checkbox'} aria-label="Checkbox for following text input" />
                </td>
            )
        }

        return element;
    }

    const basicInfo = (
        <div style={{padding: '2rem', display: 'flex', flexDirection: 'row'}}>
            <div style={{width: '50%', marginRight: '1.5rem'}}>
                <label htmlFor="basic-url">Full name</label>
                <InputGroup className="mb-3">
                    <FormControl id="basic-url" aria-describedby="basic-addon3"/>
                </InputGroup>
                <label htmlFor="basic-url">Ethnicity</label>
                <InputGroup className="mb-3">
                    <FormControl id="basic-url" aria-describedby="basic-addon3"/>
                </InputGroup>
                <div style={{display: 'flex'}}>
                    <div style={{width: '100%', marginRight: '1.5rem'}}>
                        <label htmlFor="basic-url">Phone Number</label>
                        <InputGroup className="mb-3">
                            <FormControl id="basic-url" aria-describedby="basic-addon3"/>
                        </InputGroup>
                    </div>
                    <div>
                        <label htmlFor="basic-url">Shirt size</label>
                        <InputGroup className="mb-3">
                            <FormControl id="basic-url" aria-describedby="basic-addon3"/>
                        </InputGroup>
                    </div>
                </div>
            </div>
            <div style={{width: '25%', marginRight: '1.5rem'}}>
                <label htmlFor="basic-url">Previously taught</label>
                <InputGroup className="mb-3">
                    <FormControl id="basic-url" aria-describedby="basic-addon3"/>
                </InputGroup>
                <label htmlFor="basic-url">Gender</label>
                <InputGroup className="mb-3">
                    <FormControl id="basic-url" aria-describedby="basic-addon3"/>
                </InputGroup>
                <label htmlFor="basic-url">Ethnicity</label>
                <InputGroup className="mb-3">
                    <FormControl id="basic-url" aria-describedby="basic-addon3"/>
                </InputGroup>
            </div>
            <div style={{width: '25%'}}>
                <div style={{
                    marginBottom: '1.5rem',
                    borderRadius: '6px',
                    backgroundColor: color.neutral.LIGHTGRAY,
                    width: '100%',
                    height: '110px'
                }}>
                    <span>Owns a car</span>
                </div>
                <div style={{
                    borderRadius: '6px',
                    backgroundColor: color.neutral.LIGHTGRAY,
                    width: '100%',
                    height: '110px'
                }}>
                    <span>Skilled in (ASL)</span>
                </div>
            </div>
        </div>
    );

    const educationBackground = (
        <div style={{padding: '2rem', display: 'flex', flexDirection: 'row'}}>
            <div style={{width: '66%', marginRight: '1.5rem'}}>
                <div style={{display: 'flex'}}>
                    <div style={{width: '100%', marginRight: '1.5rem'}}>
                        <label htmlFor="basic-url">University</label>
                        <InputGroup className="mb-3">
                            <FormControl id="basic-url" aria-describedby="basic-addon3"/>
                        </InputGroup>
                    </div>
                    <div>
                        <label htmlFor="basic-url">Year</label>
                        <InputGroup className="mb-3">
                            <FormControl id="basic-url" aria-describedby="basic-addon3"/>
                        </InputGroup>
                    </div>
                </div>
                <div style={{display: 'flex'}}>
                    <div style={{width: '100%', marginRight: '1.5rem'}}>
                        <label htmlFor="basic-url">Major</label>
                        <InputGroup className="mb-3">
                            <FormControl id="basic-url" aria-describedby="basic-addon3"/>
                        </InputGroup>
                    </div>
                    <div>
                        <label htmlFor="basic-url">Graduation Date</label>
                        <InputGroup className="mb-3">
                            <FormControl id="basic-url" aria-describedby="basic-addon3"/>
                        </InputGroup>
                    </div>
                </div>
                <label htmlFor="basic-url">Languages other than English</label>
                <InputGroup className="mb-3">
                    <FormControl id="basic-url" aria-describedby="basic-addon3"/>
                </InputGroup>
            </div>

            <div style={{width: '33%'}}>
                <div style={{
                    marginBottom: '1.5rem',
                    borderRadius: '6px',
                    backgroundColor: color.neutral.LIGHTGRAY,
                    width: '100%',
                    height: '100%'
                }}>
                    <span>Programming Languages</span>
                </div>
            </div>
        </div>
    );

    const availability = (
        <div style={{padding: '2rem', display: 'flex', flexDirection: 'row'}}>
            <Table borderless style={{borderSpacing: '0 0.4rem', borderCollapse: 'separate'}}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Mondays</th>
                        <th>Tuedays</th>
                        <th>Wednesdays</th>
                        <th>Thursdays</th>
                        <th>Fridays</th>
                    </tr>
                </thead>
                <tbody>
                    { timeSlots.map((e, idx) => (
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
    );

    return (
        <>
            <Modal.Body>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{padding: '0 3rem', textAlign: 'center'}}>
                        <span style={step === 0 ? activeStep : inactiveStep}>Basic Information</span>
                        <ChevronRight style={{color: color.neutral.MIDGRAY, margin: '0 0.5rem'}}/>
                        <span style={step === 1 ? activeStep : inactiveStep}>Educational Background</span>
                        <ChevronRight style={{color: color.neutral.MIDGRAY, margin: '0 0.5rem'}}/>
                        <span style={step === 2 ? activeStep : inactiveStep}>Availability</span>
                        <ChevronRight style={{color: color.neutral.MIDGRAY, margin: '0 0.5rem'}}/>
                        <span style={step === 3 ? activeStep : inactiveStep}>Preferences</span>
                    </div>
                    { step === 0 && basicInfo }
                    { step === 1 && educationBackground }
                    { step === 2 && availability }
                </div>
            </Modal.Body>
            <Modal.Footer style={{border: '0', padding: '0 3rem 2rem 3rem'}}>
                <Button variant="outline-primary" onClick={handlePrevStep} style={{marginRight: 'auto'}}><ChevronLeft/>Back</Button>
                <Button variant="primary" onClick={handleNextStep}>Next<ChevronRight/></Button>
            </Modal.Footer>
        </>
    );
}