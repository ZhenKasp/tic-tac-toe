import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import SearchElement from '../../components/SearchElement/SearchElement';
import GamesList from '../GamesList/GamesList';
import CreateGame from '../CreateGame/CreateGame';
import GameBoard from '../../components/GameBoard/GameBoard';

class IndexPage extends Component {
  state = {
    isGame: false,
    gameParams: {}
  }

  changeGameParams = (gameParams) => {
    this.setState({gameParams: gameParams})
  }

  changeView = (isGame) => {
    this.setState({ isGame: isGame})
  }

  render() {
    return (
      <Aux>
        {this.state.isGame === false ? (
          <Aux>
            <SearchElement />
            <CreateGame 
              createFlashMessage={this.props.createFlashMessage} 
              changeGameParams={this.changeGameParams}
              changeView={this.changeView}
            />
            <GamesList 
              changeView={this.changeView}
              gameList={this.state.gameList}
              />
          </Aux>
        ) : <GameBoard params={this.state.gameParams} />
        }
      </Aux>
    )
  }
}

export default IndexPage;
