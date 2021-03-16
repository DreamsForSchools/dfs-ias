import React from "react";
import './Instructor.scss';
import Dot from "../../components/Dot";
import { formatAvailability } from "../../util/formatData";

function Instructor({ firstName, lastName, car, returnee, ASL, pref, availability }) {
  const programsColorKey = {
    "AppJam": "#4B4B92",
    "WebJam": "#E82029",
    "LESTEM": "#40CCC8",
    "Engineering Inventors": "#27AE60",
    "Scratch": "#F2994A"
  };

  return (
    <div className="instructor">
      <div className="name">
        {firstName} {lastName}
      </div>
      <div className="tags">
        {car ? <div className="tag">Car</div> : null}
        {returnee ? <div className="tag">Returnee</div> : null}
        {ASL ? <div className="tag">ASL</div> : null}
      </div>
      <div className="pref">
        {pref.map((el, idx) =>
            <Dot color={programsColorKey[el]} key={idx}/>
        )}
      </div>
      <div className="availability">
        {formatAvailability(availability).map((e) =>
          <h5>{e}</h5>
        )}
      </div>
    </div>
  );
}

export default Instructor;