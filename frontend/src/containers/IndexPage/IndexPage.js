import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import SearchElement from '../../components/SearchElement/SearchElement';
import GamesList from '../GamesList/GamesList';
import CreateGame from '../../components/CreateGame/CreateGame';
import GameBoard from '../../components/GameBoard/GameBoard';

class IndexPage extends Component {
  render() {
    return (
      <Aux>
        <SearchElement />
        <CreateGame />
        <GamesList />
        <GameBoard />
      </Aux>
    )
  }
}

export default IndexPage;
