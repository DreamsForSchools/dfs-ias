import React from 'react';
import './Navbar.scss';
import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import DFS_Logo from "../../assets/DFS_Logo.png";
const NavigationBar = () => {
    return (
        <Navbar collapseOnSelect className="navbar" expand="lg" sticky="top">
            <Navbar.Brand className="nav-brand" href="/"><img className="nav-logo" src={DFS_Logo} alt="Dreams for Schools IAS Logo" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link className="nav-link" href="/programs">Programs</Nav.Link>
                    <Nav.Link className="nav-link" href="/instructors">Instructors</Nav.Link>
                    <Nav.Link className="nav-link" href="/sorter">Sorter</Nav.Link>
                    <DropdownButton className="season-selector" menuAlign="right" title="Winter 2021">
                        <Dropdown.Item href="#/action-1">Winter 2021</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Fall 2020</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Summer 2020</Dropdown.Item>
                    </DropdownButton>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default NavigationBar;