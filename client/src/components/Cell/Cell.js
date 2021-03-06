import React from "react";
import classes from "./Cell.module.css";

const cell = (props) => {
  let move = ""
  if (props.move === "1") {
    move = classes.Cross + ' fa fa-close'
  } else if (props.move === "2") {
    move = classes.Circle + ' fa fa-circle-o'
  }

  return (
    <div
      id={props.id}
      className={`${classes.Cell} ${move} ${props.preview && classes.Preview}`}
      onClick={e => props.onClick(e.currentTarget)}
    />
  )
}

export default cell;