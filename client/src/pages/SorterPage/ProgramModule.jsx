import React, { useState, useCallback, useReducer } from "react";
import './ProgramModule.scss';
import Partner from './Partner.jsx';
import { Accordion, Card } from "react-bootstrap";
import { CaretRightFill, CaretDownFill, LockFill, UnlockFill } from 'react-bootstrap-icons';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { getRandomInstructorSet } from "../../util/sampleData";
import produce from "immer";

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

function ProgramModule({ name, color }) {
  const [showContent, setShowContent] = useState(false);
  const [lock, setLock] = useState(false);
  const [state, dispatch] = useReducer(dragReducer, { items: getRandomInstructorSet(5), });

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
      });
    }
  }, []);

  return (
    <div>
      <Accordion className="program_accordion">
        <Card className="program-module" style={{ backgroundColor: color }}>
          <Accordion.Toggle className="program-header" onClick={() => { setShowContent(!showContent) }} as={Card.Header} eventKey="0">
            <span className="program-left">
              {showContent ? <CaretDownFill className="icon" /> : <CaretRightFill className="icon" />}
              <div className="program-name">{name}</div>
            </span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="program-body">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="items" type="INSTRUCTOR">
                  {(provided) => {
                    return (
                      <Partner 
                        name='Villa Fundamental'
                        provided={provided}
                        state={state}
                        {...provided.droppableProps}
                      />
                    );
                  }}
                </Droppable>
                <Droppable droppableId="items2" type="INSTRUCTOR">
                  {(provided) => {
                    return (
                      <Partner 
                        name='Carr Intermmediate'
                        provided={provided}
                        state={state}
                        {...provided.droppableProps}
                      />
                    );
                  }}
                </Droppable>
                <Droppable droppableId="items3" type="INSTRUCTOR">
                  {(provided) => {
                    return (
                      <Partner 
                        name='Fremont Fundamental'
                        provided={provided}
                        state={state}
                        {...provided.droppableProps}
                      />
                    );
                  }}
                </Droppable>
                <Droppable droppableId="items4" type="INSTRUCTOR">
                  {(provided) => {
                    return (
                      <Partner 
                        name='Edison Elementary'
                        provided={provided}
                        state={state}
                        {...provided.droppableProps}
                      />
                    );
                  }}
                </Droppable>
              </DragDropContext>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <span className="program-right" onClick={() => { setLock(!lock) }}>
        {lock ? <LockFill className="icon" /> : <UnlockFill className="icon" />}
      </span>
    </div>
  );
}

export default ProgramModule;