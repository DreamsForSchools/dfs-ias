import React from "react";
import './SearchResult.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Instructor from '../Instructor.jsx';

const SearchResult = ({ isLoading, state }) => {
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
          key={instructor.instructorId}
          draggableId={instructor.instructorId?.toString()}
          index={index}
        >
          {(provided, snapshot) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
            <div> 
              <> <Instructor key={instructor.instructorId}
                instructor={instructor}/>  {snapshot.isDragging ? ( <Instructor className={`dnd-copy`} key={instructor.instructorId}
                instructor={instructor}/> ) : null} </>
              {/* <Instructor
                key={instructor.instructorId}
                instructor={instructor}
              /> */}
              </div>
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
            {/* {provided.placeholder} */}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default SearchResult;
