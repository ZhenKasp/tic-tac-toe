import React, { Component, useState  } from 'react';
import classes from './GameBoard.module.css';
import cellClasses from "../Cell/Cell.module.css";
import Cell from '../Cell/Cell';
import Aux from '../../hoc/Auxiliary';
import socketIOClient from "socket.io-client";

class GameBoard extends Component {
  state = {
    moveSign: localStorage.setItem("moveSign", "cross"),
    array: localStorage.setItem("moves", "0|0|0|0|0|0|0|0|0"),
    response: "",
    blockMoves: this.props.blockMoves || false
  }

  onClick = (target) => {
    if (this.state.blockMoves === false && !target.classList.contains("fa")) {
      let moves = localStorage.getItem("moves").split('|');
        
      if (localStorage.getItem("moveSign") === "cross") {
        target.classList.add("fa", "fa-close", cellClasses.Cross);
        localStorage.setItem("moveSign", "circle");
        moves[target.id] = 1;
      } else {
        target.classList.add("fa", "fa-circle-o", cellClasses.Circle);
        localStorage.setItem("moveSign", "cross");
        moves[target.id] = 2;
      }
      localStorage.setItem("moves", moves.join("|"));
    }
    if (this.props.isCreate === true) this.setState({blockMoves : true})
  }
  
  componentDidMount() {
    try {
      const ENDPOINT = "http://127.0.0.1:8000/";
      const socket = socketIOClient(ENDPOINT);
      socket.on("FromAPI", data => {
        this.setState({response: data});
      });
    } catch (err) {
      console.log(err.message)
    }
  }

  returnCells = () => {
    const array = [...localStorage.getItem("moves").split('|')];
    return (
      array.map((cell, index) => {
        return (
          <Cell key={`box${index}`} id={index} onClick={this.onClick} move={cell} />
        )
      })
    )
  }

  render () {
    const Cells = this.returnCells;

    return (
      <div className={classes.Board}>
        <Cells /> 
      </div>
    )
  }
}
  
export default GameBoard;