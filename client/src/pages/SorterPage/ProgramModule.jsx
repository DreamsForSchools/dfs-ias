import React, { useState } from "react";
import './ProgramModule.scss';
import { Button } from "react-bootstrap";
import { CaretRightFill, CaretDownFill, LockFill, UnlockFill } from 'react-bootstrap-icons';

function ProgramModule({ name, color }) {
  const [showContent, setShowContent] = useState(false);
  const [lock, setLock] = useState(false);

  return (
    <div
      className="program-module"
      style={{ backgroundColor: color }}
      onClick={() => {
        setShowContent(!showContent);
      }}
    >
      <span className="title">
        <span className="program-left">
          {showContent ? <CaretDownFill className="icon" /> : <CaretRightFill className="icon" />}
          <div className="program-name">{name}</div>
        </span>
        <span className="program-right" 
          onClick={() => {
            setLock(!lock);
          }}
        >
          {lock ? <LockFill className="icon" /> : <UnlockFill className="icon" />}
        </span>
      </span>
      {/* {showContent && (
        <div className="program-content">Schools</div>
      )} */}
    </div>
  );
}

export default ProgramModule;