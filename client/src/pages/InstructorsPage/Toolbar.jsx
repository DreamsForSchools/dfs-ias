import React from 'react';
import {InputGroup, FormControl, Form, Button} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

const Toolbar = () => {
    return(
        <div className={"instructor_toolbar"}>
            <InputGroup className="search">
                <FormControl
                    placeholder="Search"
                    aria-label="Search"
                />
                <InputGroup.Append>
                    <Button variant="primary" className="search-btn"><Search /></Button>
                </InputGroup.Append>
            </InputGroup>

            <Form.Label>View by: </Form.Label>
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

export default Toolbar;