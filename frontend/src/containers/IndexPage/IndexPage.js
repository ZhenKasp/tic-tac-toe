import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import SearchElement from '../../components/SearchElement/SearchElement';
import GamesList from '../GamesList/GamesList';
import CreateGame from '../../components/CreateGame/CreateGame';
import GameBoard from '../../components/GameBoard/GameBoard';

class IndexPage extends Component {
  state = {
    isGame: localStorage.setItem("isGame", false),
    gameParams: {}
  }

  changeView = (isGame, params) => {
    this.setState({ isGame: isGame, gameParams: params })
  }

  render() {
    return (
      <Aux>
        {this.state.isGame === false ? (
          <Aux>
            <SearchElement />
            <CreateGame />
            <GamesList changeView={this.changeView} />
          </Aux>
        ) : <GameBoard params={this.state.gameParams} />
        }
      </Aux>
    )
  }
}

export default IndexPage;
