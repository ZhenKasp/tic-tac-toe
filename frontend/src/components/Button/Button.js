import React from 'react';
import Button from 'react-bootstrap/Button';
import classes from './Button.module.css';
import axios from 'axios';

const button = (props) => {

  return (
    <Button
      className={classes.Button} >
        Button
    </Button>
  )
}

export default button;