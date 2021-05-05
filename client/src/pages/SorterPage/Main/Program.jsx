import React from "react";
import './Program.scss';
import Class from './Class.jsx';
// import { CaretRightFill, LockFill, UnlockFill } from 'react-bootstrap-icons';
import { getRandomInstructorSet } from "../../../util/sampleData";


const Program = ({ name, color, classes, state }) => {
  // const [showContent, setShowContent] = useState(false);
  // const [lock, setLock] = useState(false);

  return (
    <div className="program">
      <div className="program-module" style={{ backgroundColor: color }}>
        <div className="program-name">{name}</div>
        <div className="partners-container">
          {
            classes.map(c => {             
              return (
                <div>
                  <Class
                    key={c.index}
                    name={c.partner}
                    index={c.index}
                    instructors={getRandomInstructorSet(2)}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Program;