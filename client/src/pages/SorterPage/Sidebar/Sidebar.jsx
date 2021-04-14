import React, { useState } from 'react';
import "./Sidebar.scss";
import InstructorSearchForm from './InstructorSearchForm.jsx';
import SearchResult from './SearchResult.jsx';

const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="sidebar">
      <h1 className="title">Unassigned Instructors</h1>
      <InstructorSearchForm setIsLoading={setIsLoading}/>
      <SearchResult isLoading={isLoading}/>
    </div>
  );
}

export default Sidebar;
