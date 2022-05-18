import React, { useEffect, useState } from 'react';
import './Program.scss';
import Section from './Section.jsx';
import { Accordion, Card, Row } from 'react-bootstrap';
import { CaretRightFill, LockFill, UnlockFill } from 'react-bootstrap-icons';

const Program = ({ id, name, color, classes, state, seasonSelected }) => {
    const [showContent, setShowContent] = useState(false);
    const [lock, setLock] = useState(false);
    const handleLock = () => {
        setLock(true);
    };
    const handleUnlock = () => {
        setLock(false);
    };

    return (
        <Accordion className="program">
            <Card className="program-module" style={{ backgroundColor: color }}>
                <Accordion.Toggle
                    className="program-header"
                    onClick={() => {
                        setShowContent(!showContent);
                    }}
                    as={Card.Header}
                    eventKey="0">
                    {showContent ? (
                        <CaretRightFill className="caret-down" size={20} />
                    ) : (
                        <CaretRightFill className="caret-right" size={20} />
                    )}
                    <div className="program-name">{name}</div>
                    {/*<div className="lock" onClick={() => { setLock(!lock) }}>*/}
                    {/*  {lock ? <LockFill onClick={handleUnlock} className="icon" size={20}/> :*/}
                    {/*      <UnlockFill onClick={handleLock} className="icon" size={20}/>}*/}
                    {/*</div>*/}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body className="classes-container">
                        <Row>
                            {classes.length > 0
                                ? classes.map((c) => {
                                      return (
                                          <Section
                                              className="section"
                                              key={c.classId}
                                              id={c.classId}
                                              partner={c.partner?.name}
                                              time={c.timings}
                                              instructorsNeeded={
                                                  c.instructorsNeeded
                                              }
                                              instructors={c.instructors}
                                              programId={id}
                                              state={state}
                                              parentLockStatus={lock}
                                              seasonSelected={seasonSelected}
                                          />
                                      );
                                  })
                                : null}
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
};

export default Program;
