import React from 'react';
import Program from './Program.jsx';
import './MainPanel.css';

const MainPanel = ({ state }) => {

  return (
    <div className="main-panel">
      { state["programs"].length > 0 ? state["programs"].map(program => {             
          return (
            <Program
              key={program.programId}
              id={program.programId}
              name={program.name}
              color={program.color}
              classes={program.classes}
              state={state}
            />
          )
        }) 
      : null }
    </div>
  );
}

export default MainPanel;