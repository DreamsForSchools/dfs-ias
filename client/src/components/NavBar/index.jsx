import React, { useEffect, useState, useContext } from 'react';
import './Navbar.scss';
import {Navbar, Nav, Dropdown, DropdownButton, Modal, Button} from 'react-bootstrap';
import DFS_Logo from "../../assets/DFS_Logo.png";
import {PlusCircle} from "react-bootstrap-icons";
import { GlobalContext } from "../../context/GlobalContextProvider";
import {Input, Select} from "../../design-system/form";
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import Lottie from "lottie-react";
import { DatePickerWrapper } from "./Styled";

import CreateNewSeasonModal from "../CreateNewSeasonModal";
import { loadSeason, saveSeason } from '../../api/season';
import {StatusCodes} from "http-status-codes";

const NavigationBar = () => {
    const { seasonNameSelected, setSeasonNameSelected, setSeasonIdSelected, setToastText } = useContext(GlobalContext);

    const [seasonList, setSeasonList] = useState([]);
    const [showNewSeasonModal, setShowNewSeasonModal] = useState(false);

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
        try {
            const seasonList = await loadSeason();
            setSeasonList(seasonList.data.sort((a, b) => {return new Date(b.startDate) - new Date(a.startDate)}));
        } catch (e) {
            setToastText({status: 'Failed', message: `${e.response.data}`});
        }

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

    const handleSubmit = async (seasonData) => {
        try {
            const request = await saveSeason({
                name: seasonData.name,
                startDate: seasonData.startDate.toISOString().split('T')[0],
                endDate: seasonData.endDate.toISOString().split('T')[0],
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
    }

    return (
        <>
            <Navbar collapseOnSelect className="navbar" expand="lg" sticky="top">
                <Navbar.Brand className="nav-brand" href="/"><img className="nav-logo" src={DFS_Logo} alt="Dreams for Schools IAS Logo" /></Navbar.Brand>
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
                <CreateNewSeasonModal handleSubmit={handleSubmit} />
            </Modal>
        </>
    )
}
export default NavigationBar;