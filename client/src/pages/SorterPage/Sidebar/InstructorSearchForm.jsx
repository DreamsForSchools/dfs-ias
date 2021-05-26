import React, {useState} from 'react';
import './InstructorSearchForm.scss';
import {InputGroup, FormControl, Button, Modal, Form} from "react-bootstrap";
import {CloudUploadFill, Search} from 'react-bootstrap-icons';
import Lottie from "lottie-react";
import sortLoadingAnimation from '../../../assets/triangle-loading.json';


const InstructorSearchForm = ({setIsLoading, state, handleFilter,handleSearch, handleAutoAssign}) => {
    const [showAutoAssignConfirmation, setShowAutoAssignConfirmation] = useState();
    const [checkedItems, setCheckedItems] = useState();
    const [hasCar, setHasCar] = useState();
    const [showFilter, setShowFilter] = useState(false);
    const [sortAnimation, setSortAnimation] = React.useState(false);
    const [searchText, setSearchText] = React.useState("");

    const availabilityOptions = [
        {value: "Monday"},
        {value: "Tuesday"},
        {value: "Wednesday"},
        {value: "Thursday"},
        {value: "Friday"},
    ]

    const preferenceOptions = [
        {value: "AppJam"},
        {value: "WebJam"},
        {value: "LESTEM"},
        {value: "Scratch"},
        {value: "Engineering Inventors"},
    ]

    const yearOptions = [
        {value: "1st"},
        {value: "2nd"},
        {value: "3rd"},
        {value: "4th+"},
        {value: "Graduate"},
    ]

    const onSearchSubmit = async (e) => {
        // e.preventDefault();
        // setIsLoading(true);
        // let result = getRandomInstructorSet(10);
        // setIsLoading(false);
        // setSearchedInstructors(result);

        if(!searchText || searchText.trim()  === ""){
            handleSearch(state["search"]);
        }else{
            const filteredInstructors = state["search"].filter(instructor => {
                let fullName = instructor.firstName + " " + instructor.lastName;
                return(
                    fullName.includes(searchText.trim()) || instructor.email.includes(searchText.trim())
                    || instructor.university.includes(searchText.trim()) || instructor.firstPref.includes(searchText.trim())
                );
            });
            handleSearch(filteredInstructors);
        }

    }

    const handleShowFilter = () => setShowFilter(true);
    const handleCloseFilter = () => setShowFilter(false);

    const handleShowAutoAssignConfirmation = () => setShowAutoAssignConfirmation(true);
    const handleCloseAutoAssignConfirmation = () => setShowAutoAssignConfirmation(false);

    const handleApplyFilters = () => {
        handleFilter(state["search"].filter(instructor => instructor.hasCar));
        handleCloseFilter();
    }

    const resetFilters = () => {
        handleCloseFilter();
    }

    const handleCarChange = e => {
        setHasCar(true ? e.target.id === "Yes" && e.target.checked : false)
    }

    const handleSearchChange = e => {
        if(e.key === 'Enter'){
            onSearchSubmit();
        }
        setSearchText(e.target.value);
    }

    const handleCheckboxChange = e => {
        console.log(e.target.id)
        console.log(e.target.checked)
    }

    const handleConfirmAutoAssign = async () => {
        setSortAnimation(true);
        await handleAutoAssign();
        handleCloseAutoAssignConfirmation();
        setSortAnimation(false);
    }

    return (
        <div className="instructor-search-form">
            <InputGroup className="search">
                <FormControl
                    placeholder="Search"
                    aria-label="Search"
                    className="search-bar"
                    value={searchText}
                    onChange={handleSearchChange}
                    onKeyPress={handleSearchChange}
                />
                <InputGroup.Append>
                    <Button variant="primary" className="search-btn" onClick={onSearchSubmit}><Search/></Button>
                </InputGroup.Append>
            </InputGroup>
            <Button className="filter-btn" onClick={handleShowFilter}>Filter</Button>
            <Button className="auto-assign-btn" onClick={handleShowAutoAssignConfirmation}>Auto-assign</Button>

            <Modal dialogClassName="filter" show={showFilter} onHide={handleCloseFilter} onExited={handleCloseFilter}>
                <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
                    <Modal.Title style={{fontSize: '36px', fontWeight: 'bold'}}>Filters</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{padding: '1rem 3rem'}}>
                    <h5>Returnee</h5>
                    <Form.Group className="filter-group">
                        <Form.Check type="checkbox" label="Yes"/>
                        <Form.Check type="checkbox" label="No"/>
                    </Form.Group>
                    <h5>Owns a car</h5>
                    <Form.Group className="filter-group">
                        <Form.Check
                            type="checkbox"
                            label="Yes"
                            id="Yes"
                            onChange={handleCarChange}
                            checked={checkedItems}
                        />
                        <Form.Check
                            type="checkbox"
                            label="No"
                            id="No"
                            onChange={handleCarChange}
                            checked={checkedItems}
                        />
                    </Form.Group>
                    <h5>Availability</h5>
                    <Form.Group className="filter-group">
                        {availabilityOptions.map(day =>
                            <Form.Check
                                key={day.value}
                                type="checkbox"
                                label={day.value}
                                id={day.value}
                                onChange={handleCheckboxChange}
                                checked={checkedItems}
                            />
                        )}
                    </Form.Group>
                    <h5>Preference</h5>
                    <Form.Group className="filter-group">
                        {preferenceOptions.map(pref =>
                            <Form.Check
                                key={pref.value}
                                type="checkbox"
                                label={pref.value}
                                id={pref.value}
                                onChange={handleCheckboxChange}
                                checked={checkedItems}
                            />
                        )}
                    </Form.Group>
                    <h5>Year</h5>
                    <Form.Group className="filter-group">
                        {yearOptions.map(year =>
                            <Form.Check
                                key={year.value}
                                type="checkbox"
                                label={year.value}
                                id={year.value}
                                onChange={handleCheckboxChange}
                                checked={checkedItems}
                            />
                        )}
                    </Form.Group>
                    <h5>ASL</h5>
                    <Form.Group className="filter-group">
                        <Form.Check
                            type="checkbox"
                            label="Yes"
                            id="Yes"
                            onChange={handleCheckboxChange}
                            checked={checkedItems}
                        />
                        <Form.Check
                            type="checkbox"
                            label="No"
                            id="No"
                            onChange={handleCheckboxChange}
                            checked={checkedItems}
                        />
                    </Form.Group>
                    <div className="filter-btns">
                        <Button className="apply-btn" onClick={handleApplyFilters}>Apply Filters</Button>
                        <Button className="reset-btn" onClick={resetFilters}>Reset Filters</Button>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal centered show={showAutoAssignConfirmation} onHide={handleCloseAutoAssignConfirmation}
                   onExited={handleCloseAutoAssignConfirmation} backdrop={'static'}>


                {sortAnimation ? (
                        <div>
                            <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
                                <Modal.Title style={{fontSize: '24px'}}>Sort in progress. Please wait... </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Lottie style={{
                                    width: '500px',
                                    height: '300px',
                                    marginLeft: '-10px'
                                }} animationData={sortLoadingAnimation}/>
                            </Modal.Body>
                            <Modal.Footer style={{border: '0'}}>
                            </Modal.Footer>
                        </div>
                    ) :
                    (
                        <div>
                            <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
                                <Modal.Title style={{fontSize: '24px'}}>Are you sure you want to auto-assign
                                    instructors?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                This action will automatically sort all unassigned instructors and any instructors that
                                are not locked.
                            </Modal.Body>
                            <Modal.Footer style={{border: '0'}}>
                                <Button variant="light" onClick={handleCloseAutoAssignConfirmation}>Cancel</Button>
                                <Button variant="primary" onClick={handleConfirmAutoAssign}>Confirm</Button>
                            </Modal.Footer>
                        </div>
                    )}


            </Modal>

        </div>
    );
}

export default InstructorSearchForm;
