import React, { useContext, useState } from 'react';
import './InstructorSearchForm.scss';
import { AppContext } from '../AppContextProvider';
import { getRandomInstructorSet } from "../../../util/sampleData";
import { InputGroup, FormControl, Button, Modal, Form } from "react-bootstrap";
import { Search } from 'react-bootstrap-icons';

const InstructorSearchForm = ({ setIsLoading, state, applyFilters, showFilter, setShowFilter }) => {
  const { setSearchedInstructors } = useContext(AppContext);
  const [showAutoAssignConfirmation, setShowAutoAssignConfirmation] = useState();
  const [filteredInstructors, setFilteredInstructors] = useState([]);
  const [hasCar, setHasCar] = useState();

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let result = getRandomInstructorSet(10);
    setIsLoading(false);
    setSearchedInstructors(result);
  }

  const handleShowFilter = () => setShowFilter(true);
  const handleCloseFilter = () => setShowFilter(false);

  const handleShowAutoAssignConfirmation = () => setShowAutoAssignConfirmation(true);
  const handleCloseAutoAssignConfirmation = () => setShowAutoAssignConfirmation(false);

  const resetFilters = () => {
    handleCloseFilter();
  }

  const handleCarFilter = e => {
    setHasCar("True" ? e.target.id === "Yes" : "False")
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
          <Button variant="primary" className="search-btn" onClick={onSearchSubmit}><Search /></Button>
        </InputGroup.Append>
      </InputGroup>
      <Button className="filter-btn" onClick={handleShowFilter}>Filter</Button>
      <Button className="auto-assign-btn" onClick={handleShowAutoAssignConfirmation}>Auto-assign</Button>

      <Modal dialogClassName="filter" show={showFilter} onHide={handleCloseFilter} onExited={handleCloseFilter} >
          <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
            <Modal.Title style={{fontSize: '36px', fontWeight: 'bold'}}>Filters</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{padding: '1rem 3rem'}}>
            <h5>Returnee</h5>
            <Form.Group className="filter-group">
              <Form.Check type="checkbox" label="Yes" />
              <Form.Check type="checkbox" label="No" />
            </Form.Group>
            <h5>Owns a car</h5>
            <Form.Group className="filter-group">
              <Form.Check 
                type="checkbox" 
                label="Yes" 
                id="Yes" 
                onChange={handleCarFilter}
              />
              <Form.Check 
                type="checkbox" 
                label="No" 
                id="No" 
                onChange={handleCarFilter}
              />
            </Form.Group>
            <h5>American Sign Language</h5>
            <Form.Group className="filter-group">
              <Form.Check type="checkbox" label="Yes" />
              <Form.Check type="checkbox" label="No" />
            </Form.Group>
            <h5>Availability</h5>
            <Form.Group className="filter-group">
              <Form.Check type="checkbox" label="Monday" />
              <Form.Check type="checkbox" label="Tuesday" />
              <Form.Check type="checkbox" label="Wednesday" />
              <Form.Check type="checkbox" label="Thursday" />
              <Form.Check type="checkbox" label="Friday" />
            </Form.Group>
            <h5>Preferences</h5>
            <Form.Group className="filter-group">
              <Form.Check type="checkbox" label="AppJam" />
              <Form.Check type="checkbox" label="WebJam" />
              <Form.Check type="checkbox" label="LESTEM" />
              <Form.Check type="checkbox" label="Scratch" />
              <Form.Check type="checkbox" label="Engineering Inventors" />
            </Form.Group>
            <h5>Programming Language</h5>
            <Form.Group className="filter-group">
              <Form.Check type="checkbox" label="Python" />
              <Form.Check type="checkbox" label="Java" />
              <Form.Check type="checkbox" label="JavaScript" />
              <Form.Check type="checkbox" label="C/C++" />
            </Form.Group>
            <h5>Spoken Language</h5>
            <Form.Group className="filter-group">
              <Form.Check type="checkbox" label="Spanish" />
              <Form.Check type="checkbox" label="Vietnamese" />
              <Form.Check type="checkbox" label="Mandarin" />
              <Form.Check type="checkbox" label="Tagalog" />
              <Form.Check type="checkbox" label="Korean" />
            </Form.Group>
            <h5>Year</h5>
            <Form.Group className="filter-group">
              <Form.Check type="checkbox" label="1st" />
              <Form.Check type="checkbox" label="2nd" />
              <Form.Check type="checkbox" label="3rd" />
              <Form.Check type="checkbox" label="4th+" />
              <Form.Check type="checkbox" label="Graduate" />
            </Form.Group>
            <div className="filter-btns">
              <Button className="apply-btn" onClick={applyFilters}>Apply Filters</Button>
              <Button className="reset-btn" onClick={resetFilters}>Reset Filters</Button>
            </div>
          </Modal.Body>
      </Modal>

      <Modal centered show={showAutoAssignConfirmation} onHide={handleCloseAutoAssignConfirmation} onExited={handleCloseAutoAssignConfirmation} >
        <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
          <Modal.Title style={{fontSize: '24px'}}>Are you sure you want to auto-assign instructors?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This action will automatically sort all unassigned instructors and any instructors that are not locked.
        </Modal.Body>
        <Modal.Footer style={{border: '0'}}>
          <Button variant="light" onClick={handleCloseAutoAssignConfirmation}>Cancel</Button>
          <Button variant="primary" onClick={handleCloseAutoAssignConfirmation}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default InstructorSearchForm;
