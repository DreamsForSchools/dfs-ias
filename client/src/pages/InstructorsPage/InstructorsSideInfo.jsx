import React from "react";
import Fade from 'react-reveal/Fade';
import { PencilSquare, CalendarWeek, TelephoneFill, X, Check } from 'react-bootstrap-icons';
import { Button, OverlayTrigger, Popover, Badge } from 'react-bootstrap';
import Dot from "../../components/Dot";
import avatar from '../../assets/avatar.png';

const formatPhoneNumber = (number) => {
    return `(${number.substring(0, 3)}) ${number.substring(3, 6)}-${number.substring(6, 10)}`;
}

const formatMilitaryTime = (time) => {
    let hour = Number(time.substring(0, 2));
    let suffix = hour >= 12 ? "pm":"am";
    let standardHour = (hour + 11) % 12 + 1;

    return `${standardHour}:${time.substring(3,5)} ${suffix}`;
}

const formatAvailability = (availability) => {
    let bucket = {};
    let dateKey = {1: 'M', 2: 'Tu', 3: 'W', 4: 'Th', 5: 'F'};
    let result = [];

    availability.forEach((slot) => {
        let timeAvailable = `${formatMilitaryTime(slot.startTime)} - ${formatMilitaryTime(slot.endTime)}`;
        if (!bucket.hasOwnProperty(timeAvailable)) {
            bucket[timeAvailable] = [slot.weekday];
        } else {
            bucket[timeAvailable].push(slot.weekday);
        }
    })

    Object.keys(bucket).forEach((key) => {
        let dates = '';
        bucket[key].forEach((d) => dates += dateKey[d]);
        result.push(`${dates} ${key}`)
    })

    return(result);
}

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
                                            instructor.pref.map((el, idx) =>
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
                                {instructor.pref.map((el, idx) =>
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
                        {instructor.seasonsTaught > 1
                            ? <Badge pill variant="success">
                                <Check /> Returnee
                            </Badge>
                            : <Badge pill variant="danger">
                                <X /> Returnee
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
                        <div className={"info"} style={{width: "25%"}}>
                            <h6>
                                Year
                            </h6>
                            <h5>
                                {instructor.year}
                            </h5>
                        </div>

                        <div className={"info"} style={{width: "25%"}}>
                            <h6>
                                Gender
                            </h6>
                            <h5>
                                {instructor.gender}
                            </h5>
                        </div>

                        <div className={"info"} style={{width: "75%"}}>
                            <h6>
                                Previously Taught
                            </h6>
                            <h5>
                                {instructor.previouslyTaught}
                            </h5>
                        </div>
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