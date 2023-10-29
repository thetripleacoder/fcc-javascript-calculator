const ADD = 'Add'; // Define a constant for add action types
const SUBTRACT = 'Subtract'; // Define a constant for subtract action types
const DIVIDE = 'Divide'; // Define a constant for divide action types
const MULTIPLY = 'Multiply'; // Define a constant for multiply action types

let result = 0;

const calculatorReducer = (state = result, action) => {
  switch (action.type) {
    case ADD:
      return state + action.value;
    case SUBTRACT:
      return state - action.value;
    case DIVIDE:
      return state / action.value;
    case MULTIPLY:
      return state * action.value;
    default:
      return state;
  }
}; // Define the counter reducer which will add, subtract, multiply or divide the state based on the action it receives

const addAction = (value) => {
  return {
    type: ADD,
    value: value,
  };
}; // Define an action creator for adding

const subtractAction = (value) => {
  return {
    type: SUBTRACT,
    value: value,
  };
}; // Define an action creator for subtracting

const divideAction = (value) => {
  return {
    type: DIVIDE,
    value: value,
  };
}; // Define an action creator for dividing

const multiplyAction = (value) => {
  return {
    type: MULTIPLY,
    value: value,
  };
}; // Define an action creator for multiplying

const store = Redux.createStore(calculatorReducer); // Define the Redux store here, passing in your reducers
