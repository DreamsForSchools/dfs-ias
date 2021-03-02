import React, { useState } from "react";
import './ProgramModule.scss';
import { Accordion, Card } from "react-bootstrap";
import { CaretRightFill, CaretDownFill, LockFill, UnlockFill } from 'react-bootstrap-icons';

function ProgramModule({ name, color }) {
  const [showContent, setShowContent] = useState(false);
  const [lock, setLock] = useState(false);

  return (
    <Accordion>
      <Card className="program-module" style={{ backgroundColor: color }}>
        <Card.Header>
          <Accordion.Toggle className="program-header" onClick={() => {setShowContent(!showContent)}} as={Card.Header} eventKey="0">
            <span className="program-left">
              {showContent ? <CaretDownFill className="icon" /> : <CaretRightFill className="icon" />} 
              <div className="program-name">{name}</div>
            </span>
            <span className="program-right" onClick={() => {setLock(!lock)}}>
              {lock ? <LockFill className="icon" /> : <UnlockFill className="icon" />}
            </span>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="program-body">
            Hello! I'm the body
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>


    // <div
    //   className="program-module"
    //   style={{ backgroundColor: color }}
    //   onClick={() => {
    //     setShowContent(!showContent);
    //   }}
    // >
    //   <span className="title">
    //     <span className="program-left">
    //       {showContent ? <CaretDownFill className="icon" /> : <CaretRightFill className="icon" />}
    //       <div className="program-name">{name}</div>
    //     </span>
    //     <span className="program-right" 
    //       onClick={() => {
    //         setLock(!lock);
    //       }}
    //     >
    //       {lock ? <LockFill className="icon" /> : <UnlockFill className="icon" />}
    //     </span>
    //   </span>
    //   {showContent && (
    //     <div className="program-content">
    //       Schools
    //     </div>
    //   )}
    // </div>
  );
}

export default ProgramModule;