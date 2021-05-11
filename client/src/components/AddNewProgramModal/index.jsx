import React, { useState } from 'react';
import programAnimation from "../../assets/program-animation.json";
import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import Lottie from "lottie-react";
import {Input} from "../../design-system/form";
import { CirclePicker } from 'react-color';

const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        resolve(event.target.result)
    };
    reader.readAsDataURL(file);
})


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
        handleSubmit('PROGRAM', newProgramInput);
    }

    const handleImageUpload = (file) => {
        // TODO: Handle error when image failed to upload
        // TODO: Image file validation -- file limit (< 5mb) & file type (.png, .webp, .jpg)
        if(!file) {
            handleFormInput('', "Logo");
            return;
        }

        fileToDataUri(file)
            .then(dataUri => {
                handleFormInput(dataUri, "Logo")
            })
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
                            <div style={{width: '100%', height: '300px', display: 'flex', padding: '0 1rem 1rem 1rem'}}>
                                {newProgramInput.logo ?
                                    <img style={{width: '100%', objectFit: 'contain'}} src={newProgramInput.logo} alt={"logo"} />
                                    : <Lottie animationData={programAnimation}/> }
                            </div>
                            <input type={"file"} onChange={(event) => handleImageUpload(event.target.files[0] || null)} />
                        </div>
                        <div style={{width: '50%', marginRight: '1.5rem'}}>
                            <Input label={'Program Name'} handler={handleFormInput} state={newProgramInput.name} modal/>
                            <label>Color</label>
                            <CirclePicker
                                color={ newProgramInput.color || '#000000'}
                                onChangeComplete={(color, event) => handleFormInput(color.hex,'Color')}/>
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