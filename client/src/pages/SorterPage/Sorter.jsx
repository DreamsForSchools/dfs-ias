import React, { useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { AppContext } from './AppContextProvider';

import './Sorter.scss';
import Sidebar from './Sidebar/Sidebar.jsx';
import MainPanel from './Main/MainPanel.jsx';

const getPartnerInstructors = (droppableId, sorterData) => {
  for (let i = 0; i < sorterData.length; i++) {
    if (Array.isArray(sorterData[i][droppableId])) {
      return sorterData[i][droppableId];
    }
  }
}

const Sorter = () => {
  const { sorterData, setSorterData } = useContext(AppContext);
  const { searchedInstructors } = useContext(AppContext);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;
    if (destination.droppableId === 'search-result') return;

    if (source.droppableId === 'search-result') {
        // moved from search result to one of the partners
        const newSorterData = [...sorterData];
        const newSearchedInstructors = [...searchedInstructors];
        const partnerInstructors = getPartnerInstructors(destination.droppableId, newSorterData);

        const [removed] = newSearchedInstructors.splice(source.index, 1);
        partnerInstructors.splice(destination.index, 0, removed);

        setSorterData(newSorterData);
    } else if (source.droppableId !== 'search-result' && source.droppableId !== destination.droppableId) {
        // moved from one partner to the other
        const newSorterData = [...sorterData];
        const fromPartnerInstructors = getPartnerInstructors(source.droppableId, newSorterData);
        const toPartnerInstructors = getPartnerInstructors(destination.droppableId, newSorterData);

        const [removed] = fromPartnerInstructors.splice(source.index, 1);
        toPartnerInstructors.splice(destination.index, 0, removed);

        setSorterData(newSorterData);
    } else if (source.droppableId === destination.droppableId) {
        // moved to the same partner -> reorder
        const newSorterData = [...sorterData];
        const partnerInstructors = getPartnerInstructors(source.droppableId, newSorterData);

        const [removed] = partnerInstructors.splice(source.index, 1);
        partnerInstructors.splice(destination.index, 0, removed);

        setSorterData(newSorterData);
    }
  };

  return (
    <div className="sorter">
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <div className="main-wrapper">
          <MainPanel />
        </div>
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>
      </DragDropContext>
    </div>
  );
}

export default Sorter;