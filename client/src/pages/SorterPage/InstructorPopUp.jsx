import React from "react";
import Dot from '../../design-system/dots';
import { formatAvailability, formatPhoneNumber } from "../../util/formatData";
import { Modal, Row, Col, OverlayTrigger, Popover, Badge } from "react-bootstrap";
import { TelephoneFill, CalendarWeek, X, Check } from 'react-bootstrap-icons';
import avatar from '../../assets/avatar.png';

const InstructorPopUp = ({ instructor }) => {
  const programsColorKey = {
    "AppJam": "#BB6BD9",
    "WebJam": "#40CCC8",
    "LESTEM": "#F2994A",
    "Engineering Inventors": "#4B4B92",
    "Scratch": "#F2C94C",
    "Mobile App Development (AppJam+)": "#BB6BD9",
    "Website Development": "#40CCC8",
    "Let's Explore STEM": "#F2994A",
    "Coding Games with Scratch": "#F2C94C"
  };

  return (
    <>
      <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
        <Modal.Title>Instructor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col style={{textAlign: "center"}}>
            <div className={"info"}>
              <h2 style={{fontWeight: "bold"}}>
                {instructor.firstName + " " + instructor.lastName}
              </h2>
              <div style={{margin: "2rem 0"}}>
                <img style={{width: "200px", display: "block", margin: "auto"}} src={avatar} alt="avatar" />
              </div>
              <h6>Preferences</h6>
              <div style={{display: "inline-block"}}>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Popover>
                      <Popover.Title as="h3">{`Program Preferences`}</Popover.Title>
                      <Popover.Content>
                        {[instructor.firstPref, instructor.secondPref, instructor.thirdPref, instructor.fourthPref].map((el, idx) =>
                          <h6 key={idx}>
                            <Dot color={programsColorKey[el]} />
                            <span style={{ paddingLeft: 8 }}>{el}</span>
                          </h6>
                        )}
                      </Popover.Content>
                    </Popover>
                  }
                >
                  <div style={{margin: "auto", paddingBottom: "1rem"}}>
                    {[instructor.firstPref, instructor.secondPref, instructor.thirdPref, instructor.fourthPref].map((el, idx) =>
                      <Dot color={programsColorKey[el]} key={idx} />
                    )}
                  </div>
                </OverlayTrigger>
              </div>
              <div style={{ fontSize: "1.5rem" }}>
                {instructor.hasCar
                  ? <Badge pill variant="success">
                    <Check /> Car
                  </Badge>
                  : <Badge pill variant="danger">
                    <X /> Car
                  </Badge>
                }
                {instructor.isASL
                  ? <Badge pill variant="success">
                    <Check /> ASL
                  </Badge>
                  : <Badge pill variant="danger">
                    <X /> ASL
                  </Badge>
                }
              </div>
            </div>
            <div style={{display: "flex", margin: "1rem 0rem"}}>
              <div className={"info"} style={{width: "30%"}}>
                <h6>Year</h6>
                <h5>{instructor.schoolYear}</h5>
              </div>
              <div className={"info"} style={{width: "30%"}}>
                <h6>Gender</h6>
                <h5>{instructor.gender}</h5>
              </div>
              <div className={"info"} style={{width: "40%"}}>
                <h6>Previously Taught</h6>
                <h5>{instructor.previouslyTaught}</h5>
              </div>
            </div>
          </Col>
          <Col>
            <div>
              <div className={"info"} style={{marginBottom: "1rem", textAlign: "left"}}>
                <h6>
                  <CalendarWeek/><span style={{marginLeft: "0.5rem"}}>Availability</span>
                </h6>
                {formatAvailability(instructor.availability).map((e) =>
                  <h5>{e}</h5>
                )}
              </div>
              <div className={"info"} style={{marginBottom: "1rem", textAlign: "left"}}>
                <h6>University</h6>
                <h5>{instructor.university}</h5>
              </div>
              <div className={"info"} style={{marginBottom: "1rem", textAlign: "left"}}>
                <h6>Major</h6>
                <h5>{instructor.major}</h5>
              </div>
              <div className={"info"} style={{marginBottom: "1rem", textAlign: "left"}}>
                <h6>Programming Languages</h6>
                <h5>{instructor.programmingLanguages}</h5>
              </div>
            </div>
          </Col>
          <Col>
            <div>
              <div className={"info"} style={{marginBottom: "1rem", textAlign: "left"}}>
                <h6>Ethnicity</h6>
                <h5>{instructor.ethnicity}</h5>
              </div>
              <div className={"info"} style={{marginBottom: "1rem", textAlign: "left"}}>
                <h6>Graduation Date</h6>
                <h5>{instructor.graduationDate}</h5>
              </div>
              <div className={"info"} style={{marginBottom: "1rem", textAlign: "left"}}>
                <h4 style={{textAlign: 'left'}}><TelephoneFill /><span style={{marginLeft: '1rem'}}>{formatPhoneNumber(instructor.phoneNumber)}</span></h4>
              </div>
              <div className={"info"} style={{marginBottom: "1rem", textAlign: "left"}}>
                <h6>Shirt Size</h6>
                <h5>{instructor.shirtSize}</h5>
              </div>
              <div className={"info"} style={{marginBottom: "1rem", textAlign: "left"}}>
                <h6>Languages Other Than English</h6>
                <h5>{instructor.languages}</h5>
              </div>              
            </div>
          </Col>               
        </Row>
      </Modal.Body>
    </>
  );
}
export default InstructorPopUp;