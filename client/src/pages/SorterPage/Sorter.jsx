import React, { useCallback, useReducer } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import produce from "immer";
import './Sorter.scss';
import Sidebar from './Sidebar/Sidebar.jsx';
import MainPanel from './Main/MainPanel.jsx';
import { getRandomInstructorSet } from "../../util/sampleData";
import { PROGRAMS as programs_data }  from '../../data/PROGRAMS';

const dragReducer = produce((draft, action) => {
  switch (action.type) {
    case "MOVE": {
      if ( action.from === "search" && action.to === "search") {
        draft[action.from] = draft[action.from] || [];
        draft[action.to] = draft[action.to] || [];
        const [removed] = draft[action.from].splice(action.fromIndex, 1);
        draft[action.to].splice(action.toIndex, 0, removed); 
      } else if ( action.from === "search" && action.to !== "search") {
        let toProgram = action.state["programs"].find(program => program.name === action.to.split("-")[0]);
        draft["programs"][action.state["programs"].indexOf(toProgram)]["classes"].find(c => c.id === action.to.split("-")[2])["instructors"] 
          = draft["programs"][action.state["programs"].indexOf(toProgram)]["classes"].find(c => c.id === action.to.split("-")[2])["instructors"] || [];
        const [removed] = draft[action.from].splice(action.fromIndex, 1);
        draft["programs"][action.state["programs"].indexOf(toProgram)]["classes"].find(c => c.id === action.to.split("-")[2])["instructors"].splice(action.toIndex, 0, removed);
      } else if ( action.from !== "search" && action.to === "search") {
        let fromProgram = action.state["programs"].find(program => program.name === action.from.split("-")[0]);
        draft[action.to] = draft[action.to] || [];
        const [removed] = draft["programs"][action.state["programs"].indexOf(fromProgram)]["classes"].find(c => c.id === action.from.split("-")[2])["instructors"].splice(action.fromIndex, 1);
        draft[action.to].splice(action.toIndex, 0, removed);
      } else {
        let toProgram = action.state["programs"].find(program => program.name === action.to.split("-")[0]);
        let fromProgram = action.state["programs"].find(program => program.name === action.from.split("-")[0]);
        draft["programs"][action.state["programs"].indexOf(toProgram)]["classes"].find(c => c.id === action.to.split("-")[2])["instructors"] 
          = draft["programs"][action.state["programs"].indexOf(toProgram)]["classes"].find(c => c.id === action.to.split("-")[2])["instructors"] || [];
        const [removed] = draft["programs"][action.state["programs"].indexOf(fromProgram)]["classes"].find(c => c.id === action.from.split("-")[2])["instructors"].splice(action.fromIndex, 1);
        draft["programs"][action.state["programs"].indexOf(toProgram)]["classes"].find(c => c.id === action.to.split("-")[2])["instructors"].splice(action.toIndex, 0, removed);
      }
      break;
    }
    case "FILTER": {
      draft["search"] = action.filteredInstructors;
      break;
    }
    default: 
      return;
  }
});

const Sorter = () => {
  const [state, dispatch] = useReducer(dragReducer, { 
    "programs": programs_data, 
    "search": getRandomInstructorSet(10),
  });

  const handleFilter = (instructors) => {
    dispatch({
      type: "FILTER",
      filteredInstructors: instructors,
    });
  }

  const onDragEnd = useCallback((result) => {
    if (result.reason === "DROP") {
      if (!result.destination) {
        return;
      }
      dispatch({
        type: "MOVE",
        from: result.source.droppableId,
        to: result.destination.droppableId,
        fromIndex: result.source.index,
        toIndex: result.destination.index,
        state: state,
      });
    }
  }, [state]);

  return (
    <div className="sorter">
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <div className="main-wrapper">
          <MainPanel state={state} />
        </div>
        <div className="sidebar-wrapper">
          <Sidebar 
            state={state} 
            handleFilter={handleFilter}
          />
        </div>
      </DragDropContext>
    </div>
  );
}

export default Sorter;