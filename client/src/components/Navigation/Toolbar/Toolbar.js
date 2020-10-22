import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
  <div className={classes.ToolbarWrapper}>
    <header className={classes.Toolbar}>
      <div>Tic Tac Toe</div>
      <nav>
        <NavigationItems 
          changeView={props.changeView} 
          active={props.active}
          createFlashMessage={props.createFlashMessage} 
          setToken={props.setToken}
        />
      </nav>
    </header>
  </div>
);

export default toolbar;