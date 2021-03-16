import React from 'react';
import "./Toolbar.scss";
import {InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import { Search, PlusCircle } from 'react-bootstrap-icons';

const Toolbar = () => {
    return(
        <div className={"instructor_toolbar"}>
            <Form inline>
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
                <Form.Group className="filter-by">
                    <Form.Label className="label">
                        Filter by:  
                    </Form.Label>
                    <Form.Control as="select" className="select">
                        <option>All</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                </Form.Group>      
                <Button className="add-button"><PlusCircle /> Add Instructor</Button>
            </Form>
        </div>
    )
}

export default Toolbar;