import React, { useState } from 'react';
import partnerAnimation from "../../assets/partner-animation.json";
import {Button, Form, FormControl, InputGroup, Modal} from "react-bootstrap";
import Lottie from "lottie-react";
import {Input, Select} from "../../design-system/form";
import { partnerTypes, usState } from "../../constant";

const AddNewPartnerModal = ({ handleSubmit }) => {
    const [newPartnerInput, setNewPartnerInput] = useState(
        {
            name: null,
            district: null,
            city: null,
            state: null,
            street: null,
            zip: null,
            partnerType: null,
            langRequest: null,
        }
    )

    const [validated, setValidated] = useState(false);

    const handleFormInput = (input = null, field) => {
        switch(field) {
            case "Partner Name":
                setNewPartnerInput({...newPartnerInput, name: input})
                break;
            case "School District":
                setNewPartnerInput({...newPartnerInput, district: input})
                break;
            case "Partner Type":
                setNewPartnerInput({...newPartnerInput, partnerType: input})
                break;
            case "Language(s) Requested":
                setNewPartnerInput({...newPartnerInput, langRequest: input})
                break;
            case "Street Address":
                setNewPartnerInput({...newPartnerInput, street: input})
                break;
            case "City":
                setNewPartnerInput({...newPartnerInput, city: input})
                break;
            case "Zip Code":
                setNewPartnerInput({...newPartnerInput, zip: input})
                break;
            case "State":
                setNewPartnerInput({...newPartnerInput, state: input})
                break;
        }
    }

    const handleSubmitButtonPress = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            handleSubmit('PARTNER',
                {...newPartnerInput,
                    partnerType:
                        newPartnerInput.partnerType
                            ? newPartnerInput.partnerType.substring(newPartnerInput.partnerType.indexOf(' ') + 1)
                            : null});
        }
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);
    }

    return (
        <>
            <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
                <Modal.Title>Add a new partner</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmitButtonPress}>
                <Modal.Body>
                    <Lottie style={{width: 300, margin: "auto"}} animationData={partnerAnimation}/>
                    <div style={{padding: '2rem 4rem 0 4rem', width: "100%"}}>
                        <Input required label={'Partner Name'} handler={handleFormInput} state={newPartnerInput.name} modal/>
                    </div>
                    <div style={{padding: '0 4rem', display: 'flex', flexDirection: 'row'}}>
                        <div style={{width: '50%', marginRight: '1.5rem'}}>
                            <Input label={'School District'} handler={handleFormInput} state={newPartnerInput.district} modal/>
                            <Select options={partnerTypes} label={'Partner Type'} handler={handleFormInput} state={newPartnerInput.partnerType}
                                    modal/>
                            <Input required label={'Language(s) Requested'} handler={handleFormInput} state={newPartnerInput.langRequest} modal/>
                        </div>
                        <div style={{width: '50%'}}>
                            <Input required label={'Street Address'} handler={handleFormInput} state={newPartnerInput.street} modal/>
                            <Input required label={'City'} handler={handleFormInput} state={newPartnerInput.city} modal/>
                            <div style={{display: 'flex'}}>
                                <Input required label={'Zip Code'} handler={handleFormInput} state={newPartnerInput.zip} modal/>
                                <div style={{marginLeft: '1rem'}}>
                                    <Select options={usState} label={'State'} handler={handleFormInput} state={newPartnerInput.state}
                                        modal/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{border: '0', padding: '0 3rem 2rem 3rem'}}>
                    <Button variant="primary" onClick={handleSubmitButtonPress}>Submit</Button>
                </Modal.Footer>
            </Form>
        </>
    )
}

export default AddNewPartnerModal;