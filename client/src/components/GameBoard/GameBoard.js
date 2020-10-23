import React, { Component } from 'react';
import classes from './GameBoard.module.css';
import cellClasses from "../Cell/Cell.module.css";
import Cell from '../Cell/Cell';
import socketIOClient from "socket.io-client";

class GameBoard extends Component {
  state = {
    moveSign: "cross",
    response: "",
    blockMoves: this.props.blockMoves || false,
    moves: this.props.moves || "0|0|0|0|0|0|0|0|0"
  }

  onClick = (target) => {
    if (this.state.blockMoves === false && !target.classList.contains("fa")) {
      let moves = this.state.moves.split('|');
        
      if (localStorage.getItem("moveSign") === "cross") {
        target.classList.add("fa", "fa-close", cellClasses.Cross);
        this.setState({moveSign: "circle"});
        moves[target.id] = 1;
      } else {
        target.classList.add("fa", "fa-circle-o", cellClasses.Circle);
        this.setState({moveSign: "cross"});
        moves[target.id] = 2;
      }
      this.setState({moves: moves.join("|")});
    }
    if (this.props.isCreate === true) this.setState({blockMoves : true})
  }
  
  componentDidMount() {
    try {
      const socket = socketIOClient(process.env.REACT_APP_ENDPOINT);
      socket.on("FromAPI", data => {
        this.setState({response: data});
        console.log(data)
      });
    } catch (err) {
      console.log(err.message)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.moves !== prevState.moves && this.props.onChange) {
      this.props.onChange(this.state.moves);
    }
    if (prevProps.resetMoves !== this.props.resetMoves) {
      this.setState({ blockMoves: false, moveSign: "cross", moves: "0|0|0|0|0|0|0|0|0" })
    }
  }

  returnCells = () => {
    return (
      this.state.moves.split('|').map((cell, index) => {
        return (
          <Cell
            key={`box${index}`}
            id={index}
            onClick={this.onClick}
            move={cell}
            preview={this.props.preview}
          />
        )
      })
    )
  }

  render () {
    const Cells = this.returnCells;

    return (
      <div className={this.props.preview ? classes.Preview : classes.Board}>
        <Cells /> 
      </div>
    )
  }
}
  
export default GameBoard;