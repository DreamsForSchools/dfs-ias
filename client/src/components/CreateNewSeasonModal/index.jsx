import React, { useState } from 'react';
import seasonAnimation from "../../assets/season-animation.json";
import {Button, Modal} from "react-bootstrap";
import Lottie from "lottie-react";
import {Input} from "../../design-system/form";
import {DatePickerWrapper} from "../NavBar/Styled";
import DatePicker from "react-datepicker";

const CreateNewSeasonModal = ({ handleSubmit }) => {
    const [newSeasonInput, setNewSeasonInput] = useState(
        {
            name: null,
            startDate: new Date(),
            endDate: new Date(),
        }
    )

    const handleFormInput = (input = null, field) => {
        switch(field) {
            case "Season Name":
                setNewSeasonInput({...newSeasonInput, name: input})
                break;
            case "Start Date":
                setNewSeasonInput({...newSeasonInput, startDate: input})
                break;
            case "End Date":
                setNewSeasonInput({...newSeasonInput, endDate: input})
                break;
        }
    }

    const handleSubmitButtonPress = () => {
        handleSubmit(newSeasonInput);
    }

    return (
        <>
            <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
                <Modal.Title>Create a new season</Modal.Title>
            </Modal.Header>
            <>
                <Modal.Body>
                    <div style={{padding: '2rem 4rem 0 4rem', display: 'flex', flexDirection: 'row'}}>
                        <div style={{width: '50%', marginRight: '1.5rem'}}>
                            <Lottie animationData={seasonAnimation}/>
                        </div>
                        <div style={{width: '50%', marginRight: '1.5rem'}}>
                            <Input label={'Season Name'} handler={handleFormInput} state={newSeasonInput.name} modal/>
                            <DatePickerWrapper>
                                <label>Start Date</label>
                                <DatePicker
                                    selected={newSeasonInput.startDate}
                                    onChange={date => handleFormInput(date, "Start Date")}
                                    selectsStart
                                    startDate={newSeasonInput.startDate}
                                    endDate={newSeasonInput.endDate}
                                />
                            </DatePickerWrapper>
                            <DatePickerWrapper>
                                <label>End Date</label>
                                <DatePicker
                                    selected={newSeasonInput.endDate}
                                    onChange={date => handleFormInput(date, "End Date")}
                                    selectsEnd
                                    startDate={newSeasonInput.startDate}
                                    endDate={newSeasonInput.endDate}
                                    minDate={newSeasonInput.startDate}
                                />
                            </DatePickerWrapper>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{border: '0', padding: '0 3rem 2rem 3rem'}}>
                    <Button variant="primary" onClick={handleSubmitButtonPress}>Submit</Button>
                </Modal.Footer>
            </>
        </>
    )
}

export default CreateNewSeasonModal;