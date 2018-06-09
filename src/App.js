import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

{/*Initializing Firebase*/}
var config = {
  apiKey: "AIzaSyA8iZaf7j67xSX4rApcRe2YBiQadut4XCk",
  authDomain: "bloc-chat-b40f7.firebaseapp.com",
  databaseURL: "https://bloc-chat-b40f7.firebaseio.com",
  projectId: "bloc-chat-b40f7",
  storageBucket: "bloc-chat-b40f7.appspot.com",
  messagingSenderId: "1029301371739"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoom: "",
      activeMessage:""
    };
  }

  changeRoom(room){
    this.setState({ activeRoom: room })
  }

  addMessage(message){
    this.setState({ activeMessage: message })
  }

  render() {
    return (
      <div className="App">
        <header>
         <h1>Bloc Chat</h1>
        </header>
          <ul>
            <RoomList firebase={firebase} activeRoom={ this.state.activeRoom} changeRoom={this.changeRoom} />
            <MessageList firebase={firebase} activeRoom={this.state.activeRoom} addMessahe={this.addMessage} />
          </ul>
      </div>
    );
  }
}

export default App;
