import React  from 'react';
import classes from './ListElement.module.css'

const listElement = (props) => {
  return (
    <div className={classes.ListElement} onClick={() => props.changeView(true, "")}>
      <div>
        {props.id}
      </div>
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
        Second user
      </div>
      <div>
        GamePreview
      </div>
    </div>
  )
}

export default listElement;
