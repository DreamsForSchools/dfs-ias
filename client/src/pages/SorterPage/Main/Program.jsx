// import React, { useState, useCallback, useReducer } from "react";
import React, { useContext, useState } from "react";
import { AppContext } from '../AppContextProvider';

import './Program.scss';
import Partner from './Partner.jsx';
// import { CaretRightFill, LockFill, UnlockFill, Calendar4, People } from 'react-bootstrap-icons';

const Program = ({ name, color }) => {
  // const [showContent, setShowContent] = useState(false);
  // const [lock, setLock] = useState(false);
  const { partners } = useContext(AppContext);

  return (
    <div className="program">
      <div className="program-module" style={{ backgroundColor: color }}>
        {
          partners.map(partner => {             
            return (
              <Partner
                name={partner}
                instructors={[]}
              />
            )
          })
        }
      </div>
    </div>
  );
}

export default Program;