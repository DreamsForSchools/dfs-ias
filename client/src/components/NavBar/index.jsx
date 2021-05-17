import React, { useState, useContext } from 'react';
import './Navbar.scss';
import {Navbar, Nav, Dropdown, DropdownButton, Modal, Button, Badge} from 'react-bootstrap';
import DFS_Logo from "../../assets/DFS_Logo.png";
import {PlusCircle} from "react-bootstrap-icons";
import { GlobalContext } from "../../context/GlobalContextProvider";
import {Link} from "react-router-dom";
import moment from 'moment';
import CreateNewSeasonModal from "../CreateNewSeasonModal";
import { saveSeason } from '../../api/season';

import fire from "../../fire";

const NavigationBar = () => {
    const {
        seasonSelected,
        setSeason,
        seasonData,
        fetchAllSeasonData,
    } = useContext(GlobalContext);

    const [showNewSeasonModal, setShowNewSeasonModal] = useState(false);

    const handleSeasonChange = (e, id) => {
        setSeason(id);
    }

    const handleShowNewSeasonModal = () => {
        setShowNewSeasonModal(true);
    }

    const handleCloseNewSeasonModal = () => {
        setShowNewSeasonModal(false);
    }

    const handleSubmit = async (seasonData) => {
        await saveSeason({
            name: seasonData.name,
            startDate: seasonData.startDate.toISOString().split('T')[0],
            endDate: seasonData.endDate.toISOString().split('T')[0],
        });
        localStorage.removeItem("seasonSelectedId");
        fetchAllSeasonData();
        setShowNewSeasonModal(false);
    }

    function handleSignOut() {
        fire.auth().signOut();
    }

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
                        <DropdownButton
                            className="season-selector"
                            menuAlign="right"
                            title={
                                seasonSelected &&
                                `${seasonSelected.name}`
                            }>
                            <Dropdown.Item onClick={handleShowNewSeasonModal}><PlusCircle/>&nbsp;&nbsp;
                                <Badge variant="primary" >
                                    Create a new season
                                </Badge>
                                </Dropdown.Item>
                            { seasonData && Object.values(seasonData).sort((a, b) => {
                                return new Date(b.startDate) - new Date(a.startDate);
                            }).map((ele, idx) => (
                                <Dropdown.Item key={idx} onClick={(e) => handleSeasonChange(e, ele.seasonId)}>
                                    {`${ele.name}`}
                                    <Badge
                                        variant={seasonSelected != null && ele.seasonId === seasonSelected.seasonId ? "warning" : "secondary"}
                                        style={{display: 'block', textAlign: 'center'}}>
                                            {`(${moment(ele.startDate).format('l')} - ${moment(ele.endDate).format('l')})`}
                                    </Badge>
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Modal size="lg" show={showNewSeasonModal} onHide={handleCloseNewSeasonModal}>
                <CreateNewSeasonModal handleSubmit={handleSubmit} />
            </Modal>
        </>
    )
}
export default NavigationBar;