import React, { Component } from 'react';
import './User.css';

class User extends Component {

  signIn(){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut(){
    this.props.firebase.auth().signOut();
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
    this.props.setUser(user);
    });
  }

  render(){
    return(
      <div>
        <button onClick={ () => this.signIn() }>Sign In</button>
        <button onClick={ () => this.signOut() }>Sign Out</button>
      </div>
    );
  }
}

export default User;
