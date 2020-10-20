import React, { Component  } from 'react';
import classes from './GameBoard.module.css';
import cellClasses from "../Cell/Cell.module.css";
import Cell from '../Cell/Cell';
import Aux from '../../hoc/Auxiliary';

class GameBoard extends Component {
  state = {
    moveSign: localStorage.setItem("moveSign", "cross"),
    array: [
      0, 1, 0,
      1, 0, 1, 
      0, 1, 0
    ]
  }

  onClick = (target) => {
    if (!target.classList.contains("fa")) {
      if (localStorage.getItem("moveSign") === "cross") {
        target.classList.add("fa", "fa-close", cellClasses.Cross)
        localStorage.setItem("moveSign", "circle")
      } else {
        target.classList.add("fa", "fa-circle-o", cellClasses.Circle)
        localStorage.setItem("moveSign", "cross")
      } 
    }
  }

  returnCells = () => {
    const array = [...this.state.array]
    return (
      array.map((cell, index) => {
        return (
          <Cell key={`box${index + 1}`} id={`box${index + 1}`} onClick={this.onClick} move={cell} />
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