import React, {useEffect, useState} from 'react';
import {Alert, Button, Modal} from "react-bootstrap";
import { Wrapper } from "./Styles";
import  "./style.scss";
import {Input} from "../../design-system/form";
import fire from '../../fire.js';
import {Password} from "../../design-system/form/Password";

const LoginPage = () => {
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

    return(

        <Wrapper>
            <Modal centered size="md" show >
                <Modal.Header style={{padding: '2rem 0 0 3rem', border: '0',}}>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <form onSubmit={handleSubmit}>
                    <div style={{padding: '1rem 0rem 1rem 2rem', display: 'flex', flexDirection: 'row'}}>
                        <div style={{width: '100%', marginRight: '1.5rem'}}>
                            <Input label={'E-mail Address'} handler={setEmail} state={email} onChange={({ target }) =>
                                setEmail(target.value)}/>
                            <Password type="target.valuepassword" label={'Password'} handler={setPassword} state={password} type="password" onChange={({ target}) =>
                                setPassword()}/>
                        <div className="gradient-border">
                            <Button type="submit" variant="primary" style={{width: '100%', marginTop:'1rem'}}>Submit</Button>
                        </div>
                        </div>
                    </div>
                    </form>
                    <div style={{marginTop: '1rem',padding: '1rem 1rem 1rem 2rem',width: '99%' }}>
                        {tryAgain}
                    </div>

                </Modal.Body>
            </Modal>

        </Wrapper>
    )
}

export default LoginPage;