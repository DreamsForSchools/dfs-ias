import React from 'react';
import { Table, Badge, OverlayTrigger, Popover } from 'react-bootstrap';
import Dot from '../../components/Dot';

const InstructorsRow = (props) => {
    const {
        programsColorKey,
        onClick,
        instructor
    } = props;

    const {
        firstName,
        lastName,
        isActive,
        year,
        major,
        university,
        pref
    } = instructor;

    return (
        <tr className={"instructor_row"} onClick={() => onClick(instructor)}>
            <td>{isActive
                ? <Dot color={"#40CC4E"}/>
                : <Dot color={"#EB5757"}/>}
            </td>
            <td>{firstName + " " + lastName}</td>
            <td>{year}</td>
            <td>{major}</td>
            <td>{university}</td>
            <td>
                <div style={{display: "inline-block"}}>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                            <Popover>
                                <Popover.Title as="h3">{`Program Preferences`}</Popover.Title>
                                <Popover.Content>
                                    {
                                        pref.map((el, idx) =>
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
                        <div style={{padding: "0 1rem"}}>
                            {pref.map((el, idx) =>
                                <Dot color={programsColorKey[el]} key={idx}/>
                            )}
                        </div>
                    </OverlayTrigger>
                </div>
            </td>
        </tr>
    )
}

const InstructorsTable = (props) => {
    return (
        <div className={"instructor_table"}>
            <Badge pill variant="success"></Badge>
            <Table borderless>
                <thead>
                <tr>
                    <th></th>
                    <th>Instructor's Name</th>
                    <th>Year</th>
                    <th>Major</th>
                    <th>University</th>
                    <th>Preferences</th>
                </tr>
                </thead>
                <tbody>
                    {props.data.map((el, idx) =>
                        <InstructorsRow
                            instructor={el}
                            key={idx}
                            programsColorKey={props.programsColorKey}
                            onClick={props.handleInstructorRowClicked}
                        />
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default InstructorsTable;