import React, { useCallback, useReducer, useEffect, useState, useContext } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import produce from "immer";
import './Sorter.scss';
import Sidebar from './Sidebar/Sidebar.jsx';
import MainPanel from './Main/MainPanel.jsx';
import { PROGRAMS as programs_data }  from '../../data/PROGRAMS';
import {GlobalContext} from "../../context/GlobalContextProvider";

const dragReducer = produce((draft, action) => {
  switch (action.type) {
    case "POPULATE": {
      draft["search"] = action.instructors;
      break;
    }
    case "MOVE": {
      if ( action.from === "search" && action.to === "search") {
        draft[action.from] = draft[action.from] || [];
        draft[action.to] = draft[action.to] || [];
        const [removed] = draft[action.from].splice(action.fromIndex, 1);
        draft[action.to].splice(action.toIndex, 0, removed); 
      } else if ( action.from === "search" && action.to !== "search") {
        let toProgram = action.state["programs"].find(program => program.programId === action.to.split("-")[0]);
        draft["programs"][action.state["programs"].indexOf(toProgram)]["classes"].find(c => c.classId.toString() === action.to.split("-")[2])["instructors"] 
          = draft["programs"][action.state["programs"].indexOf(toProgram)]["classes"].find(c => c.classId.toString() === action.to.split("-")[2])["instructors"] || [];
        const [removed] = draft[action.from].splice(action.fromIndex, 1);
        draft["programs"][action.state["programs"].indexOf(toProgram)]["classes"].find(c => c.classId.toString() === action.to.split("-")[2])["instructors"].splice(action.toIndex, 0, removed);
      } else if ( action.from !== "search" && action.to === "search") {
        let fromProgram = action.state["programs"].find(program => program.programId === action.from.split("-")[0]);
        draft[action.to] = draft[action.to] || [];
        const [removed] = draft["programs"][action.state["programs"].indexOf(fromProgram)]["classes"].find(c => c.classId.toString() === action.from.split("-")[2])["instructors"].splice(action.fromIndex, 1);
        draft[action.to].splice(action.toIndex, 0, removed);
      } else {
        console.log(action)
        let toProgram = action.state["programs"].find(program => program.programId.toString() === action.to.split("-")[0]);
        let fromProgram = action.state["programs"].find(program => program.programId.toString() === action.from.split("-")[0]);
        draft["programs"][action.state["programs"].indexOf(toProgram)]["classes"].find(c => c.classId.toString() === action.to.split("-")[2])["instructors"] 
          = draft["programs"][action.state["programs"].indexOf(toProgram)]["classes"].find(c => c.classId.toString() === action.to.split("-")[2])["instructors"] || [];
        const [removed] = draft["programs"][action.state["programs"].indexOf(fromProgram)]["classes"].find(c => c.classId.toString() === action.from.split("-")[2])["instructors"].splice(action.fromIndex, 1);
        draft["programs"][action.state["programs"].indexOf(toProgram)]["classes"].find(c => c.classId.toString() === action.to.split("-")[2])["instructors"].splice(action.toIndex, 0, removed);
      }
      break;
    }
    case "SORT": {
      action.assignments.forEach(assignment => {
        let program = action.state["programs"].filter(program => program.classes.filter(c => c.classId === parseInt(assignment[0])).length > 0)[0]
        draft["programs"][action.state["programs"].indexOf(program)]["classes"].find(c => c.classId === parseInt(assignment[0]))["instructors"] 
          = action.instructors.filter(instructor => assignment[1].filter(a => instructor.instructorId === a).length > 0);
        draft["search"] = [];
      }); 
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
      "search": [],
    };
  }

  const {seasonSelected, programData, setToastText} = useContext(GlobalContext);
  const [instructors, setInstructors] = useState([]);
  const [state, dispatch] = useReducer(dragReducer, {
    "programs": Object.values(programData),
    "search": [],
  });
  const axios = require('axios');

  useEffect(() => {
    localStorage.setItem("sorter-state", JSON.stringify(state));
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      axios.get('/api/instructor').then((response) => {
        setInstructors(response.data)
        dispatch({
          type: "POPULATE",
          instructors: response.data,
        });
      }, (error) => {
        console.log(error);
      });
    } catch (e) {
      setToastText({status: 'Failed', message: `${e.response}`});
    }
  }

  const handleAutoAssign = () => {
    axios.post('/api/sort',
      {seasonId: seasonSelected.seasonId}
    ).then((response) => {
      dispatch({
        type: "SORT",
        assignments: Object.entries(response.data.data),
        instructors: instructors,
        state: state,
      });
    }, (error) => {
      console.log(error);
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