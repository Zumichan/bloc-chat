import React, { Component } from 'react';

class MessageList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username:"",
      content:"",
      sentAt:"",
      roomId:"",
      messages:[]
    }
   this.messagesRef = this.props.firebase.database().ref('messages');
   }

   createMessage(e) {
     e.preventDefault();
     this.messagesRef.push({
       username: this.state.username,
       content: this.state.content,
       sentAt: this.state.sentAt,
       roomId: this.state.roomId,
     });
     {/*Clear the value of the text inputs on cretion of a message*/}
     this.setState({
       username:"",
       content:"",
       sentAt:"",
       roomId:"",
     });
   }

   componentDidMount() {
     this.massagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat(message) });
     });
   }



    render(){
      return(
        <section className='message-list'>

      </section>
      );
  }
}

export default MessageList;
