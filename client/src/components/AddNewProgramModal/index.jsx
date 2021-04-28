import React, { useState } from 'react';
import programAnimation from "../../assets/program-animation.json";
import {Button, Modal} from "react-bootstrap";
import Lottie from "lottie-react";
import {Input} from "../../design-system/form";
import {DatePickerWrapper} from "../NavBar/Styled";
import DatePicker from "react-datepicker";
import { CirclePicker } from 'react-color';

const AddNewProgramModal = ({ handleSubmit }) => {
    const [newProgramInput, setNewProgramInput] = useState(
        {
            name: null,
            color: null,
            logo: null,
        }
    )

    const handleFormInput = (input = null, field) => {
        switch(field) {
            case "Program Name":
                setNewProgramInput({...newProgramInput, name: input})
                break;
            case "Color":
                setNewProgramInput({...newProgramInput, color: input})
                break;
            case "Logo":
                setNewProgramInput({...newProgramInput, logo: input})
                break;
        }
    }

    const handleSubmitButtonPress = () => {
        handleSubmit(newProgramInput);
        setNewProgramInput({
            name: null,
            color: null,
            logo: null,
        });
    }

    return (
        <>
            <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
                <Modal.Title>Add a new program</Modal.Title>
            </Modal.Header>
            <>
                <Modal.Body>
                    <div style={{padding: '2rem 4rem 0 4rem', display: 'flex', flexDirection: 'row'}}>
                        <div style={{width: '50%', marginRight: '1.5rem'}}>
                            <Lottie animationData={programAnimation}/>
                        </div>
                        <div style={{width: '50%', marginRight: '1.5rem'}}>
                            <Input label={'Program Name'} handler={handleFormInput} state={newProgramInput.name} modal/>
                            <DatePickerWrapper>
                                <label>Color</label>
                                <CirclePicker
                                    color={ newProgramInput.color || '#000000'}
                                    onChangeComplete={(color, event) => handleFormInput(color.hex,'Color')}/>
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

export default AddNewProgramModal;