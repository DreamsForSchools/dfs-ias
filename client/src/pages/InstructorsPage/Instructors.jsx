import React from 'react';
import './Instructors.scss';
import Toolbar from './Toolbar';
import InstructorsTable from "./InstructorsTable";
import InstructorsSideInfo from "./InstructorsSideInfo";
import { dummyInstructorSet } from "../../util/sampleData";

// const DUMMY_DATA = [
//     {
//         id: 1,
//         isActive: true,
//         email: "chheangm@uci.edu",
//         firstName: "Marawin",
//         lastName: "Chheang",
//         university: "UC Irvine",
//         major: "Software Engineer",
//         graduationDate: "Spring 2021",
//         seasonsTaught: "2",
//         shirtSize: "S",
//         pref: ["WebJam", "AppJam", "LESTEM", "Scratch"],
//         gender: "Male",
//         year: "2nd",
//         previouslyTaught: "Fall 2022",
//         isASL: true,
//         phoneNumber: "5622534941",
//         ethnicity: "Asian",
//         hasCar: true,
//         availability: [
//             {
//                 weekday: 1,
//                 startTime: "12:00:00",
//                 endTime: "14:00:00"
//             },
//             {
//                 weekday: 2,
//                 startTime: "12:00:00",
//                 endTime: "14:00:00"
//             },
//             {
//                 weekday: 3,
//                 startTime: "15:00:00",
//                 endTime: "18:00:00"
//             }
//         ]
//     },
//     {
//         id: 2,
//         isActive: false,
//         email: "ptanteater@uci.edu",
//         firstName: "Peter",
//         lastName: "Anteater",
//         university: "UC Irvine",
//         major: "Computer Science",
//         seasonsTaught: "5",
//         shirtSize: "XL",
//         pref: ["AppJam", "LESTEM", "WebJam", "Scratch"],
//         gender: "Male",
//         year: "4th",
//         graduationDate: "Spring 2020",
//         previouslyTaught: "Fall 2020",
//         hasCar: true,
//         isASL: false,
//         phoneNumber: "9142152941",
//         ethnicity: "Hispanic",
//         availability: [
//             {
//                 weekday: 3,
//                 startTime: "12:00:00",
//                 endTime: "14:00:00"
//             },
//             {
//                 weekday: 3,
//                 startTime: "15:00:00",
//                 endTime: "18:00:00"
//             }
//         ]
//     }
// ];
const DUMMY_PROGRAMS = {
        "AppJam": "#4B4B92",
        "WebJam": "#E82029",
        "LESTEM": "#40CCC8",
        "Engineering Inventors": "#27AE60",
        "Scratch": "#F2994A"
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
                  data={dummyInstructorSet}
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