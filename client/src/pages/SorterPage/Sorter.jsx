import React, { createContext, useContext } from 'react';
import './Sorter.scss';
import Sidebar from './Sidebar.jsx';
import ProgramModule from './ProgramModule.jsx';
import MainPanel from './MainPanel.jsx';
import { DragDropContext } from 'react-beautiful-dnd';

const getQuarterCourses = (droppableId, planData) => {
  for (let i = 0; i < planData.length; i++) {
    if (Array.isArray(planData[i][droppableId])) {
      return planData[i][droppableId];
    }
  }
}

const Sorter = () => {
  const { planData, setPlanData } = createContext();
  const { searchedCourses } = createContext();

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;
    if (destination.droppableId === 'search-result') return;

    if (source.droppableId === 'search-result') {
        // moved from search result to one of the quarters
        const newPlanData = [...planData];
        const newSearchedCourses = [...searchedCourses];
        const quarterCourses = getQuarterCourses(destination.droppableId, newPlanData);

        const [removed] = newSearchedCourses.splice(source.index, 1);
        quarterCourses.splice(destination.index, 0, removed);

        setPlanData(newPlanData);
    } else if (source.droppableId !== 'search-result' && source.droppableId !== destination.droppableId) {
        // moved from one quarter to the other
        
        const newPlanData = [...planData];
        const fromQuarterCourses = getQuarterCourses(source.droppableId, newPlanData);
        const toQuarterCourses = getQuarterCourses(destination.droppableId, newPlanData);

        const [removed] = fromQuarterCourses.splice(source.index, 1);
        toQuarterCourses.splice(destination.index, 0, removed);

        setPlanData(newPlanData);
    } else if (source.droppableId === destination.droppableId) {
        // moved to the same quarter -> reorder
        const newPlanData = [...planData];
        const quarterCourses = getQuarterCourses(source.droppableId, newPlanData);

        const [removed] = quarterCourses.splice(source.index, 1);
        quarterCourses.splice(destination.index, 0, removed);

        setPlanData(newPlanData);
    }
  };

  return (
    <div className="sorter">
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <div className="main-wrapper">
          {/* <MainPanel /> */}
          <ProgramModule
            name="AppJam"
            color="#BB6BD9"
          />
          <ProgramModule
            name="LESTEM"
            color="#F2994A"
          />
          <ProgramModule
            name="Scratch"
            color="#F2C94C"
          />
          <ProgramModule
            name="WebJam"
            color="#40CCC8"
          />
          <ProgramModule
            name="Engineering Inventors"
            color="#4B4B92"
          />
        </div>
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>
      </DragDropContext>
    </div>

  );
}
export default Sorter;