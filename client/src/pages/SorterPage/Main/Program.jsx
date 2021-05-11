import React, { useState } from "react";
import './Program.scss';
import Class from './Class.jsx';
import { Accordion, Card, Row } from "react-bootstrap";
import { CaretRightFill, LockFill, UnlockFill } from 'react-bootstrap-icons';

const Program = ({ name, color, classes }) => {
  const [showContent, setShowContent] = useState(false);
  const [lock, setLock] = useState(false);

  return (
    <Accordion className="program">
      <Card className="program-module" style={{ backgroundColor: color }}>
        <Accordion.Toggle className="program-header" onClick={() => { setShowContent(!showContent) }} as={Card.Header} eventKey="0">
          {showContent ? <CaretRightFill className="caret-down" size={20} /> : <CaretRightFill className="caret-right" size={20} />}
          <div className="program-name">{name}</div>
          <div className="lock" onClick={() => { setLock(!lock) }}>
            {lock ? <LockFill className="icon" size={20} /> : <UnlockFill className="icon" size={20} />}
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="classes-container">
            <Row>
              { classes.map(c => {             
                  return (
                    <Class
                      className="class"
                      key={c.id}
                      index={c.id}
                      partner={c.partner}
                      time={c.time}
                      slotCount={c.slotCount}
                      instructors={c.instructors}
                      programName={name}
                    />
                  )
              })}
            </Row>
          </Card.Body>
        </Accordion.Collapse> 
      </Card>
    </Accordion>
  );
}

export default Program;