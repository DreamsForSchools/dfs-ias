import React from 'react';
import "./Toolbar.scss";
import {InputGroup, FormControl, Form, Button} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

const Toolbar = () => {
    return(
        <div className={"instructor_toolbar"}>
            <InputGroup className="search">
                <FormControl
                    placeholder="Search"
                    aria-label="Search"
                    class-name="searh-bar"
                />
                <InputGroup.Append>
                    <Button variant="primary" className="search-btn"><Search /></Button>
                </InputGroup.Append>
            </InputGroup>
            
            <Form.Label className="view-by">View by: </Form.Label>
            <Form.Control as="select" className="view-select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </Form.Control>
        </div>
    )
}

export default Toolbar;