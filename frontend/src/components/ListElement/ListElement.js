import React  from 'react';
import classes from './ListElement.module.css'

const listElement = (props) => {
  return (
    <div className={classes.ListElement} onClick={() => alert("click on ${props.id}")}>
      <div>
        {props.id}
      </div>
      <div>
        {props.name}
      </div> 
      <div>
        First user
      </div>
      <div>
        Second user
      </div> 
    </div>
  )
}
 
export default listElement;