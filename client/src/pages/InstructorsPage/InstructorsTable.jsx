import React from 'react';
import { Table, Badge, OverlayTrigger, Popover } from 'react-bootstrap';
import Dot from '../../design-system/dots';
import {color} from '../../design-system/style';
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
        firstPref,
        secondPref,
        thirdPref,
        fourthPref,
        schoolYear
    } = instructor;


    

    return (
        <tr className={"instructor_row"} onClick={() => onClick(instructor)}>
            <td>{firstName + " " + lastName}</td>
            <td>{schoolYear}</td>
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
                </div>
            </td>
        </tr>
    )
}



const InstructorsTable = (props) => {
    // props.searchFlag btw
    const {
        onNameClick,
        nameFlag,
        onYearClick,
        yearFlag,
        onMajorClick,
        majorFlag,
        onUniClick,
        uniFlag

    }=props;
    // const [instructors, setInstructors] = React.useState([]);
    
   
  
    

    

    

    

    return (
        <div  className={"instructor_table"} style={{ overflowY: 'scroll', height: '80vh'}}>
            <Badge pill variant="success"></Badge>
            <Table borderless>
                <thead>
                <tr>
                    <th onClick = {onNameClick} 
                    style={nameFlag ?  {color: color.solid.MIDGRAY} : {color:color.solid.BLUE} } >Instructor's Name</th>
                    <th onClick = {onYearClick}
                     style={yearFlag ?  {color: color.solid.MIDGRAY} : {color:color.solid.BLUE} }>Year</th>
                    <th onClick = {onMajorClick}
                     style={majorFlag ?  {color: color.solid.MIDGRAY} : {color:color.solid.BLUE}} >Major</th>
                    <th onClick = {onUniClick}
                     style={uniFlag ?  {color: color.solid.MIDGRAY} : {color:color.solid.BLUE} }>University</th>
                    <th>Preferences</th>
                </tr>
                </thead>
                <tbody>
                    {
                    // note props being directly used
                    props.data.map((el, idx) =>
                    <InstructorsRow
                        instructor={el}
                        key={idx}
                        programsColorKey={props.programsColorKey}
                        onClick={props.handleInstructorRowClicked}
                    />)
                    }
                    
                </tbody>
            </Table>
        </div>
    )
}

export default InstructorsTable;
