import React from 'react';
import './Instructors.scss';
import Toolbar from './Toolbar';
import InstructorsTable from "./InstructorsTable";
import InstructorsSideInfo from "./InstructorsSideInfo";
import { getRandomInstructor, getRandomInstructorSet } from "../../util/sampleData";

//dummy data: to be removed once connect to backend
import { INSTRUCTORS as instructors_data }  from '../../data/INSTRUCTORS'

const DUMMY_PROGRAMS = {
        "AppJam": "#BB6BD9",
        "WebJam": "#40CCC8",
        "LESTEM": "#F2994A",
        "Engineering Inventors": "#4B4B92",
        "Scratch": "#F2C94C"
    };

function Instructors() {
    const [instructorFocus, setInstructorFocus] = React.useState();

    const handleInstructorRowClicked = (instructor) => {
        setInstructorFocus(instructor);
    }

    return (
        <div className="instructors_page">
            <div className={"instructor-list_container"}>
              <Toolbar />
              <InstructorsTable
                  handleInstructorRowClicked={handleInstructorRowClicked}
                  data={getRandomInstructorSet(12)}
                  programsColorKey={DUMMY_PROGRAMS}
              />
            </div>
            <div className={"instructor-side-info_container"}>
                <InstructorsSideInfo
                    instructor={instructorFocus}
                    programsColorKey={DUMMY_PROGRAMS}
                />
            </div>
        </div>
    );
}
export default Instructors;