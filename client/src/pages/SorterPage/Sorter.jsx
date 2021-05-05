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
      draft[action.from] = draft[action.from] || [];
      draft[action.to] = draft[action.to] || [];
      const [removed] = draft[action.from].splice(action.fromIndex, 1);
      draft[action.to].splice(action.toIndex, 0, removed);

      // let toProgram = parseInt(action.to.split("-")[0]);
      // let fromProgram = null;
      // let start = null;
      // if (action.from !== "search") {
      //   fromProgram = parseInt(action.from.split("-")[0]);
      //   start = draft["programs"][fromProgram];
      // } else {
      //   start = draft;
      // }

      // start[action.from] = start[action.from] || [];
      // draft["programs"][toProgram][action.to] =
      //   draft["programs"][toProgram][action.to] || [];
      // const [removed] = start[action.from].splice(action.fromIndex, 1);
      // draft["programs"][toProgram][action.to].splice(action.toIndex, 0, removed);
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
      if (
        result.destination.droppableId === "search" &&
        result.source.droppableId !== "search"
      ) {
        return;
      }
      dispatch({
        type: "MOVE",
        from: result.source.droppableId,
        to: result.destination.droppableId,
        fromIndex: result.source.index,
        toIndex: result.destination.index,
      });
    }
  }, []);

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