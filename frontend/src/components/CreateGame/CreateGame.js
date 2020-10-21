import React from 'react';
import classes from './CreateGame.module.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const createGame = (props) => {
  const createGameOnClick = () => {
    try {
      axios.post(process.env.REACT_APP_PATH_TO_SERVER + "games", {}, { headers: { authorization: localStorage.getItem('token') }})
      .then(res => {
        console.log(res.data)
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
          // this.props.setToken({token: res.data.token});
          // this.props.viewHandler("signin");
        } else {
          props.createFlashMessage(res.data.message, res.data.variant)
          console.log(res.data)
        }
      });
    } catch (err) {
      this.props.createFlashMessage(err.message, "danger");
    }
  }

  return (
    <div className={classes.CreateGame}>
      <div className={classes.Header}>
        Create game:
      </div>
      <Button variant="primary" onClick={createGameOnClick}>
        Create game
      </Button>
    </div>
  )
}

export default createGame;
