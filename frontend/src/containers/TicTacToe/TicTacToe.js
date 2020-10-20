import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import SearchElement from '../../components/SearchElement/SearchElement';
import ListGames from '../ListGames/ListGames';

class TicTacToe extends Component {
  render() {
    return (
      <Aux>
        <SearchElement />
        <div>
          Add games
        </div>
        <ListGames />
      </Aux>
    )
  }
}

export default TicTacToe;
