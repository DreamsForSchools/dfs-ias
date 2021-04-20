import React from 'react';
import {Modal} from "react-bootstrap";
import AddInstructorManuallyModal from "../../components/AddInstructorManuallyModal";
import { Wrapper } from "./Styles";

const InstructorOnboardingPage = () => {
    return(
        <Wrapper>
            <Modal centered size="lg" show>
                <Modal.Header style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
                    <Modal.Title>Register as an Instructor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddInstructorManuallyModal/>
                </Modal.Body>
            </Modal>
        </Wrapper>
    )
}

export default InstructorOnboardingPage;