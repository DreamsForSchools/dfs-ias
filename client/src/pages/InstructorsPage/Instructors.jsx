import React from 'react';
import './Instructors.scss';
import Toolbar from './Toolbar';
import InstructorsTable from "./InstructorsTable";
import InstructorsSideInfo from "./InstructorsSideInfo";
import { Page, SideInfoWrapper, Wrapper } from '../../design-system/layout/Styled';
import { getRandomInstructorSet } from "../../util/sampleData";

//dummy data: to be removed once connect to backend
import { INSTRUCTORS as instructors_data }  from '../../data/INSTRUCTORS';
import { PROGRAM_COLOR_KEYS as program_color_keys }  from '../../data/PROGRAMS';

function Instructors() {
    const [instructorFocus, setInstructorFocus] = React.useState();
    const [instructorData, setInstructorData] = React.useState(null);

    const handleInstructorRowClicked = (instructor) => {
        setInstructorFocus(instructor);
    }


    React.useEffect(() => {
        getInstructor();
    }, [])

    const getInstructor = () => {
        setInstructorData(getRandomInstructorSet(12));
    };

    if (instructorData) {
        return (
            // <Page>
            //     <Wrapper>
            //       <Toolbar />
            //       <InstructorsTable
            //           handleInstructorRowClicked={handleInstructorRowClicked}
            //           data={getRandomInstructorSet(12)}
            //           programsColorKey={program_color_keys}
            //       />
            //     </Wrapper>
            //     <SideInfoWrapper className={"instructor-side-info_container"}>
            //         <InstructorsSideInfo
            //             instructor={instructorFocus}
            //             programsColorKey={program_color_keys}
            //         />
            //     </SideInfoWrapper>
            // </Page>
            <div className="instructors_page">
                <div className={"instructor-list_container"}>
                    <Toolbar/>
                    <InstructorsTable
                        handleInstructorRowClicked={handleInstructorRowClicked}
                        data={instructorData}
                        programsColorKey={program_color_keys}
                    />
                </div>
                <div className={"instructor-side-info_container"}>
                    <InstructorsSideInfo
                        instructor={instructorFocus}
                        programsColorKey={program_color_keys}
                    />
                </div>
            </div>
        );
    } else {
        return <></>
    }
}

export default Instructors;