import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { Wrapper } from "./Styled";

export const Input = ({label, handler, modal, state, disabled = false, required = false, valid = true }) => {
    const handleChange = (field, e) => {
        handler(e.target.value, field);
    }

    return (
        <Wrapper modal valid={valid}>
            <label>{label} {required && <span style={{color: 'red'}}>*</span>}</label>
            <InputGroup className="mb-3">
                <FormControl  disabled={disabled} value={state} onChange={(event) => handleChange(label, event)} required={required} />
            </InputGroup>
        </Wrapper>
    );
}