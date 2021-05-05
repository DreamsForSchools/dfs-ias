import React from "react";
import { Droppable, Draggable } from 'react-beautiful-dnd';
// import React, { useContext } from "react";
// import { AppContext } from '../AppContextProvider';

import Instructor from '../Instructor.jsx';

const SearchResult = ({ isLoading, state }) => {
  // const { searchedInstructors } = useContext(AppContext);
  const searchedInstructors = state["search"];

  let resultList;
  let searchResultMessage;

  if (isLoading) {
    searchResultMessage = (
      <p>Loading...</p>
    );
  } else if (!searchedInstructors) {
    // haven't searched
    searchResultMessage = (
      <p>Search for an instructor</p>
    );
  } else if (Array.isArray(searchedInstructors) && searchedInstructors.length === 0) {
    // no found instructors
    searchResultMessage = (
      <p>No Instructors found</p>
    );
  } else if (Array.isArray(searchedInstructors) && searchedInstructors.length !== 0) {
    // instructors found
    resultList = searchedInstructors.map((instructor, index) => {
      return (
        <Draggable
          key={instructor.id}
          draggableId={instructor.id}
          index={index}
        >
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <Instructor
                instructor={instructor}
                key={instructor.id}
              />
            </div>
          )}
        </Draggable>
      )
    });
  }

  return (
    <div className="search-result">
      {searchResultMessage}
      <Droppable droppableId="search" type="INSTRUCTOR">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {resultList}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default SearchResult;
