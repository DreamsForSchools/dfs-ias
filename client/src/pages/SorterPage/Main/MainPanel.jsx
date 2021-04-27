import React, { useContext } from 'react';
import { AppContext } from '../AppContextProvider';
import Program from './Program.jsx';

const MainPanel = ({ state }) => {
  // const { sorterData, setSorterData } = useContext(AppContext);
  const { programs } = useContext(AppContext);

  return (
    <div className="main-panel">
      { programs.map(program => {             
          return (
            <Program
              key={program.index}
              name={program.name}
              color={program.color}
              state={state}
            />
          )
        })
      }
    </div>
  );
}

export default MainPanel;