import React, { Component } from 'react';
import ListElement from "../../components/ListElement/ListElement";
import classes from './ListGames.module.css';
import axios from 'axios';
import Aux from '../../hoc/Auxiliary';
import SearchElement from '../../components/SearchElement/SearchElement';

class ListGames extends Component {
  state = {
    games: [{id: 1, name: "First game"}, {id: 2, name: "This is a game #2"}]
  }

  componentDidMount(){
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER, { headers: { authorization: localStorage.getItem('token') }})
      .then(res => {
        console.log(res.data)
        if (res.data.error) {
          this.props.createFlashMessage(res.data.error, res.data.variant);
          this.props.setToken({token: res.data.token});
          this.props.viewHandler("signin");
        } else {
          this.setState({ games: res.data.games });
        }
      });
    } catch (err) {
      this.props.createFlashMessage(err.message, "danger");
    }
  }

  returnGameElements = () => {
    const games = this.state.games;
    if (games.length !== 0) {
      return (games.map(game => {
        return (
          <ListElement 
            key={game.id}
            id={game.id}
            name={game.name}  
          />
        )
      }))
    } else {
      return (
        <div>There are no available games, but u can create one of them!</div>
      )
    }
  }
 
  render() {
    const ListElement = this.returnGameElements;
    return (
      <Aux>
        <SearchElement />
        <div className={classes.ListGames}>
          <div className={classes.Header}>List of games:</div>
          <ListElement />
        </div>
      </Aux> 
    )
  }
}

export default ListGames
