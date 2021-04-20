import React, { useContext, useCallback, useReducer } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
// import { AppContext } from './AppContextProvider';
import produce from "immer";

import './Sorter.scss';
import Sidebar from './Sidebar/Sidebar.jsx';
import MainPanel from './Main/MainPanel.jsx';
import { getRandomInstructorSet } from "../../util/sampleData";

// const getPartnerInstructors = (droppableId, sorterData) => {
//   for (let i = 0; i < sorterData.length; i++) {
//     if (Array.isArray(sorterData[i][droppableId])) {
//       return sorterData[i][droppableId];
//     }
//   }
// }

const dragReducer = produce((draft, action) => {
  switch (action.type) {
    case "MOVE": {
      draft[action.from] = draft[action.from] || [];
      draft[action.to] = draft[action.to] || [];
      const [removed] = draft[action.from].splice(action.fromIndex, 1);
      draft[action.to].splice(action.toIndex, 0, removed);
    }
  }
});

const Sorter = () => {
  // const { searchedInstructors } = useContext(AppContext);
  const [state, dispatch] = useReducer(dragReducer, { 
    "partner1": getRandomInstructorSet(4), 
    "partner2": getRandomInstructorSet(4), 
    "partner3": getRandomInstructorSet(4), 
    "partner4": getRandomInstructorSet(4), 
    "search": getRandomInstructorSet(10),
  });

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

  // const onDragEnd = (result) => {
  //   const { source, destination } = result;

  //   if (!destination) return;
  //   if (destination.droppableId === 'search-result') return;

  //   if (source.droppableId === 'search-result') {
  //       // moved from search result to one of the partners
  //       const newSorterData = [...sorterData];
  //       const newSearchedInstructors = [...searchedInstructors];
  //       const partnerInstructors = getPartnerInstructors(destination.droppableId, newSorterData);

  //       const [removed] = newSearchedInstructors.splice(source.index, 1);
  //       partnerInstructors.splice(destination.index, 0, removed);

  //       setSorterData(newSorterData);
  //   } else if (source.droppableId !== 'search-result' && source.droppableId !== destination.droppableId) {
  //       // moved from one partner to the other
  //       const newSorterData = [...sorterData];
  //       const fromPartnerInstructors = getPartnerInstructors(source.droppableId, newSorterData);
  //       const toPartnerInstructors = getPartnerInstructors(destination.droppableId, newSorterData);

  //       const [removed] = fromPartnerInstructors.splice(source.index, 1);
  //       toPartnerInstructors.splice(destination.index, 0, removed);

  //       setSorterData(newSorterData);
  //   } else if (source.droppableId === destination.droppableId) {
  //       // moved to the same partner -> reorder
  //       const newSorterData = [...sorterData];
  //       const partnerInstructors = getPartnerInstructors(source.droppableId, newSorterData);

  //       const [removed] = partnerInstructors.splice(source.index, 1);
  //       partnerInstructors.splice(destination.index, 0, removed);

  //       setSorterData(newSorterData);
  //   }
  // };

  return (
    <div className="sorter">
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <div className="main-wrapper">
          <MainPanel state={state} />
        </div>
        <div className="sidebar-wrapper">
          <Sidebar state={state} />
        </div>
      </DragDropContext>
    </div>
  );
}

export default Sorter;