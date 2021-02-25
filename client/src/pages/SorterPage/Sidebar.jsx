import React from "react";
import "./Sidebar.scss";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { Search, PlusCircle } from 'react-bootstrap-icons';

const Sidebar = () => (
  <div className="sidebar">
    <h1 className="title">Unassigned Instructors</h1>
    <InputGroup className="search">
      <FormControl
        placeholder="Search"
        aria-label="Search"
      />
      <InputGroup.Append>
        <Button variant="primary" className="search-btn"><Search /></Button>
      </InputGroup.Append>
    </InputGroup>
    <Button className="add-instructor-btn"><PlusCircle /> Add Instructor</Button>
    {/* <h2 className="filter-by">Filter by:</h2> */}
  </div>
);

export default Sidebar;
