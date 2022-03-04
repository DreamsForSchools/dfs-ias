import React from 'react';
import { Table, Badge, OverlayTrigger, Popover } from 'react-bootstrap';
import { TelephoneFill, CalendarWeek, X, Check } from 'react-bootstrap-icons';
import { formatAvailability, formatPhoneNumber } from "../../../util/formatData";
import Dot from '../../../design-system/dots';
import './AssignInstructorsTable.scss';

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
        otherLanguages,
        programmingLanguages,
        university,
        firstPref,
        secondPref,
        thirdPref,
        fourthPref,
        schoolYear,
        hasCar,
        isASL
    } = instructor;


    return (
        // put onclick funct for the tr
         
       
        <tr className={"assn-instructor-row"} >
            <td className={"info-stacks"}>
                <ul>
                <li>{firstName + " " + lastName}</li>
                <li> </li>
                <li> </li>
                <li> </li>
                </ul>
            </td>
            <td className={"info-stacks"}>
                <ul>
                    <li>{university}</li>
                    <li>{schoolYear}</li>
                    <li>{major}</li>
                </ul>
            </td>
            <td>{otherLanguages}</td>
            <td>{programmingLanguages}</td>
            <td >                
                {formatAvailability(instructor.availability).map((e) =>
                    <p key={e}>{e}</p>
                )}</td>
            <td>
            <div style={{ fontSize: "0.875 rem" }}>
                {
                    hasCar ? 
                    <Badge pill variant="success"> <Check /> Car </Badge> : 
                    <Badge pill variant="danger"> <X /> Car </Badge>
                }
                {
                    isASL ? 
                    <Badge pill variant="success"> <Check /> ASL </Badge> : 
                    <Badge pill variant="danger"> <X /> ASL </Badge>
                }
              </div>
            </td>
            <td>
                {/* <div style={{display: "inline-block"}}>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                            <Popover>
                                <Popover.Title as="h3">{`Program Preferences`}</Popover.Title>
                                <Popover.Content>
                                    {
                                        [firstPref, secondPref, thirdPref, fourthPref].map((el, idx) =>
                                            programsColorKey[el] && <h6 key={idx}>
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
                            {[firstPref, secondPref, thirdPref, fourthPref].map((el, idx) =>
                                programsColorKey[el] && <Dot color={programsColorKey[el]} key={idx}/>
                            )}
                        </div>
                    </OverlayTrigger>
                </div> */}
            </td>
        </tr>
        
        
    )
}



const AssignInstructorsTable = (props) => {

    const {
        filteredInstructors
    } = props;

    return (
        <div className="assn-table" >
            {/* <Badge pill variant="success"></Badge> */}
            <Table borderless>
                
        
                <thead className="assn-table-heading">
                <tr>
                    <th>Name</th>
                    <th>School</th>
                    <th>Other Languages</th>
                    <th>Programming Languages</th>
                    <th className="sched">Schedule</th>
                    <th>Tags</th>
                </tr>
                </thead>
                <tbody>
                     {/* {
                        console.log(filteredInstructors)
                    } */}
                    {/* <tr>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                    </tr> */}
                    {/* Loops over 'filteredInstructors' and creates a row for each one */}
                    {props.filteredInstructors.map((el, idx) =>
                        <InstructorsRow
                            instructor={el}
                            key={idx}
                            programsColorKey={props.programsColorKey}
                        />                     
                        
        
                        // <p>{el.firstName} </p>
                        
                    )} 
                </tbody>
            </Table>
        </div>
    )
}

export default AssignInstructorsTable;