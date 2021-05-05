import React from 'react';
import Program from './Program.jsx';

const MainPanel = ({ state }) => {

  return (
    <div className="main-panel">
      { state["programs"].map(program => {             
          return (
            <Program
              key={program.index}
              name={program.name}
              color={program.color}
              classes={program.classes}
              state={state}
            />
          )
        })
      }
    </div>
  );
}

export default MainPanel;