import React, { Component  } from 'react';
import classes from './GameBoard.module.css';
import cellClasses from "../Cell/Cell.module.css";
import Cell from '../Cell/Cell';
import Aux from '../../hoc/Auxiliary';

class GameBoard extends Component {
  state = {
    moveSign: localStorage.setItem("moveSign", "cross"),
    array: localStorage.setItem("moves", "0|0|0|0|0|0|0|0|0")
  }

  onClick = (target) => {
    if (!target.classList.contains("fa")) {
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
      <Aux>
        <div className={classes.Header}>
          GameBoard:
        </div>
        <div className={classes.Board}>
          <Cells /> 
        </div>
      </Aux>
    )
  }
}
  
export default GameBoard;