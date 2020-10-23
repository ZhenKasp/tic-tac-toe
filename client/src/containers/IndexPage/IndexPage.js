import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import SearchElement from '../../components/SearchElement/SearchElement';
import GamesList from '../GamesList/GamesList';
import CreateGame from '../CreateGame/CreateGame';
import GameBoard from '../../components/GameBoard/GameBoard';
import classes from './IndexPage.module.css';
import axios from 'axios';

class IndexPage extends Component {
  state = {
    isGame: false,
    moves: "0|0|0|0|0|0|0|0|0",
    suggestions: [],
    clickedTags: []
  }

  changeView = (moves) => this.setState({ isGame: true, moves: moves});

  handleFilter = (clickedTag) => {
    if (this.state.clickedTags.includes(clickedTag)) {
      this.setState({clickedTags: this.state.clickedTags.filter((tag) => tag !== clickedTag)});
    } else {
      this.setState({clickedTags: [...this.state.clickedTags, clickedTag]});
    }
  }

  componentDidMount() {
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "tags", { headers: { authorization: localStorage.getItem('token') }})
      .then(res => {
        if (res.data.error) {
          this.props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          this.setState({ suggestions: res.data.suggestions });
        }
      });
    } catch (err) {
      this.props.createFlashMessage(err.message, "danger");
    }
  }

  render() {
    return (
      <div className={classes.IndexPage}>
        {this.state.isGame === false ? (
          <Aux>
            <CreateGame 
              createFlashMessage={this.props.createFlashMessage}
              changeView={this.changeView}
              suggestions={this.state.suggestions}
            />
            <SearchElement
              tags={this.state.suggestions}
              onClick={this.handleFilter}
              clickedTags={this.state.clickedTags}
            />
            <GamesList 
              changeView={this.changeView}
              gameList={this.state.gameList}
              clickedTags={this.state.clickedTags}
            />
          </Aux>
        ) : <GameBoard params={this.state.gameParams} blockMoves={false} moves={this.state.moves} />
        }
      </div>
    )
  }
}

export default IndexPage;
