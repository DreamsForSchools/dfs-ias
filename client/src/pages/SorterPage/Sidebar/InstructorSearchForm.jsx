import React, { useContext } from 'react';
import { AppContext } from '../AppContextProvider';
import { getRandomInstructorSet } from "../../../util/sampleData";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { Search, PlusCircle } from 'react-bootstrap-icons';

const InstructorSearchForm = ({setIsLoading}) => {
  const { setSearchedInstructors } = useContext(AppContext);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let result = getRandomInstructorSet(10);
    setIsLoading(false);
    setSearchedInstructors(result);
  }

  return (
    <div className="instructor-search-form">
      <InputGroup className="search">
        <FormControl
          placeholder="Search"
          aria-label="Search"
          className="search-bar"
        />
        <InputGroup.Append>
          <Button variant="primary" className="search-btn" onClick={onFormSubmit}><Search /></Button>
        </InputGroup.Append>
      </InputGroup>
      <Button className="filter-btn">Filter</Button>
      <Button className="add-instructor-btn"><PlusCircle /> Add Instructor</Button>
    </div>
  );
}

export default InstructorSearchForm;
