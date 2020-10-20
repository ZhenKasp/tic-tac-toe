import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import FlashMessage from '../../components/FlashMessage/FlashMessage';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import TicTacToe from '../TicTacToe/TicTacToe';

class SelectorForm extends Component {
  state = {
    token: "",
    users: "",
    flashMessage: "",
    variant: "danger",
    view: "signin",
  }

  flashMessageHandler = (message, variant) => {
    this.setState({flashMessage: message, variant: variant});
    setTimeout(() => { this.setState({ flashMessage: "", variant: "danger"}) }, 5000);
  }

  viewHandler = (view) => {
    this.setState({view: view});
  }

  chooseViewToRender = () => {
    if (localStorage.getItem('token')) {
      return (
        <TicTacToe
          createFlashMessage={this.flashMessageHandler}
          viewHandler={this.viewHandler}
          setToken={this.setToken}
        />
       )
    } else {
      if (this.state.view === "signup") {
        return (
          <SignUp
            createFlashMessage={this.flashMessageHandler}
            viewHandler={this.viewHandler}
            setToken={this.setToken}
          />
        )
      } else {
        return (
          <SignIn
            createFlashMessage={this.flashMessageHandler}
            viewHandler={this.viewHandler}
            setToken={this.setToken}
          />
        )
      }
    }
  }

  setToken = token => {
    if (token) {
      localStorage.setItem('token', token);
    this.setState({token: token});
    } else {
      localStorage.removeItem('token');
      this.setState({token: token});
    }
  };

  render () {
    const View = this.chooseViewToRender;
    return (
      <Aux>
        <Toolbar
          createFlashMessage={this.flashMessageHandler}
          changeView={this.viewHandler}
          active={this.state.view}
          setToken={this.setToken}
        />
        {this.state.flashMessage &&
        <FlashMessage variant={this.state.variant}>
          {this.state.flashMessage}
        </FlashMessage>}
        <View />
      </Aux>
    )
  }
}

export default SelectorForm;
