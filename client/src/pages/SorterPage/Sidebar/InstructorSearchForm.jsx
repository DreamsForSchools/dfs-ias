import React, {useState} from 'react';
import './InstructorSearchForm.scss';
import {InputGroup, FormControl, Button, Modal, Form} from "react-bootstrap";
import { Search } from 'react-bootstrap-icons';
import Lottie from "lottie-react";
import sortLoadingAnimation from '../../../assets/triangle-loading.json';

const InstructorSearchForm = ({
        setIsLoading,
        state,
        handleFilter,
        handleSearch,
        handleAutoAssign,
        instructorData,
        lockedInstructors
    }) => {
    const [showAutoAssignConfirmation, setShowAutoAssignConfirmation] = useState();
    const [checkedItems, setCheckedItems] = useState();
    const [showFilter, setShowFilter] = useState(false);
    const [sortAnimation, setSortAnimation] = React.useState(false);
    const [searchText, setSearchText] = React.useState("");
    const [selectedFilters, setSelectedFilters] = React.useState("");

    const availabilityOptions = [
        {value: "Monday", name: "day:1"},
        {value: "Tuesday", name: "day:2"},
        {value: "Wednesday", name: "day:3"},
        {value: "Thursday", name: "day:4"},
        {value: "Friday", name: "day:5"},
    ]

    const preferenceOptions = [
        {value: "AppJam", name: "pref:Mobile App Development (AppJam+)"},
        {value: "WebJam", name: "pref:Website Development"},
        {value: "LESTEM", name: "pref:Let's Explore STEM"},
        {value: "Scratch", name: "pref:Coding Games with Scratch"},
        {value: "Engineering Inventors", name: "pref:Engineering Inventors"}
    ]

    const yearOptions = [
        {value: "1st", name: "year:1st"},
        {value: "2nd", name: "year:2nd"},
        {value: "3rd", name: "year:3rd"},
        {value: "4th+", name: "year:4th+"},
        {value: "Graduate", name: "year:Graduate"},
    ]

    const onSearchSubmit = async (e) => {
        let formattedText = searchText.trim().toLowerCase();
        let unassignedInstructors = instructorData.filter(instructor => {
            return (
                !lockedInstructors.includes(instructor.instructorId)
            );
        });

        if (!formattedText || formattedText === "") {
            handleSearch(unassignedInstructors);
        } else {
            const filteredInstructors = unassignedInstructors.filter(instructor => {
                let fullName = instructor.firstName + " " + instructor.lastName;
                return (
                    fullName.toLowerCase().includes(formattedText) || instructor.email.toLowerCase().includes(formattedText)
                    || instructor.university.toLowerCase().includes(formattedText) || instructor.firstPref.toLowerCase().includes(formattedText)
                );
            });
            handleSearch(filteredInstructors);
        }
    }

    const handleShowFilter = () => {
        setSelectedFilters("");
        setShowFilter(true);
    }
    const handleCloseFilter = () => setShowFilter(false);

    const handleShowAutoAssignConfirmation = () => setShowAutoAssignConfirmation(true);
    const handleCloseAutoAssignConfirmation = () => setShowAutoAssignConfirmation(false);

    const handleApplyFilters = () => {

        let allFilters = selectedFilters.toLowerCase().split(",");
        let unassignedInstructors = instructorData.filter(instructor => {
            return (
                !lockedInstructors.includes(instructor.instructorId)
            );
        });

        if (!allFilters || allFilters[0] === "") {
            handleSearch(unassignedInstructors);
            setShowFilter(false);
        } else {
            const filteredInstructors = unassignedInstructors.filter(instructor => {

                let queryResults = [];

                for (const aFilter of allFilters) {
                    let data = aFilter.split(":");
                    if (data[0].includes("car")) {
                        queryResults.push(instructor.hasCar.toString().includes(data[1]));

                    } else if (data[0].includes("year")) {
                        queryResults.push(instructor.schoolYear.includes(data[1]));

                    } else if (data[0].includes("asl")) {
                        queryResults.push(instructor.isASL.toString().includes(data[1]));

                    } else if (data[0].includes("day")) {
                        let days = instructor.availability.map(a => a.weekday);
                        if (days.toString().includes(data[1])) {
                            queryResults.push(true);
                        } else {
                            queryResults.push(false);
                        }
                    } else if (data[0].includes("pref")) {
                        let preferences = [instructor.firstPref.toLowerCase(), instructor.secondPref.toLowerCase(), instructor.thirdPref.toLowerCase(), instructor.fourthPref.toLowerCase()];
                        if (preferences.includes(data[1])) {
                            queryResults.push(true);
                        } else {
                            queryResults.push(false);
                        }
                    }
                }

                let result
                if (queryResults.length === 0) {
                    result = false;
                } else {
                    let checker = arr => arr.every(Boolean);
                    result = checker(queryResults);
                }

                setSelectedFilters("");
                return (
                    result
                );
            });
            handleSearch(filteredInstructors);
            handleCloseFilter();
        }
    }

    const resetFilters = () => {
        setSelectedFilters("");
        let unassignedInstructors = instructorData.filter(instructor => {
            return (
                !lockedInstructors.includes(instructor.instructorId)
            );
        });

        handleSearch(unassignedInstructors);

        handleCloseFilter();
    }

    const handleSearchChange = e => {
        if (e.key === 'Enter') {
            onSearchSubmit();
        }
        setSearchText(e.target.value);
    }

    const handleCheckboxChange = e => {
        if (e.target.checked === true && selectedFilters !== "") {
            setSelectedFilters(selectedFilters + ',' + e.target.id);
        } else {
            setSelectedFilters(e.target.id);
        }
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
                    {/*<h5>Returnee</h5>*/}
                    {/*<Form.Group className="filter-group">*/}
                    {/*    <Form.Check type="checkbox" label="Yes"/>*/}
                    {/*    <Form.Check type="checkbox" label="No"/>*/}
                    {/*</Form.Group>*/}
                    <h5>Owns a car</h5>
                    <Form.Group className="filter-group">
                        <Form.Check
                            type="checkbox"
                            label="Yes"
                            id="car:1"
                            onChange={handleCheckboxChange}
                            checked={checkedItems}
                        />
                        <Form.Check
                            type="checkbox"
                            label="No"
                            id="car:0"
                            onChange={handleCheckboxChange}
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
                                id={day.name}
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
                                id={pref.name}
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
                                id={year.name}
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
                            id="asl:1"
                            onChange={handleCheckboxChange}
                            checked={checkedItems}
                        />
                        <Form.Check
                            type="checkbox"
                            label="No"
                            id="asl:0"
                            onChange={handleCheckboxChange}
                            checked={checkedItems}
                        />
                    </Form.Group>
                    <div style={{height: "30px"}}>

                    </div>
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
