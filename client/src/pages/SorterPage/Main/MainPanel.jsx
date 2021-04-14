import React, { useContext } from 'react';
import { AppContext } from '../AppContextProvider';
import Program from './Program.jsx';

const MainPanel = () => {
  const { sorterData, setSorterData } = useContext(AppContext);
  const { programs, setPrograms } = useContext(AppContext);

  return (
    <div className="main-panel">
      {
        programs.map(program => {             
          return (
            <Program
              name={program.name}
              color={program.color}
            />
          )
        })
      }
    </div>
  );
}

export default MainPanel;