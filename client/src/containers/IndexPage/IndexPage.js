import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import SearchElement from '../../components/SearchElement/SearchElement';
import GamesList from '../GamesList/GamesList';
import CreateGame from '../CreateGame/CreateGame';
import GameBoard from '../../components/GameBoard/GameBoard';
import classes from './IndexPage.module.css'

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
      <div className={classes.IndexPage}>
        {this.state.isGame === false ? (
          <Aux>
            <CreateGame 
              createFlashMessage={this.props.createFlashMessage} 
              changeGameParams={this.changeGameParams}
              changeView={this.changeView}
            />
            <SearchElement />
            <GamesList 
              changeView={this.changeView}
              gameList={this.state.gameList}
              />
          </Aux>
        ) : <GameBoard params={this.state.gameParams} />
        }
      </div>
    )
  }
}

export default IndexPage;
