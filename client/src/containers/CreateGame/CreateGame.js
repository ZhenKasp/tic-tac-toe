import React, { Component } from 'react';
import classes from './CreateGame.module.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Modal from '../../components/UI/Modal/Modal';
import GameBoard from '../../components/GameBoard/GameBoard';
import TagsInput from '../../components/TagsInput/TagsInput';

class CreateGame extends Component {
  state = {
    tags: [],
    name: '',
    modalIsShown: false
  }

  handleMovesChange = (moves) => {
    this.setState({ moves: moves });
  }

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  }

  modalIsShownhandler = () => {
    this.setState({modalIsShown: true}); 
  }

  modalCloseHandler = () => {
    this.setState({modalIsShown: false}); 
  }

  tagsHandler = tags => this.setState({tags: tags})

  createGameOnClick = (event) => {
    try {
      const { tags, name } = this.state;
      const object = {
        name,
        tags: tags.map(tag => tag.text).join('|'),
        moves: localStorage.getItem("moves")
      };

      axios.post(process.env.REACT_APP_PATH_TO_SERVER + "games", object, { headers: { authorization: localStorage.getItem('token') }})
      .then(res => {
        if (res.data.error) {
          this.props.createFlashMessage(res.data.error, res.data.variant);
          this.modalCloseHandler();
        } else {
          this.setState({ name: '', tags: [] });

          this.props.createFlashMessage(res.data.message, res.data.variant)
          this.modalCloseHandler();
        }
      });
    } catch (err) {
      this.props.createFlashMessage(err.message, "danger");
    }
  }

  render() {
    return ( 
      <div className={classes.CreateGame}>
        <div className={classes.Header}>
          Create game:
        </div>
          <Modal show={this.state.modalIsShown} modalClosed={this.modalCloseHandler}>
            <input 
              type="text"
              value={this.state.name}
              placeholder="Game name" 
              onChange={this.handleNameChange}
            />
            <TagsInput onChange={this.tagsHandler} parentTags={this.state.tags} />
            <div className={classes.Header}>Set the first move:</div>
            <GameBoard isCreate={true} />
            <Button 
              className={classes.ButtonSubmit} 
              variant="primary" 
              type="sybmit" 
              onClick={this.createGameOnClick}>
              Create game
            </Button> 
          </Modal>
          <Button 
            variant="primary" 
            type="sybmit" 
            onClick={this.modalIsShownhandler}>
            Create game
          </Button> 
      </div>
    )
  }
}

export default CreateGame;
