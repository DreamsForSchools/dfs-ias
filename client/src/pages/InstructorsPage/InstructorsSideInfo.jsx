import React from "react";
import Fade from 'react-reveal/Fade';
import { PencilSquare, CalendarWeek, TelephoneFill, X, Check } from 'react-bootstrap-icons';
import { Button, OverlayTrigger, Popover, Badge } from 'react-bootstrap';
import Dot from '../../design-system/dots';
import avatar from '../../assets/avatar.png';
import { formatAvailability, formatPhoneNumber } from "../../util/formatData";

const InstructorsSideInfo = (props) => {
    const { instructor, programsColorKey } = props;

    if (instructor) {
        formatAvailability(instructor.availability);
    }

    if (!instructor) {
        return (
            <></>
        )
    }

    return (
        <div className={'instructor-side-info'}>
            <Fade right duration={200}>
                <div>
                    <h1 style={{fontWeight: "bold", textAlign: "center"}}>
                        {instructor.firstName + " " + instructor.lastName}
                    </h1>
                    <Button variant="info">Edit Instructor
                        <span style={{marginLeft: '0.5rem'}}><PencilSquare/></span>
                    </Button>

                    <div style={{margin: "2rem 0"}}>
                        <img style={{width: "200px"}} src={avatar} />
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
                                        {
                                            [instructor.firstPref, instructor.secondPref, instructor.thirdPref, instructor.fourthPref].map((el, idx) =>
                                                <h6 key={idx}>
                                                    <Dot color={programsColorKey[el]} />
                                                    <span style={{
                                                        paddingLeft: 8
                                                    }}>{el}</span>
                                                </h6>
                                            )
                                        }
                                    </Popover.Content>
                                </Popover>
                            }
                        >
                            <div>
                                {[instructor.firstPref, instructor.secondPref, instructor.thirdPref, instructor.fourthPref].map((el, idx) =>
                                    <Dot color={programsColorKey[el]} key={idx}/>
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

                    <div className={"grouped-info_container"}>
                        <div className={"info"} style={{width: "50%"}}>
                            <h6>
                                Year
                            </h6>
                            <h5>
                                {instructor.schoolYear}
                            </h5>
                        </div>

                        <div className={"info"} style={{width: "50%"}}>
                            <h6>
                                Gender
                            </h6>
                            <h5>
                                {instructor.gender}
                            </h5>
                        </div>

                        {/*<div className={"info"} style={{width: "75%"}}>*/}
                        {/*    <h6>*/}
                        {/*        Previously Taught*/}
                        {/*    </h6>*/}
                        {/*    <h5>*/}
                        {/*        {instructor.previouslyTaught}*/}
                        {/*    </h5>*/}
                        {/*</div>*/}
                    </div>

                    <div className={"grouped-info_container"}>
                        <div className={"info"} style={{width: "100%", textAlign: "left"}}>
                            <h6>
                                <CalendarWeek/><span style={{marginLeft: "0.5rem"}}>Availability</span>
                            </h6>
                            {formatAvailability(instructor.availability).map((e) =>
                                <h5>{e}</h5>
                            )}
                        </div>
                    </div>

                    <div className={"grouped-info_container"}>
                        <div className={"info-transparent"} style={{width: "100%", textAlign: "left"}}>
                            <h4 style={{textAlign: 'left'}}><TelephoneFill /><span style={{marginLeft: '1rem'}}>{formatPhoneNumber(instructor.phoneNumber)}</span></h4>
                        </div>
                    </div>

                    <div className={"grouped-info_container"}>
                        <div className={"info-transparent"} style={{width: "100%", textAlign: "left"}}>
                            <h6>
                                University
                            </h6>
                            <h5>
                                {instructor.university}
                            </h5>
                        </div>
                    </div>

                    <div className={"grouped-info_container"}>
                        <div className={"info-transparent"} style={{width: "60%", textAlign: "left"}}>
                            <h6>
                                Major
                            </h6>
                            <h5>
                                {instructor.major}
                            </h5>
                        </div>
                        <div className={"info-transparent"} style={{width: "40%", textAlign: "left"}}>
                            <h6>
                                Graduation Date
                            </h6>
                            <h5>
                                {instructor.graduationDate}
                            </h5>
                        </div>
                    </div>
                    <div className={"grouped-info_container"}>
                        <div className={"info-transparent"} style={{width: "60%", textAlign: "left"}}>
                            <h6>
                                Ethnicity
                            </h6>
                            <h5>
                                {instructor.ethnicity}
                            </h5>
                        </div>
                        <div className={"info-transparent"} style={{width: "40%", textAlign: "left"}}>
                            <h6>
                                Shirt Size
                            </h6>
                            <h5>
                                {instructor.shirtSize}
                            </h5>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    )
}

export default InstructorsSideInfo;