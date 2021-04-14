import React, { useContext } from "react";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { AppContext } from '../AppContextProvider';

import Instructor from '../Instructor.jsx';

const SearchResult = ({ isLoading }) => {
  const { searchedInstructors } = useContext(AppContext);

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
                instructorInfo={instructor}
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
      <Droppable droppableId="search-result">
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
