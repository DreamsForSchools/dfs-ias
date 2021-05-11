import React, {useEffect, useState} from 'react';
import {Alert, Button, Modal} from "react-bootstrap";
import { Wrapper } from "./Styles";
import  "./style.scss";
import {Input} from "../../design-system/form";
import fire from '../../fire.js';
import {Password} from "../../design-system/form/Password";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/loading-animation.json";

const LoginPage = ({authState}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [tryAgain, setTryAgain] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(email, password).catch((error) => {
            console.error('Incorrect username or password');
            setEmail("");
            setPassword("");
            setTryAgain(
                <Alert variant={'danger'}>
                    Incorrect username or password! Please try again.
                </Alert>
            );
        });

    }

    const renderLoginForm = (
        <>
            <form onSubmit={handleSubmit}>
                <div style={{padding: '1rem 0rem 1rem 2rem', display: 'flex', flexDirection: 'row'}}>
                    <div style={{width: '100%', marginRight: '1.5rem'}}>
                        <Input label={'E-mail Address'} handler={setEmail} state={email} onChange={({ target }) =>
                            setEmail(target.value)}/>
                        <Password type="target.valuepassword" label={'Password'} handler={setPassword} state={password} type="password" onChange={({ target }) =>
                            setPassword()}/>
                        <div className="gradient-border">
                            <Button type="submit" variant="primary" style={{width: '100%', marginTop:'1rem'}}>Sign In</Button>
                        </div>
                    </div>
                </div>
            </form>
            <div style={{marginTop: '1rem',padding: '1rem 1rem 1rem 2rem',width: '99%' }}>
                {tryAgain}
            </div>
        </>
    );

    const renderLoadingState = (
        <>
            <div style={{height: '200px', width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Lottie animationData={loadingAnimation} style={{height: 180, width: 180, padding: '2rem'}}/>
                <p>Authenticating with Firebase</p>
            </div>
        </>
    );

    return(
        <Wrapper>
            <Modal centered size="md" show >
                <Modal.Header style={{paddingTop: '2rem ', border: '0', justifyContent: 'center'}}>
                    <Modal.Title>Login to DFS-IAS</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {authState !== false ? renderLoadingState : renderLoginForm}
                </Modal.Body>
            </Modal>

        </Wrapper>
    )
}

export default LoginPage;