import React, { useCallback, useReducer, useEffect, useState, useContext } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import produce from "immer";
import './Sorter.scss';
import Sidebar from './Sidebar/Sidebar.jsx';
import MainPanel from './Main/MainPanel.jsx';
import {GlobalContext} from "../../context/GlobalContextProvider";
import Lottie from 'lottie-react';
import emptyAnimation from '../../assets/empty-animation.json';
import {createToken} from "../../fire";

const dragReducer = produce((draft, action) => {
  switch (action.type) {
    case "POPULATE": {
      draft["programs"] = action.programs ? Object.values(action.programs) : [];
      draft["search"] = action.instructors ? action.instructors : [];
      break;
    }
    case "POPULATE_LOCKED": {
      action.state["programs"].forEach(program => {
        program.classes.forEach(c1 => {
          draft["programs"][action.state["programs"].indexOf(program)]["classes"].find(c2 => c1.classId === c2.classId)["instructors"] = [];
        })
      })
      draft["lockedInstructors"] = action.lockedInstructors;
      action.assignments.forEach(assignment => {
        let program = action.state["programs"].filter(program => program.classes.filter(c => c.classId === parseInt(assignment[0])).length > 0)[0]
        action.instructors?.filter(instructor => assignment[1].filter(a => instructor.instructorId === a).length > 0).forEach(
          instructor => {
            if (program) {
              draft["programs"][action.state["programs"].indexOf(program)]["classes"].find(c => c.classId === parseInt(assignment[0]))["instructors"]
              = draft["programs"][action.state["programs"].indexOf(program)]["classes"].find(c => c.classId === parseInt(assignment[0]))["instructors"] || [];
              draft["programs"][action.state["programs"].indexOf(program)]["classes"].find(c => c.classId === parseInt(assignment[0]))["instructors"].splice(0, 0, instructor);
            }
          }
        )
      });
      draft["search"] = action.instructors?.filter(instructor => !action.lockedInstructors.includes(instructor.instructorId));
      break;
    }
    case "SORT": {
      action.state["programs"].forEach(program => {
        program.classes.forEach(c1 => {
          draft["programs"][action.state["programs"].indexOf(program)]["classes"].find(c2 => c1.classId === c2.classId)["instructors"]
          = action.state["programs"][action.state["programs"].indexOf(program)]["classes"].find(c2 => c1.classId === c2.classId)["instructors"]
            .filter(instructor => !action.assignedInstructors.includes(instructor.instructorId))
        })
      })
      action.assignments.forEach(assignment => {
        let program = action.state["programs"].filter(program => program.classes.filter(c => c.classId === parseInt(assignment[0])).length > 0)[0]
        action.instructors?.filter(instructor => assignment[1].filter(a => instructor.instructorId === a).length > 0).forEach(
          instructor => {
            draft["programs"][action.state["programs"].indexOf(program)]["classes"].find(c => c.classId === parseInt(assignment[0]))["instructors"]
             = draft["programs"][action.state["programs"].indexOf(program)]["classes"].find(c => c.classId === parseInt(assignment[0]))["instructors"] || [];
            draft["programs"][action.state["programs"].indexOf(program)]["classes"].find(c => c.classId === parseInt(assignment[0]))["instructors"]
              .splice(draft["programs"][action.state["programs"].indexOf(program)]["classes"].find(c => c.classId === parseInt(assignment[0]))["instructors"].length, 0, instructor);
          }
        )
      });
      draft["search"] = action.state["search"]?.filter(instructor => !action.assignedInstructors.includes(instructor.instructorId));
      break;
    }
    case "MOVE": {
      if ( action.from === "search" && action.to === "search") {
        draft[action.from] = draft[action.from] || [];
        draft[action.to] = draft[action.to] || [];
        const [removed] = draft[action.from].splice(action.fromIndex, 1);
        draft[action.to].splice(action.toIndex, 0, removed);
      } else if ( action.from === "search" && action.to !== "search") {
        let toProgram = action.state["programs"].find(program => program.programId.toString() === action.to.split("-")[0]);
        draft["programs"][action.state["programs"].indexOf(toProgram)]["classes"].find(c => c.classId.toString() === action.to.split("-")[2])["instructors"]
          = draft["programs"][action.state["programs"].indexOf(toProgram)]["classes"].find(c => c.classId.toString() === action.to.split("-")[2])["instructors"] || [];
        const [removed] = draft[action.from].splice(action.fromIndex, 1);
        draft["programs"][action.state["programs"].indexOf(toProgram)]["classes"].find(c => c.classId.toString() === action.to.split("-")[2])["instructors"].splice(action.toIndex, 0, removed);
      } else if ( action.from !== "search" && action.to === "search") {
        let fromProgram = action.state["programs"].find(program => program.programId.toString() === action.from.split("-")[0]);
        draft[action.to] = draft[action.to] || [];
        const [removed] = draft["programs"][action.state["programs"].indexOf(fromProgram)]["classes"].find(c => c.classId.toString() === action.from.split("-")[2])["instructors"].splice(action.fromIndex, 1);
        draft[action.to].splice(action.toIndex, 0, removed);
      } else {
        let toProgram = action.state["programs"].find(program => program.programId.toString() === action.to.split("-")[0]);
        let fromProgram = action.state["programs"].find(program => program.programId.toString() === action.from.split("-")[0]);
        draft["programs"][action.state["programs"].indexOf(toProgram)]["classes"].find(c => c.classId.toString() === action.to.split("-")[2])["instructors"]
          = draft["programs"][action.state["programs"].indexOf(toProgram)]["classes"].find(c => c.classId.toString() === action.to.split("-")[2])["instructors"] || [];
        const [removed] = draft["programs"][action.state["programs"].indexOf(fromProgram)]["classes"].find(c => c.classId.toString() === action.from.split("-")[2])["instructors"].splice(action.fromIndex, 1);
        draft["programs"][action.state["programs"].indexOf(toProgram)]["classes"].find(c => c.classId.toString() === action.to.split("-")[2])["instructors"].splice(action.toIndex, 0, removed);
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
  let savedState = JSON.parse(localStorage.getItem("sorter-state"));
  let defaultState = savedState;
  if (savedState !== null) {
    defaultState = savedState;
  } else {
    defaultState = {
      "programs": [],
      "search": [],
    };
  }

  const {seasonSelected, programData, instructorData} = useContext(GlobalContext);
  const [lockedInstructors, setLockedInstructors] = useState([]);
  const [state, dispatch] = useReducer(dragReducer, {
    "programs": programData ? Object.values(programData) : [],
    "search": instructorData ? Object.values(instructorData) : [],
    "lockedInstructors": lockedInstructors,
  });
  const axios = require('axios');

  useEffect(() => {
    localStorage.setItem("sorter-state", JSON.stringify(state));
    dispatch({
      type: "POPULATE",
      programs: programData,
      instructors: Object.values(instructorData),
    });
    fetchLocked();
    console.log(Object.values(instructorData));
  }, [programData, instructorData]);

  const fetchLocked = async () => {
    const header = await createToken();
    axios.get('/api/lock/' + seasonSelected.seasonId, header).then((response) => {
      setLockedInstructors(Array.prototype.concat(...Object.values(response.data.data)))
      dispatch({
        type: "POPULATE_LOCKED",
        assignments: Object.entries(response.data.data),
        lockedInstructors: Array.prototype.concat(...Object.values(response.data.data)),
        instructors: Object.values(instructorData),
        state: state,
      });
    }, (error) => {
      console.log(error);
    });
  }

  const handleAutoAssign = async () => {
    try {
      const header = await createToken();
      let response = await axios.post('/api/sort',
        {seasonId: seasonSelected.seasonId}, header
      );
      dispatch({
        type: "SORT",
        assignments: Object.entries(response.data.data),
        assignedInstructors: Array.prototype.concat(...Object.values(response.data.data)),
        instructors: Object.values(instructorData),
        lockedInstructors: lockedInstructors,
        state: state,
      });
    } catch (e) {
      console.log("Error in sort: ");
      console.log(e);
    }
  }

  const handleFilter = (instructors) => {
    dispatch({
      type: "FILTER",
      filteredInstructors: instructors,
    });
  }

  const handleSearch = (instructors) => {
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
          { programData === null || programData.length === 0 ?
            <div style={{textAlign: 'center'}}>
              <Lottie animationData={emptyAnimation} style={{width: 400, height: 400, margin: 'auto'}} />
            </div>
          : <MainPanel state={state} seasonSelected={seasonSelected}/> }
        </div>
        <div className="sidebar-wrapper">
          <Sidebar
            state={state}
            handleFilter={handleFilter}
            handleSearch={handleSearch}
            handleAutoAssign={handleAutoAssign}
            instructorData={Object.values(instructorData)}
            lockedInstructors={lockedInstructors}
          />
        </div>
      </DragDropContext>
    </div>
  );
}

export default Sorter;
