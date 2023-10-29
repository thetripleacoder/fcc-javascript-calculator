var Calculator = require('./Calculator');
import store from './store';

console.log(store);

const mapStateToProps = (state) => {
  return { result: state };
};

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
    console.log(document.getElementById('calculator'));
    // Complete the return statement:
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById('calculator'));
