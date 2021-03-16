import React from 'react';
import './Instructors.scss';
import Toolbar from './Toolbar';
import InstructorsTable from "./InstructorsTable";
import InstructorsSideInfo from "./InstructorsSideInfo";
import { getRandomInstructor, getRandomInstructorSet } from "../../util/sampleData";
import { Page, SideInfoWrapper, Wrapper } from '../../design-system/layout/Styled';

//dummy data: to be removed once connect to backend
import { INSTRUCTORS as instructors_data }  from '../../data/INSTRUCTORS';
import { PROGRAM_COLOR_KEYS as program_color_keys }  from '../../data/PROGRAMS';

function Instructors() {
    const [instructorFocus, setInstructorFocus] = React.useState();

    const handleInstructorRowClicked = (instructor) => {
        setInstructorFocus(instructor);
    }

    return (
        <Page>
            <Wrapper>
              <Toolbar />
              <InstructorsTable
                  handleInstructorRowClicked={handleInstructorRowClicked}
                  data={getRandomInstructorSet(12)}
                  programsColorKey={program_color_keys}
              />
            </Wrapper>
            <SideInfoWrapper className={"instructor-side-info_container"}>
                <InstructorsSideInfo
                    instructor={instructorFocus}
                    programsColorKey={program_color_keys}
                />
            </SideInfoWrapper>
        </Page>
    );
}
export default Instructors;