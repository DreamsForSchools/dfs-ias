import React, {useState} from 'react';
import './OptionsBar.scss';
import {Form, Dropdown, Button, Col, Row, Container} from 'react-bootstrap';
import {MdAddCircleOutline} from 'react-icons/md';

const OptionBar = (props) => {
    const [viewValue, setViewValue] = useState("Programs");
    const [filterValue, setFilterValue] = useState("All");

    function handleView(e, props) {
        setViewValue(e);
        props.viewType(e);
    }

    function handleFilter(e, props) {
        setFilterValue(e);
        props.filterType(e);
    }

    return (
        <div className={"option-bar-components"}>

            <Container fluid>
                <Row>
                    <Col xs={6} s={6} md={4} >
                        <Dropdown className={"dropdown-view"}>
                            <label className="dropdown-label-view">View By:</label>
                            <Dropdown.Toggle id="selector">
                                {viewValue}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="selector-menu">
                                <Dropdown.Item as="button"
                                               onClick={(e) => handleView(e.target.textContent, props)}>Programs</Dropdown.Item>
                                <Dropdown.Item as="button"
                                               onClick={(e) => handleView(e.target.textContent, props)}>Partners</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col xs={6} s={6} md={5}>
                        <Dropdown className={"dropdown-filter"}>
                            <label className="dropdown-label-filter">Filter By:</label>
                            <Dropdown.Toggle id="selector">
                                {filterValue}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="selector-menu">
                                <Dropdown.Item as="button"
                                               onClick={(e) => handleFilter(e.target.textContent, props)}>All</Dropdown.Item>
                                <Dropdown.Item as="button"
                                               onClick={(e) => handleFilter(e.target.textContent, props)}>DFS Programs</Dropdown.Item>
                                <Dropdown.Item as="button"
                                               onClick={(e) => handleFilter(e.target.textContent, props)}>Housing Community</Dropdown.Item>
                                <Dropdown.Item as="button"
                                               onClick={(e) => handleFilter(e.target.textContent, props)}>Non-profit Partners</Dropdown.Item>
                                <Dropdown.Item as="button"
                                               onClick={(e) => handleFilter(e.target.textContent, props)}>Public Schools</Dropdown.Item>
                                <Dropdown.Item as="button"
                                               onClick={(e) => handleFilter(e.target.textContent, props)}>Private Schools</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col xs={6} s={6} md={1} >
                        <Button className={"add-button"}>Add Program <MdAddCircleOutline size={25} /></Button>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}

export default OptionBar;

// <Container>
//     <Row>
//         <Col xs={6} md={4}>
//             xs=6 md=4
//         </Col>
//         <Col xs={6} md={4}>
//             xs=6 md=4
//         </Col>
//         <Col xs={6} md={4}>
//             xs=6 md=4
//         </Col>
//     </Row>
// </Container>

//
// <div className={"option-bar_container"}>
//     <div className={"dropdowns"}>
//         <Dropdown>
//             <label className="dropdown-label">View By:</label>
//             <Dropdown.Toggle id="view-selector">
//                 {viewValue}
//             </Dropdown.Toggle>
//
//             <Dropdown.Menu className="view-selector-menu">
//                 <Dropdown.Item as="button"
//                                onClick={(e) => setViewValue(e.target.textContent)}>Index</Dropdown.Item>
//                 <Dropdown.Item as="button"
//                                onClick={(e) => setViewValue(e.target.textContent)}>Partners</Dropdown.Item>
//             </Dropdown.Menu>
//         </Dropdown>
//         <Dropdown className={"dropdowns-2"}>
//             <label className="dropdown-label-2">Filter By:</label>
//             <Dropdown.Toggle id="view-selector">
//                 {filterValue}
//             </Dropdown.Toggle>
//
//             <Dropdown.Menu className="view-selector-menu">
//                 <Dropdown.Item as="button"
//                                onClick={(e) => setFilterValue(e.target.textContent)}>All</Dropdown.Item>
//                 <Dropdown.Item as="button"
//                                onClick={(e) => setFilterValue(e.target.textContent)}>DFS Index</Dropdown.Item>
//                 <Dropdown.Item as="button"
//                                onClick={(e) => setFilterValue(e.target.textContent)}>Housing Communities</Dropdown.Item>
//                 <Dropdown.Item as="button"
//                                onClick={(e) => setFilterValue(e.target.textContent)}>Non-profit Partners</Dropdown.Item>
//                 <Dropdown.Item as="button"
//                                onClick={(e) => setFilterValue(e.target.textContent)}>Public Schools</Dropdown.Item>
//                 <Dropdown.Item as="button"
//                                onClick={(e) => setFilterValue(e.target.textContent)}>Private Schools</Dropdown.Item>
//             </Dropdown.Menu>
//         </Dropdown>
//     </div>
//     <div className={"buttons"}>
//         <Button className={"add-button"}>Add Program <MdAddCircleOutline size={25} /></Button>
//     </div>
//
// </div>