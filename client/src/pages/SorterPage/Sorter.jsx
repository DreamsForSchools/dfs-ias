import React from 'react';
import './Sorter.scss';
import Sidebar from './Sidebar.jsx';
import { Container, Row, Col } from "react-bootstrap";
import ProgramModule from './ProgramModule.jsx';

function Sorter() {
  return (
    <div className="sorter">
      <Container fluid className="sorter-container">
        <Row className="sorter-row">
          <Col xs={10} className="main-wrapper">
            <ProgramModule 
              name="AppJam"
              color="#4B4B92"
            />
            <ProgramModule 
              name="LESTEM"
              color="#40CCC8"
            />
            <ProgramModule 
              name="Scratch"
              color="#F2994A"
            />
            <ProgramModule 
              name="WebJam"
              color="#E82029"
            />
            <ProgramModule 
              name="Engineering Inventors"
              color="#27AE60"
            />    
          </Col>
          <Col xs={2} className="sidebar-wrapper">
            <Sidebar />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Sorter;