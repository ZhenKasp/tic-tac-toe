import React  from 'react';
import classes from './ListElement.module.css';
import GameBoard from '../../components/GameBoard/GameBoard';

const listElement = (props) => {
  return (
    <div className={classes.ListElement} onClick={() => props.changeView(props.moves)}>
      <div>
        {props.name}
      </div>
      <div>
        {props.tags && props.tags.split("|").join(" ")}
      </div>
      <div>
        {props.firstUser}
      </div>
      <div>
        <GameBoard moves={props.moves} isBlocked={true} preview={true} />
      </div>
    </div>
  )
}

export default listElement;
