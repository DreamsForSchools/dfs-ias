import React, { useState } from 'react';
import "./Sidebar.scss";
import InstructorSearchForm from './InstructorSearchForm.jsx';
import SearchResult from './SearchResult.jsx';

const Sidebar = ({ state }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const applyFilters = () => {
    state["search"] = state["search"].filter(instructor => instructor.hasCar)
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
