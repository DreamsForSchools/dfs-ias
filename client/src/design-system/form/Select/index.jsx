import React from "react";
import {Form} from "react-bootstrap";
import {Wrapper} from "./Styled";

export const Select = ({options, label, handler, modal, state}) => {
    const handleChange = (field, e) => {
        handler(e.target.value, field);
    }

    return (
        <Wrapper modal>
            <label htmlFor="basic-url">{label}</label>
            <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                <Form.Control as="select" value={state} custom onChange={(event) => handleChange(label, event)}>
                    <option value={null}></option>
                    {options.map((e, idx) => (
                        <option value={e} key={idx}>{e}</option>
                    ))}
                </Form.Control>
            </Form.Group>
        </Wrapper>
    );
};