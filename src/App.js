import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

{/*Initialize Firebase*/}
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
      user:""
    };
  }

  changeActiveRoom(room){
    this.setState({ activeRoom: room })
  }

  setUser(user) {
    this.setState({ user: user });
  }

  render() {
    console.log("Render has user " + this.state.user)
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
          <section className="container-left">
              <div className="user-name">
                <h3>Welcome {this.state.user === null? "Guest" : this.state.user.displayName}!</h3>
                <ul>
                  <User
                    firebase={ firebase }
                    user={ this.state.user }
                    setUser={ (user) => this.setUser(user) }
                  />
                </ul>
              </div>
              <div className="room-list">
                <h3>You are in : {this.state.activeRoom.name || "Select A Room"}</h3>
                <ul>
                  <RoomList
                    firebase={firebase}
                    activeRoom={ this.state.activeRoom }
                    changeActiveRoom={ (room) => this.changeActiveRoom(room) }
                  />
                </ul>
             </div>
            </section>
            <section className="container-right">
            <div className="message-list">
              <ul>
              <MessageList
                firebase={firebase}
                activeRoom={ this.state.activeRoom }
                //In order to use user as props in MessageList.js
                user={ this.state.user }
              />
              </ul>
            </div>
          </section>
      </div>
    );
  }
}

export default App;
