import React, { useEffect, useState } from 'react';
import './InstructorSearchForm.scss';
import {InputGroup, FormControl, Button, Modal, Form} from "react-bootstrap";
import { Search } from 'react-bootstrap-icons';
import Lottie from "lottie-react";
import sortLoadingAnimation from '../../../assets/triangle-loading.json';
import InstructorFiltersModal from "../../../components/InstructorFiltersModal";

const InstructorSearchForm = ({
        setIsLoading,
        state,
        handleFilter,
        handleSearch,
        handleAutoAssign,
        instructorData,
        lockedInstructors
    }) => {
    const initialCheckedItems = { car: [], availability: [], preference: [], year: [], asl: [] };
    const [showAutoAssignConfirmation, setShowAutoAssignConfirmation] = useState();
    const [filters, setFilters] = useState(Object.assign({}, initialCheckedItems));
    const [showFilter, setShowFilter] = useState(false);
    const [sortAnimation, setSortAnimation] = React.useState(false);
    const [searchText, setSearchText] = React.useState("");

    const onSearchSubmit = async (e) => {
        let formattedText = searchText.trim().toLowerCase();
        let unassignedInstructors = Object.values(instructorData).filter(instructor => {
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

    const handleShowFilter = () => setShowFilter(true);
    const handleCloseFilter = () => setShowFilter(false);

    const handleShowAutoAssignConfirmation = () => setShowAutoAssignConfirmation(true);
    const handleCloseAutoAssignConfirmation = () => setShowAutoAssignConfirmation(false);

    const handleApplyFilters = (checkedItems) => {
        const { car, availability, preference, year, asl } = checkedItems;
        
        console.log(checkedItems);
        setFilters({
            name: filters.name,
            car: [...car],
            availability: [...availability],
            preference: [...preference],
            year: [...year],
            asl: [...asl],
        });
        handleCloseFilter();
    }

    useEffect(() => {
        const unassignedInstructors = Object.values(instructorData).filter(instructor => {
            return (
              !lockedInstructors.includes(instructor.instructorId)
            );
        });

        const filterInstructors = unassignedInstructors.filter(instructor => {

            if (filters.car.length > 0 && !filters.car.includes(instructor.hasCar)) {
                return false;
            }

            const weekdays = instructor.availability.map(ability => ability.weekday);
            if (filters.availability.length > 0 &&
              !filters.availability.some(ability => weekdays.includes(ability))) {
                return false;
            }

            let preferences = [instructor.firstPref, instructor.secondPref,instructor.thirdPref, instructor.fourthPref];
            if (filters.preference.length > 0 &&
              !filters.preference.some(pref => preferences.includes(pref))) {
                return false;
            }

            if (filters.year.length > 0 && !filters.year.includes(instructor.schoolYear)) {
                return false;
            }

            if (filters.asl.length > 0 && !filters.asl.includes(instructor.isASL)) {
                return false;
            }

            return true;
        });

        handleSearch(filterInstructors);
    }, [filters])

    const handleSearchChange = e => {
        if (e.key === 'Enter') {
            onSearchSubmit();
        }
        setSearchText(e.target.value);
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

            <InstructorFiltersModal
              filters={filters}
              show={showFilter}
              onHide={handleCloseFilter}
              onExited={handleCloseFilter}
              handleApplyFilters={handleApplyFilters}
            />

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
