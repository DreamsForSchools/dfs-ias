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
          color="#4B4B92"
        />
        <ProgramModule
          name="LESTEM"
          color="#40CCC8"
        />
        <ProgramModule
          name="Scratch"
          color="#F2994A"
        />
        <ProgramModule
          name="WebJam"
          color="#E82029"
        />
        <ProgramModule
          name="Engineering Inventors"
          color="#27AE60"
        />
      </div>
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
    </div>

  );
}
export default Sorter;