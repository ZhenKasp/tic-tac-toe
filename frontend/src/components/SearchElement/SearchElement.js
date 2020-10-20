import React from 'react';
import classes from './SearchElement.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const searchElement = (props) => (
  <div className={classes.SearchElement}> 
    <p>Search:</p> 
    <Form onSubmit={(event) => console.log(event)} >
      <Row>
        <Col>
          <Form.Control type="text" placeholder="Search game" />
        </Col>
        <Col>
          <Button variant="primary">
            Find game
          </Button>
        </Col>
      </Row>    
    </Form>
  </div>
)

export default searchElement;