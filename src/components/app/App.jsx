import React, { useReducer, useState } from 'react';


function reducer(state, action) {
  switch(action.type) {
    case 'UNDO':
      return {
        ...state,
        after: [state.current, ...state.after],
        current: state.before[state.before.length - 1],
        before: state.before.slice(0, -1),
      };
    case 'RECORD':
      return {
        ...state,
        before: [...state.before, state.current],
        current: action.payload,
      };
    case 'REDO':
      return {
        ...state, 
        before: [...state.before, state.current],
        current: state.after[0],
        after: state.after.slice(1),
      };
    default:
      return state;
  }
}

const useRecord = (init) => {
  const [state, dispatch] = useReducer(reducer, {
    before: [],
    current: init,
    after: [],
  });

  const undo = () => {
    dispatch({ type: 'UNDO' });
    // setAfter((after) => [current, ...after]);
    // setCurrent(before[before.length - 1]);
    // setBefore((before) => before.slice(0, -1));
  };

  const redo = () => {
    dispatch({ type: 'REDO' });
    // setBefore((before) => [...before, current]);
    // setCurrent(after[0]);
    // setAfter((after) => after.slice(1));
  };

  const record = (val) => {
    dispatch({ type: 'RECORD', payload: val });
    // setBefore((before) => [...before, current]);
    // setCurrent(val);
  };

  return {
    undo,
    record,
    redo,
    current: state.current,
  };
};

function App() {
  const { current, undo, redo, record } = useRecord("#FF0000");

  return (
    <>
      <button onClick={undo}>undo</button>
      <button onClick={redo}>redo</button>
      <input
        data-testid="color-input"
        type="color"
        value={current}
        onChange={({ target }) => record(target.value)}
      />
      <div
        data-testid="display"
        style={{ backgroundColor: current, width: "10rem", height: "10rem" }}
      ></div>
    </>
  );
}

export default App;
