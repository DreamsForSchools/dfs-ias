import React from "react";
import './Instructor.scss';
import Dot from "../../components/Dot";
import { formatAvailability } from "../../util/formatData";

function Instructor({ instructorInfo }) {
  const programsColorKey = {
    "AppJam": "#BB6BD9",
    "WebJam": "#40CCC8",
    "LESTEM": "#F2994A",
    "Engineering Inventors": "#4B4B92",
    "Scratch": "#F2C94C"
  };

  return (
    <div className="instructor">
      <div className="name">
        {instructorInfo.firstName} {instructorInfo.lastName}
      </div>
      <div className="tags">
        {instructorInfo.hasCar ? <div className="tag">Car</div> : null}
        {instructorInfo.previouslyTaught ? <div className="tag">Returnee</div> : null}
        {instructorInfo.isASL ? <div className="tag">ASL</div> : null}
      </div>
      <div className="pref">
        {instructorInfo.pref.map((el, idx) =>
          <Dot color={programsColorKey[el]} key={idx}/>
        )}
      </div>
      <div className="availability">
        {formatAvailability(instructorInfo.availability).map((e) =>
          <h5>{e}</h5>
        )}
      </div>
    </div>
  );
}

export default Instructor;