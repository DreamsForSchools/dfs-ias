import React from 'react';
import { Table, Badge, OverlayTrigger, Popover } from 'react-bootstrap';
import Dot from '../../design-system/dots';

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
    const [instructors, setInstructors] = React.useState(props.data);
    const [nameFlag,setNameFlag] = React.useState(true);
    const [yearFlag,setYearFlag] = React.useState(true);
    const [majorFlag, setMajorFlag] = React.useState(true);
    const [uniFlag, setUniFlag] = React.useState(true);

    // const instructors = props.data;
    // instructors is type array
    const onNameClick = () => {
        
        console.log("instructor name clicked");
        const sort_instructors = instructors.sort((a, b) => a.firstName.localeCompare(b.firstName));
        if(nameFlag)
        {
            setInstructors(sort_instructors);
            setNameFlag(false);
        }
        else
        {
            setInstructors(sort_instructors.reverse());
            setNameFlag(true);
        }
        
    };

    const onYearClick = () => {
        
        console.log("year clicked");
        const first = 1;
        const second = 2;
        const third = 3;
        const fourth_plus = 4;
        const graduate = 5;
        const graduated = 6;

        // export const schoolYear = 
    // '1st',
    // '2nd',
    // '3rd',
    // '4th+',
    // 'Graduate',
    // 'Graduated'
    // 
        
        //  hardcoded; 
        const sort_instructors = instructors.sort((a, b) =>
        {
            
            let a_val = 0;
            let b_val = 0;
            switch(a.schoolYear) {
                case '1st':
                  a_val = first;
                  break;
                case '2nd':
                  a_val = second;
                  break;
                case '3rd':
                  a_val = third;
                  break;
                case '4th+':
                  a_val = fourth_plus;
                  break;
                case 'Graduate':
                  a_val = graduate;
                  break;
                case 'Graduated':
                  a_val = graduated;
                  break;
                default:
                  break;
              }

              switch(b.schoolYear) {
                case '1st':
                  b_val = first;
                  break;
                case '2nd':
                  b_val = second;
                  break;
                case '3rd':
                  b_val = third;
                  break;
                case '4th+':
                  b_val = fourth_plus;
                  break;
                case 'Graduate':
                  b_val = graduate;
                  break;
                case 'Graduated':
                  b_val = graduated;
                  break;
                default:
                  break;
              }

              return a_val - b_val;
        }
        );

        if(yearFlag)
        {
            setInstructors(sort_instructors);
            setYearFlag(false);
        }
        else
        {
            setInstructors(sort_instructors.reverse());
            setYearFlag(true);
        }
        
    };

    const onMajorClick = () => {
        
        console.log("major clicked");
        
        const sort_instructors = instructors.sort((a, b) => a.major.localeCompare(b.major));
        if(majorFlag)
        {
            setInstructors(sort_instructors);
            setMajorFlag(false);
        }
        else
        {
            setInstructors(sort_instructors.reverse());
            setMajorFlag(true);
        }
        
    };

    const onUniClick = () => {
        
        console.log("University clicked");
        
        const sort_instructors = instructors.sort((a, b) => a.university.localeCompare(b.university));
        if(uniFlag)
        {
            setInstructors(sort_instructors);
            setUniFlag(false);
        }
        else
        {
            setInstructors(sort_instructors.reverse());
            setUniFlag(true);
        }
        
    };


    return (
        <div className={"instructor_table"} style={{ overflowY: 'scroll', height: '80vh'}}>
            <Badge pill variant="success"></Badge>
            <Table borderless>
                <thead>
                <tr>
                    <th onClick = {onNameClick} >Instructor's Name</th>
                    <th onClick = {onYearClick}>Year</th>
                    <th onClick = {onMajorClick}>Major</th>
                    <th onClick = {onUniClick}>University</th>
                    <th>Preferences</th>
                </tr>
                </thead>
                <tbody>
                    {/* {props.data.map((el, idx) =>
                        <InstructorsRow
                            instructor={el}
                            key={idx}
                            programsColorKey={props.programsColorKey}
                            onClick={props.handleInstructorRowClicked}
                        />
                     */
                    // testing so we can sort the props first
                    instructors.map((el, idx) =>
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
