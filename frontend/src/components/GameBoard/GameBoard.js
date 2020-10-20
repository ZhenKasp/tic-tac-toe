import React, { useState } from 'react';
import classes from './GameBoard.module.css';

const GameBoard = (props) => {
  const [moveSign, setMoveSign] = useState(1);

  const onClick = (target) => {
    if (!target.classList.contains("fa")) {
      if (moveSign) {
        target.classList.add("fa", "fa-close", classes.Cross)
        setMoveSign(0)
      } else {
        target.classList.add("fa", "fa-circle-o", classes.Circle)
        setMoveSign(1)
      } 
    }
  }

  return (
    <div className={classes.GameBoard}>
      <div className={classes.Header}>
        GameBoard:
      </div>
      <div className={classes.Board}> 
        <ul className={classes.Row}>
          <li id="box1" className={classes.Box} onClick={event => onClick(event.currentTarget)}></li>
          <li id="box2" className={classes.Box} onClick={event => onClick(event.currentTarget)}></li>
          <li id="box3" className={classes.Box} onClick={event => onClick(event.currentTarget)}></li>
        </ul> 

        <ul className={classes.Row}>
          <li id="box4" className={classes.Box} onClick={event => onClick(event.currentTarget)}></li>
          <li id="box5" className={classes.Box} onClick={event => onClick(event.currentTarget)}></li>
          <li id="box6" className={classes.Box} onClick={event => onClick(event.currentTarget)}></li>
        </ul>
        
        <ul className={classes.Row}>
          <li id="box7" className={classes.Box} onClick={event => onClick(event.currentTarget)}></li>
          <li id="box8" className={classes.Box} onClick={event => onClick(event.currentTarget)}></li>
          <li id="box9" className={classes.Box} onClick={event => onClick(event.currentTarget)}></li>
        </ul>
      </div>
    </div>
  )
}

export default GameBoard;