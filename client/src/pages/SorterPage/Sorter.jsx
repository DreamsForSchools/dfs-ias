import React, { useCallback, useReducer, useEffect, useState, useContext } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import produce from "immer";
import './Sorter.scss';
import Sidebar from './Sidebar/Sidebar.jsx';
import MainPanel from './Main/MainPanel.jsx';
import { getRandomInstructorSet } from "../../util/sampleData";
import { PROGRAMS as programs_data }  from '../../data/PROGRAMS';
import {GlobalContext} from "../../context/GlobalContextProvider";

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
    case "SORT": {
      // draft["search"] = 
      draft["programs"][0].classes[0].instructors = draft["search"].slice(0,3)
      draft["programs"][0].classes[1].instructors = draft["search"].slice(3,6)
      draft["programs"][0].classes[2].instructors = draft["search"].slice(6,8)
      draft["programs"][1].classes[1].instructors = draft["search"].slice(8,10)
      draft["search"] = null;
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
  let savedState = JSON.parse(localStorage.getItem("sorter-state"));
  let defaultState = savedState;
  if (savedState !== null) {
    defaultState = savedState;
  } else {
    defaultState = {
      "programs": programs_data,
      "search": getRandomInstructorSet(10),
    };
  }

  const [state, dispatch] = useReducer(dragReducer, {
    "programs": programs_data,
    "search": getRandomInstructorSet(10),
  });
  const {seasonIdSelected} = useContext(GlobalContext);
  const [instructors, setInstructors] = useState([]);
  const axios = require('axios');

  useEffect(() => {
    localStorage.setItem("sorter-state", JSON.stringify(state));

    axios.get('/api/instructor').then((response) => {
      setInstructors(response);
    }, (error) => {
      console.log(error);
    });
    console.log(state["programs"][0].classes[0].instructors)
    console.log(state["search"])

  }, [state]);

  const handleAutoAssign = () => {
    console.log(state["programs"][0].classes[0].instructors)
    axios.post('/api/sort',
      {seasonId: seasonIdSelected}
    ).then((response) => {
      console.log(response);
      console.log(response.data.data);
    }, (error) => {
      console.log(error);
    });
    dispatch({
      type: "SORT",
    });
  }

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
            handleAutoAssign={handleAutoAssign}
          />
        </div>
      </DragDropContext>
    </div>
  );
}

export default Sorter;