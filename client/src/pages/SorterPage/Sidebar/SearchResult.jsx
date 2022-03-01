import React from "react";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './SearchResult.scss'

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
            <>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
         
       
              style={{
                ...provided.draggableProps.style,
                transform: snapshot.isDragging ? provided.draggableProps.style.transform : 'translate(0px, 0px)',
              }}
            >
               <Instructor
                key={instructor.instructorId}
                instructor={instructor}
          
                
              />
 
            
             

            </div>
            {snapshot.isDragging &&
              <div style={{ ...provided.draggableProps.style,
                position: "absolute",
              
                transform: 'none !important',
                 }}>
                
              </div> ? <Instructor key={instructor.instructorId}
                instructor={instructor} className={'dnd-copy'}/> : null}
              
          </>
          )}
        </Draggable>
      )
    });
  }

  return (
    <div className="search-result">
      {searchResultMessage}
      <Droppable droppableId="search" type="INSTRUCTOR" >
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
