import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Game extends React.Component{
    constructor(props){
        super(props);
        this.calculatorRef = [];
        this.state = {
            numDuelists: 2,
        }
    }

    componentDidMount() {
        console.log(this.calculatorRef);
    }
    
    calculators = [];

    handleReset = () => {
        this.calculatorRef.forEach((calculator) =>{
            calculator.resetLifePoints();
        });
    }

    render(){   
        for(let i= 0; i<this.state.numDuelists; i++){
            this.calculators.push(
                <Calculator key={i} ref={(ref) => this.calculatorRef.push(ref)}/>
            );
        };

        return(
            <React.Fragment>
                <div id="game">
                    {this.calculators}
                </div>
                <button id="btn-reset" onClick={this.handleReset}>Reset Game</button>
            </React.Fragment>
        );
    }
}

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lifePoints: 8000,
            inputValue: 0,
        }
    }

    addLifePoints = () => {
        this.setState({
            lifePoints: this.state.lifePoints + Number(this.state.inputValue),
        })
    }

    subtractLifePoints = () => {
        if(this.state.lifePoints < Number(this.state.inputValue)){
            this.setState({
                lifePoints: 0
            });
        } else{
            this.setState({
                lifePoints: this.state.lifePoints - Number(this.state.inputValue),
            });
        }
    }

    halveLifePoints = () => {
        this.setState({
            lifePoints: this.state.lifePoints/2,
        })
    }

    resetLifePoints = () => {
        this.setState({
            lifePoints: 8000,
            inputValue: 0,
        })
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({ inputValue: e.target.value});
    }

    render(){
        return(
            <div className="calculator">
                <h1><em>{this.state.lifePoints}</em></h1>
                <input type="number" min="0" max="100000" step="100" 
                    onChange={(e) => this.onChange(e)} 
                    value={this.state.inputValue}>
                </input>
                <br/>
                <button className="btn-subtract" onClick={this.subtractLifePoints}>-</button>
                <button className="btn-add" onClick={this.addLifePoints}>+</button>
                <button className="btn-halve" onClick={this.halveLifePoints}>/2</button>
            </div>
        )
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);