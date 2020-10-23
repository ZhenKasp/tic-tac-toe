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
    modalIsShown: false,
    resetMoves: false,
    moves: "0|0|0|0|0|0|0|0|0"
  }

  handleMovesChange = (moves) => {
    this.setState({ moves: moves });
  }

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  }

  modalIsShownHandler = () => {
    this.setState({modalIsShown: true, resetMoves: true }); 
  }

  modalCloseHandler = () => {
    this.setState({modalIsShown: false, resetMoves: false, name: '', tags: [] });
  }

  tagsHandler = tags => this.setState({tags: tags})

  createGameOnClick = (event) => {
    try {
      const { tags, name } = this.state;
      const object = {
        name,
        tags: tags.map(tag => tag.text).join('|'),
        moves: this.state.moves
      };

      axios.post(process.env.REACT_APP_PATH_TO_SERVER + "games", object, { headers: { authorization: localStorage.getItem('token') }})
      .then(res => {
        if (res.data.error) {
          this.props.createFlashMessage(res.data.error, res.data.variant);
          this.modalCloseHandler();
        } else {
          this.props.createFlashMessage(res.data.message, res.data.variant)
          this.props.changeView(this.state.moves)
        }
      });
    } catch (err) {
      this.props.createFlashMessage(err.message, "danger");
    }
  }

  movesChangeHandler = (moves) => this.setState({moves: moves})

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
            <TagsInput
              onChange={this.tagsHandler}
              parentTags={this.state.tags}
              suggestions={this.props.suggestions}
            />
            <div className={classes.Header}>Set the first move:</div>
            <GameBoard
              isCreate={true}
              resetMoves={this.state.resetMoves}
              onChange={this.movesChangeHandler}
            />
            <Button 
              className={classes.ButtonSubmit} 
              variant="primary" 
              type="sybmit" 
              onClick={this.createGameOnClick}>
              Create game
            </Button> 
          </Modal>
          <Button 
            onClick={this.modalIsShownHandler}>
            Create game
          </Button> 
      </div>
    )
  }
}

export default CreateGame;
