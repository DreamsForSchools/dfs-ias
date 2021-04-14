// import React, { useState, useCallback, useReducer } from "react";
import React, { useContext, useState } from "react";
import { AppContext } from '../AppContextProvider';
import { getRandomInstructorSet } from "../../../util/sampleData";

import './Program.scss';
import Partner from './Partner.jsx';
// import { CaretRightFill, LockFill, UnlockFill } from 'react-bootstrap-icons';

const Program = ({ name, color }) => {
  // const [showContent, setShowContent] = useState(false);
  // const [lock, setLock] = useState(false);
  const { partners } = useContext(AppContext);

  return (
    <div className="program">
      <div className="program-module" style={{ backgroundColor: color }}>
        <div className="program-name">{name}</div>
        <div className="partners-container">
          {
            partners.map(partner => {             
              return (
                <Partner
                  name={partner}
                  instructors={getRandomInstructorSet(3)}
                  partnerId={partner}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Program;