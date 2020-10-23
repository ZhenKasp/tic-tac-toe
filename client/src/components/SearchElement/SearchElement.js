import React from 'react';
import classes from './SearchElement.module.css';
import 'bootstrap/dist/css/bootstrap.css';

const searchElement = (props) => {
  return (
    <div className={classes.SearchElement}> 
      <p>Filter:</p> 
      {props.tags.map(tag => {
        if (tag.length > 0) {
          return (
            <div
              className={props.clickedTags.includes(tag) ? classes.ClickedTag + " " + classes.Tag : classes.Tag }
              onClick={() => props.onClick(tag)}>
              {tag}
            </div>
          )
        } 
      })}
    </div>
  )  
}

export default searchElement;