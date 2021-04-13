import React, { createContext } from "react";
import "./Sidebar.scss";
import Instructor from './Instructor.jsx';
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { Search, PlusCircle } from 'react-bootstrap-icons';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { getRandomInstructorSet } from "../../util/sampleData";
// import produce from "immer";
// import Dot from "../../components/Dot";
// import { formatAvailability } from "../../util/formatData";

// const dragReducer = produce((draft, action) => {
//   switch (action.type) {
//     case "MOVE": {
//       draft[action.from] = draft[action.from] || [];
//       draft[action.to] = draft[action.to] || [];
//       const [removed] = draft[action.from].splice(action.fromIndex, 1);
//       draft[action.to].splice(action.toIndex, 0, removed);
//     }
//   }
// });

const Sidebar = () => {
  // const [state, dispatch] = useReducer(dragReducer, { items: getRandomInstructorSet(10), });
  const { searchedCourses, setSearchedCourses } = createContext();
  const { planData } = createContext();

  // const programsColorKey = {
  //   "AppJam": "#BB6BD9",
  //   "WebJam": "#40CCC8",
  //   "LESTEM": "#F2994A",
  //   "Engineering Inventors": "#4B4B92",
  //   "Scratch": "#F2C94C"
  // };

  // const onDragEnd = useCallback((result) => {
  //   if (result.reason === "DROP") {
  //     if (!result.destination) {
  //       return;
  //     }
  //     dispatch({
  //       type: "MOVE",
  //       from: result.source.droppableId,
  //       to: result.destination.droppableId,
  //       fromIndex: result.source.index,
  //       toIndex: result.destination.index,
  //     });
  //   }
  // }, []);

  const resultList = getRandomInstructorSet(10).map((instructor, index) => {
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
              firstName={instructor.firstName}
              lastName={instructor.lastName}
              car={instructor.hasCar}
              returnee={instructor.previouslyTaught}
              pref={instructor.pref}
              availability={instructor.availability}
            />
          </div>
        )}
      </Draggable>
    )
  });

  return (
    <div className="sidebar">
      <h1 className="title">Unassigned Instructors</h1>
      <InputGroup className="search">
        <FormControl
          placeholder="Search"
          aria-label="Search"
          className="search-bar"
        />
        <InputGroup.Append>
          <Button variant="primary" className="search-btn"><Search /></Button>
        </InputGroup.Append>
      </InputGroup>
      <Button className="filter-btn">Filter</Button>
      <Button className="add-instructor-btn"><PlusCircle /> Add Instructor</Button>

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
      
      {/* <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="items" type="INSTRUCTOR">
          {(provided) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {state.items?.map((instructor, index) => {
                  return (
                    <Draggable
                      key={instructor.id}
                      draggableId={instructor.id}
                      index={index}
                    >
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="instructor">
                              <div className="name">
                                {instructor.firstName} {instructor.lastName}
                              </div>
                              <div className="tags">
                                {instructor.hasCar ? <div className="tag">Car</div> : null}
                                {instructor.previouslyTaught ? <div className="tag">Returnee</div> : null}
                                {instructor.isASL ? <div className="tag">ASL</div> : null}
                              </div>
                              <div className="pref">
                                {instructor.pref.map((el, idx) =>
                                    <Dot color={programsColorKey[el]} key={idx}/>
                                )}
                              </div>
                              <div className="availability">
                                {formatAvailability(instructor.availability).map((e) =>
                                  <h5>{e}</h5>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext> */}
    </div>
  );
}

export default Sidebar;
