import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { Wrapper } from "./Styled";

export const Password = ({label, handler, modal, state}) => {
    const handleChange = (field, e) => {
        handler(e.target.value, field);
    }

    return (
        <Wrapper modal>
            <label>{label}</label>
            <InputGroup className="mb-3">
                <FormControl type="password" value={state} onChange={(event) => handleChange(label, event)}/>
            </InputGroup>
        </Wrapper>
    );
}