import React from "react";
import './Program.scss';
import Class from './Class.jsx';
// import { CaretRightFill, LockFill, UnlockFill } from 'react-bootstrap-icons';

const Program = ({ name, color, classes }) => {
  // const [showContent, setShowContent] = useState(false);
  // const [lock, setLock] = useState(false);

  return (
    <div className="program">
      <div className="program-module" style={{ backgroundColor: color }}>
        <div className="program-name">{name}</div>
        <div className="classes-container">
          {
            classes.map(c => {             
              return (
                <div>
                  <Class
                    key={c.id}
                    index={c.id}
                    partner={c.partner}
                    time={c.time}
                    slotCount={c.slotCount}
                    instructors={c.instructors}
                    programName={name}
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