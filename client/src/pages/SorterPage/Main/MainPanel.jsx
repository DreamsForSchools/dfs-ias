import React from 'react';
import Program from './Program.jsx';

const MainPanel = ({ state }) => {

  return (
    <div className="main-panel">
      { state["programs"].map(program => {             
          return (
            <Program
              key={program.programId}
              id={program.programId}
              name={program.name}
              color={program.color}
              classes={program.classes}
            />
          )
        })
      }
    </div>
  );
}

export default MainPanel;