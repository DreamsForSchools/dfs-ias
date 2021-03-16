import React from 'react';
import './Sorter.scss';
import Sidebar from './Sidebar.jsx';
import ProgramModule from './ProgramModule.jsx';

function Sorter() {
  return (
    <div className="sorter">
      <div className="main-wrapper">
        <ProgramModule
          name="AppJam"
          color="#BB6BD9"
        />
        <ProgramModule
          name="LESTEM"
          color="#F2994A"
        />
        <ProgramModule
          name="Scratch"
          color="#F2C94C"
        />
        <ProgramModule
          name="WebJam"
          color="#40CCC8"
        />
        <ProgramModule
          name="Engineering Inventors"
          color="#4B4B92"
        />
      </div>
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
    </div>

  );
}
export default Sorter;