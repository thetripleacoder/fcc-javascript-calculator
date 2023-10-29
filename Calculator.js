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
      input: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(btn) {
    switch (btn.type) {
      case 'number':
        this.setState((state) => ({
          input:
            state.result > 0
              ? state.result.toString() + btn.value
              : state.result + btn.value,
        }));
        break;
      case 'operator':
        switch (btn.id) {
          case 'add':
            this.props.addAction();
            break;
          case 'subtract':
            this.props.subtractAction();
            break;
          case 'divide':
            this.props.divideAction();
            break;
          case 'multiply':
            this.props.multiplyAction();
            break;
          case 'equals':
            this.props.addAction();
            break;
        }
    }
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <div id='display'>{this.state.input}</div>
        <div id='display'>{this.props.result}</div>
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
