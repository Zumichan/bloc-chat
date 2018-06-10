import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

{/*Firebase Initialization*/}
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
      activeMessage: ""
    };
  }

  //added
  changeActiveRoom(room){
    this.setState({ activeRoom: room })
  }

  //added
  showMessage(message){
    this.setState({ activeMessage: message })
  }

  render() {
    return (
      <div className="App">
        <header>
         <h1>Bloc Chat</h1>
        </header>
            //added
          <div className="container">
            <ul>
              <RoomList
                firebase={firebase}
                activeRoom={ this.state.activeRoom }
                changeActiveRoom={ (room) => this.changeActiveRoom(room) }
              />
              <MessageList
                firebase={firebase}
                activeRoom={ this.state.activeRoom }
                showMessage={ (message) => this.showMessage(message) }
              />
            </ul>
          </div>
      </div>
    );
  }
}

export default App;
