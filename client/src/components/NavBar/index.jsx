import React, { useEffect, useState, useContext } from 'react';
import './Navbar.scss';
import {Navbar, Nav, Dropdown, DropdownButton, Modal, Button} from 'react-bootstrap';
import DFS_Logo from "../../assets/DFS_Logo.png";
import {PlusCircle} from "react-bootstrap-icons";
import { GlobalContext } from "../../context/GlobalContextProvider";
import {Input, Select} from "../../design-system/form";
import {Link, Switch} from "react-router-dom";
import DatePicker from 'react-datepicker';
import Lottie from "lottie-react";
import { DatePickerWrapper } from "./Styled";
import { StatusCodes } from 'http-status-codes';

import { loadSeason, saveSeason } from '../../api/season';

import seasonAnimation from "../../assets/season-animation.json";
import fire from "../../fire";

const NavigationBar = () => {
    const [signOut, setSignOut] = useState();
    const { seasonNameSelected, setSeasonNameSelected, setSeasonIdSelected, setToastText } = useContext(GlobalContext);

    const [seasonList, setSeasonList] = useState([]);
    const [showNewSeasonModal, setShowNewSeasonModal] = useState(false);
    const [newSeasonInput, setNewSeasonInput] = useState(
        {
            name: null,
            startDate: new Date(),
            endDate: new Date(),
        }
    )

    useEffect(() => {
        if (seasonList.length > 0) {
            setSeasonNameSelected(seasonList[0].name);
            setSeasonIdSelected(seasonList[0].seasonId);
        };
    }, [seasonList])

    useEffect(() => {
        fetchSeason();
    }, [])

    const fetchSeason = async () => {
        const seasonList = await loadSeason();
        setSeasonList(seasonList.sort((a, b) => {return new Date(b.startDate) - new Date(a.startDate)}));
    }

    const handleSeasonChange = (e, id) => {
        setSeasonNameSelected(e.target.firstChild.textContent);
        setSeasonIdSelected(id);
    }

    const handleShowNewSeasonModal = () => {
        setShowNewSeasonModal(true);
    }

    const handleCloseNewSeasonModal = () => {
        setShowNewSeasonModal(false);
    }

    const handleFormInput = (input = null, field) => {
        switch(field) {
            case "Season Name":
                setNewSeasonInput({...newSeasonInput, name: input})
                break;
            case "Start Date":
                setNewSeasonInput({...newSeasonInput, startDate: input})
                break;
            case "End Date":
                setNewSeasonInput({...newSeasonInput, endDate: input})
                break;
        }
    }

    const handleSubmit = async () => {
        try {
            const request = await saveSeason({
                name: newSeasonInput.name,
                startDate: newSeasonInput.startDate.toISOString().split('T')[0],
                endDate: newSeasonInput.endDate.toISOString().split('T')[0],
            });
            if (request.status === StatusCodes.OK) {
                setToastText({status: 'Success', message: `${request.data.sqlMessage}`});
                setShowNewSeasonModal(false);
                fetchSeason();
            }
        } catch (e) {
            setToastText({status: 'Failed', message: `${e.response.data.err.sqlMessage} -- Season added unsuccessfully.`});
            setShowNewSeasonModal(false);
        }
        setNewSeasonInput({
            name: null,
            startDate: new Date(),
            endDate: new Date(),
        });
    }


    function handleSignOut() {
        fire.auth().signOut();
    }


    // fire.auth().onAuthStateChanged((user) => {
    //     // fire.auth().signOut();
    //     if(user) {
    //         setSignOut(
    //             <Button variant="outline-primary" style={{marginLeft: '1rem'}} size="sm"
    //                     onClick={handleSignOut}>Sign Out</Button>
    //         );
    //     } else{
    //         setSignOut("");
    //     }
    // });


    const renderModal = (
        <>
            <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
                <Modal.Title>Create a new season</Modal.Title>
            </Modal.Header>
            <>
                <Modal.Body>
                    <div style={{padding: '2rem 4rem 0 4rem', display: 'flex', flexDirection: 'row'}}>
                        <div style={{width: '50%', marginRight: '1.5rem'}}>
                            <Lottie animationData={seasonAnimation}/>
                        </div>
                        <div style={{width: '50%', marginRight: '1.5rem'}}>
                            <Input label={'Season Name'} handler={handleFormInput} state={newSeasonInput.name} modal/>
                            <DatePickerWrapper>
                                <label>Start Date</label>
                                <DatePicker
                                    selected={newSeasonInput.startDate}
                                    onChange={date => handleFormInput(date, "Start Date")}
                                    selectsStart
                                    startDate={newSeasonInput.startDate}
                                    endDate={newSeasonInput.endDate}
                                />
                            </DatePickerWrapper>
                            <DatePickerWrapper>
                                <label>End Date</label>
                                <DatePicker
                                    selected={newSeasonInput.endDate}
                                    onChange={date => handleFormInput(date, "End Date")}
                                    selectsEnd
                                    startDate={newSeasonInput.startDate}
                                    endDate={newSeasonInput.endDate}
                                    minDate={newSeasonInput.startDate}
                                />
                            </DatePickerWrapper>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{border: '0', padding: '0 3rem 2rem 3rem'}}>
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                </Modal.Footer>
            </>
        </>
    );

    return (
        <>
            <Navbar collapseOnSelect className="navbar" expand="lg" sticky="top">
                <Navbar.Brand className="nav-brand" href="/"><img className="nav-logo" src={DFS_Logo} alt="Dreams for Schools IAS Logo" />
                </Navbar.Brand>
                <Button variant="outline-primary" style={{marginLeft: '1rem'}} size="sm"
                        onClick={handleSignOut}>Sign Out</Button>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Link className="nav-link" to={"/programs"}>Programs</Link>
                        <Link className="nav-link" to={"/instructors"}>Instructors</Link>
                        <Link className="nav-link" to={"/sorter"}>Sorter</Link>
                        <DropdownButton className="season-selector" menuAlign="right" title={seasonNameSelected}>
                            { seasonList.map((ele, idx) => (
                                <Dropdown.Item key={idx} onClick={(e) => handleSeasonChange(e, ele.seasonId)}>{ele.name}</Dropdown.Item>
                            ))}
                            <Dropdown.Item onClick={handleShowNewSeasonModal}><PlusCircle/>Create a new season</Dropdown.Item>
                        </DropdownButton>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Modal size="lg" show={showNewSeasonModal} onHide={handleCloseNewSeasonModal}>
                {renderModal}
            </Modal>


        </>
    )
}
export default NavigationBar;