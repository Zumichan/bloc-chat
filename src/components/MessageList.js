import React, { Component } from 'react';
import moment from 'moment';

class MessageList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      messages:[]
    }
   this.messagesRef = this.props.firebase.database().ref('messages');
   }

   componentDidMount() {
     this.messagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat(message) });
     });
   }

    render(){
      return(
        <section className='message-list'>
          {
            this.state.messages.map((message, index)=>{
              if (this.props.activeRoom && (message.roomId === this.props.activeRoom.key)) {
                return <li key={index}>{message.username}: {message.content}   {message.sentAt}</li>
              } else {
                return null
              }
            })
          }

        <form onSubmit={ (e) => this.createMessage(e) }>
          <input type="text"
                 value={ this.state.content }
                 placeholder="Enter a message"
                 onChange={ (e) => this.handleChange(e) }
          />
          <input type="submit" value="Send"/>
        </form>
        </section>
    );
  }
}

export default MessageList;
