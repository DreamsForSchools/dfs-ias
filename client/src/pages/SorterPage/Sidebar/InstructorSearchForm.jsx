import React, { useContext, useState } from 'react';
import './InstructorSearchForm.scss';
import { AppContext } from '../AppContextProvider';
import { getRandomInstructorSet } from "../../../util/sampleData";
import { InputGroup, FormControl, Button, Modal, Form } from "react-bootstrap";
import { Search } from 'react-bootstrap-icons';

const InstructorSearchForm = ({setIsLoading}) => {
  const { setSearchedInstructors } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState();
  const [showAutoAssignConfirmation, setShowAutoAssignConfirmation] = useState();

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
              <Form.Check type="checkbox" label="Yes" />
              <Form.Check type="checkbox" label="No" />
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
            <h5>Spoken Language</h5>
            <h5>Year</h5>
            <h5>Major</h5>
            <div className="filter-btns">
              <Button className="apply-btn" onClick={handleCloseFilter}>Apply Filters</Button>
              <span className="reset-btn">Reset Filters</span>
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
