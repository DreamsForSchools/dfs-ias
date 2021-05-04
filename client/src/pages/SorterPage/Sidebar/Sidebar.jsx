import React, { useState } from 'react';
import "./Sidebar.scss";
import InstructorSearchForm from './InstructorSearchForm.jsx';
import SearchResult from './SearchResult.jsx';

const Sidebar = ({ state, handleFilter }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const applyFilters = (instructors) => {
    handleFilter(instructors);
    setShowFilter(false);
  }

  return (
    <div className="sidebar">
      <h1 className="title">Unassigned Instructors</h1>
      <InstructorSearchForm 
        setIsLoading={setIsLoading}
        state={state}
        applyFilters={applyFilters}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      />
      <SearchResult 
        isLoading={isLoading}
        state={state}
      />
    </div>
  );
}

export default Sidebar;
