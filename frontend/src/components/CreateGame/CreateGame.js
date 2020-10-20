import React from 'react';
import classes from './CreateGame.module.css';
import Button from 'react-bootstrap/Button';

const createGame = (props) => (
  <div className={classes.CreateGame}>
    <div className={classes.Header}>
      Create game:
    </div>
    <Button variant="primary" type="submit">
      Create game
    </Button>
  </div>
)

export default createGame;
