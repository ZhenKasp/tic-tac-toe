import React, { Component } from 'react';
import classes from './CreateGame.module.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import GameBoard from '../../components/GameBoard/GameBoard';
import { WithContext as ReactTags } from 'react-tag-input';

class CreateGame extends Component {
  state = {
    tags: [],
    name: ''
  }

  handleMovesChange = (moves) => {
    this.setState({ moves: moves });
  }

  handleDelete = (i) => {
    const { tags } = this.state;
    this.setState({tags: tags.filter((_, index) => index !== i)});
  }

  handleAddition = (tag) => {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag = (tag, currPos, newPos) => {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    this.setState({ tags: newTags });
  }

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  }

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
        } else {
          this.setState({ name: '', tags: [] });
          this.props.createFlashMessage(res.data.message, res.data.variant)
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
          <input 
            type="text"
            value={this.state.name}
            placeholder="Game name" 
            onChange={this.handleNameChange}
          />
          <ReactTags
            classNames={{
              tag: classes.Tag,
              tagInputField: classes.TagInputField,
              tagInput: classes.TagInput,
              remove: classes.RemoveTag,
              suggestions: classes.SuggestionsTag
            }}
            suggestions={[
              { id: 'USA', text: 'USA' },
              { id: 'Germany', text: 'Germany' },
              { id: 'Austria', text: 'Austria' },
              { id: 'Costa Rica', text: 'Costa Rica' },
              { id: 'Sri Lanka', text: 'Sri Lanka' },
              { id: 'Thailand', text: 'Thailand' }
           ]}
            tags={this.state.tags}
            name="tags"
            handleDelete={this.handleDelete}
            handleAddition={this.handleAddition}
            handleDrag={this.handleDrag}
            inputFieldPosition="inline"
          />
          <h3>Set the first move:</h3>
          <GameBoard />
          <Button 
            variant="primary" 
            type="sybmit" 
            onClick={this.createGameOnClick}>
            Create game
          </Button> 
      </div>
    )
  }
}

export default CreateGame;
