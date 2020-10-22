import React from 'react';
import classes from './SearchElement.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';

const searchElement = (props) => (
  <div className={classes.SearchElement}> 
    <p>Search:</p> 
    <Form onSubmit={(event) => console.log(event)} >
      <Form.Control type="text" placeholder="Search game" />
      <Button variant="primary" type="submit">
        Find game
      </Button> 
    </Form>
  </div>
)

export default searchElement;