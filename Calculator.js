// React

let numberBtns = [
  {
    id: 'seven',
    value: 7,
    type: 'number',
  },
  {
    id: 'eight',
    value: 8,
    type: 'number',
  },
  {
    id: 'nine',
    value: 9,
    type: 'number',
  },
  {
    id: 'four',
    value: 4,
    type: 'number',
  },
  {
    id: 'five',
    value: 5,
    type: 'number',
  },
  {
    id: 'six',
    value: 6,
    type: 'number',
  },

  {
    id: 'one',
    value: 1,
    type: 'number',
  },
  {
    id: 'two',
    value: 2,
    type: 'number',
  },
  {
    id: 'three',
    value: 3,
    type: 'number',
  },
  {
    id: 'zero',
    value: 0,
    type: 'number',
  },
  {
    id: 'decimal',
    value: '.',
    type: 'number',
  },
];

let operatorBtns = [
  {
    id: 'add',
    value: '+',
    type: 'operator',
  },
  {
    id: 'subtract',
    value: '-',
    type: 'operator',
  },
  {
    id: 'multiply',
    value: '*',
    type: 'operator',
  },
  {
    id: 'divide',
    value: '/',
    type: 'operator',
  },
];

let resultBtns = [
  {
    id: 'clear',
    value: 'clear',
    type: 'operator',
  },
  {
    id: 'equals',
    value: '=',
    type: 'operator',
  },
];

const Button = (props) => {
  return (
    <button id={props.id} onClick={props.handleClick}>
      {props.value}
    </button>
  );
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
      input: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(btn) {
    switch (btn.type) {
      case 'number':
        this.setState((state) => {
          let numRegex = /[0-9]+\.?[0-9]*$/;
          let operatorRegex = /[\+\-\/\*]$/;
          let newDisplay = '';
          let newInput =
            this.handleDecimalInput(state.input, btn) || state.input;

          if (operatorRegex.test(state.display)) {
            return {
              display: state.display + (btn.value ? btn.value : ''),
              input: btn.value,
            };
          } else if (numRegex.test(state.display)) {
            newDisplay = state.display.replace(numRegex, newInput);

            return {
              display: newDisplay,
              input: newInput,
            };
          } else if (!state.display) {
            return {
              display: newInput,
              input: newInput,
            };
          }
        });
        break;
      case 'operator':
        let newDisplay;
        let recentOperatorsRegex = /[\+\-\/\*]*$/;
        let hasEquals = this.state.display.includes('=');
        this.setState((state) => {
          let recentOperators = state.display
            .match(recentOperatorsRegex)
            .join('');

          let validOperatorCombinations = [
            /\+\-{2}$/,
            /\*\-$/,
            /\/\-$/,
            /\-\-$/,
          ];

          let newRecentOperators = recentOperators;

          if (recentOperators.length) {
            if (
              recentOperators.length === 1 &&
              validOperatorCombinations.some((i) =>
                i.test(recentOperators + btn.value)
              )
            ) {
              newRecentOperators = recentOperators + btn.value;
            } else {
              if (recentOperators.length === 2 && btn.value !== '-') {
                newRecentOperators = btn.value;
              }
            }

            newDisplay = state.display.replace(
              recentOperatorsRegex,
              newRecentOperators
            );
          } else {
            newDisplay = state.display + btn.value;
          }

          if (hasEquals) {
            newDisplay = state.input + btn.value;
          }

          return {
            display: newDisplay,
            input: btn.value,
          };
        });
        if (['equals', 'clear'].includes(btn.id)) {
          this.calculateResult(btn);
        }
    }
  }

  handleDecimalInput(input, btn) {
    let decimalCount = input.toString().match(/\./g);
    let newInput = '';
    if (!decimalCount || (decimalCount.length === 1 && btn.value !== '.')) {
      newInput =
        parseFloat(input) > 0
          ? input.toString() + btn.value
          : (parseFloat(input) + btn.value).toString();
    }
    return newInput;
  }

  calculateResult(btn) {
    switch (btn.id) {
      // case 'add':
      //   this.props.addValue(this.state.input);
      //   break;
      // case 'subtract':
      //   this.props.subtractValue(this.state.input);
      //   break;
      // case 'divide':
      //   this.props.divideValue(this.state.input);
      //   break;
      // case 'multiply':
      //   this.props.multiplyValue(this.state.input);
      //   break;
      case 'equals':
        this.props.equalsValue(this.state.display);
        this.setState({
          display: this.state.display + ' = ' + eval(this.state.display),
          input: eval(this.state.display),
        });
        break;
      case 'clear':
        this.props.clearValue(this.state.input);
        this.setState({
          display: '',
          input: 0,
        });
        break;
    }
  }

  render() {
    return (
      <div>
        <div className='display-container'>
          <div>{this.state.display}</div>
          <div id='display'>{this.state.input}</div>
        </div>
        <div className='operator-btns-container d-flex'>
          {operatorBtns.map((btn) => {
            return (
              <Button
                key={btn.id}
                id={btn.id}
                value={btn.value}
                handleClick={() => this.handleClick(btn)}
              />
            );
          })}
        </div>
        <div className='d-flex'>
          <div className='num-btns-container'>
            {numberBtns.map((btn) => {
              return (
                <Button
                  key={btn.id}
                  id={btn.id}
                  value={btn.value}
                  handleClick={() => this.handleClick(btn)}
                />
              );
            })}
          </div>
          <div className='result-btns-container d-flex flex-column'>
            {resultBtns.map((btn) => {
              return (
                <Button
                  key={btn.id}
                  id={btn.id}
                  value={btn.value}
                  handleClick={() => this.handleClick(btn)}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

// Redux

const ADD = 'Add'; // Define a constant for add action types
const SUBTRACT = 'Subtract'; // Define a constant for subtract action types
const DIVIDE = 'Divide'; // Define a constant for divide action types
const MULTIPLY = 'Multiply'; // Define a constant for multiply action types
const CLEAR = 'Clear'; // Define a constant for multiply action types
const EQUALS = 'Equals'; // Define a constant for equals action types

let result = 0;

const calculatorReducer = (state = result, action) => {
  let stateInput = parseFloat(action.value);
  switch (action.type) {
    case ADD:
      return state + stateInput;
    case SUBTRACT:
      return state - stateInput;
    case DIVIDE:
      return state / stateInput;
    case MULTIPLY:
      return state * stateInput;
    case CLEAR:
      return action.value;
    case EQUALS:
      return eval(action.value);
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

const clearAction = () => {
  return {
    type: CLEAR,
    value: 0,
  };
}; // Define an action creator for clearing

const equalsAction = (expressions) => {
  return {
    type: EQUALS,
    value: expressions,
  };
}; // Define an action creator for evaluating expressions

const store = Redux.createStore(calculatorReducer); // Define the Redux store here, passing in your reducers

const mapStateToProps = (state) => {
  return { result: state };
};

// React- Redux

const mapDispatchToProps = (dispatch) => {
  return {
    addValue: (value) => {
      dispatch(addAction(value));
    },
    subtractValue: (value) => {
      dispatch(subtractAction(value));
    },
    divideValue: (value) => {
      dispatch(divideAction(value));
    },
    multiplyValue: (value) => {
      dispatch(multiplyAction(value));
    },
    clearValue: () => {
      dispatch(clearAction());
    },
    equalsValue: (value) => {
      dispatch(equalsAction(value));
    },
  };
};

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

// Define the Container component here:
const Container = connect(mapStateToProps, mapDispatchToProps)(Calculator);

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // Complete the return statement:
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById('calculator'));
