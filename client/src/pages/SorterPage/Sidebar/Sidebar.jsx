import React, { useState } from 'react';
import "./Sidebar.scss";
import InstructorSearchForm from './InstructorSearchForm.jsx';
import SearchResult from './SearchResult.jsx';
import Lottie from 'lottie-react';
import emptyAnimation from '../../../assets/empty-animation.json';

const Sidebar = ({ state, handleFilter, handleSearch, handleAutoAssign, instructorData, lockedInstructors}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="sidebar">
      <h1 className="title">Unassigned Instructors</h1>
      <InstructorSearchForm 
        setIsLoading={setIsLoading}
        state={state}
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        handleAutoAssign={handleAutoAssign}
        instructorData={instructorData}
        lockedInstructors={lockedInstructors}
      />
      { instructorData === null || instructorData.length === 0 ? 
        <div style={{textAlign: 'center'}}>
          <Lottie animationData={emptyAnimation} style={{width: 200, height: 200, margin: 'auto'}} />
        </div>
      : 
        <SearchResult 
          isLoading={isLoading}
          state={state}
        />
      }
    </div>
  );
}

export default Sidebar;
