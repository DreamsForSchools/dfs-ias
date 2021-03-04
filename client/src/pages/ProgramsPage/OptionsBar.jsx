import React from 'react';
import './OptionsBar.scss';
import { Form } from 'react-bootstrap';

const OptionBar = () => {
    return (
        <div className={"option-bar_container"}>
            <Form.Label>View by: </Form.Label>
            <Form.Control as="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </Form.Control>
            <Form.Label>Show: </Form.Label>
            <Form.Control as="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </Form.Control>
        </div>
    )
}

export default OptionBar;