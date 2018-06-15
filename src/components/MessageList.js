import React, { Component } from 'react';

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
          {/*filter results by the ID of the active room*/}
          {
            this.state.messages.map((message, index)=>{
              if (this.props.activeRoom && (message.roomId === this.props.activeRoom.key)) {
                return <li key={index}>{message.username}:{message.content}  {message.sentAt}</li>
              } else {
                return null
              }
              {/* Debug code
              return <li key={index}>{message.roomId} (selected {(this.props.activeRoom ? this.props.activeRoom.key : "nothing")})-- {message.username}:{message.content}</li>
              */}
            })
          }
      </section>
      );
  }
}

export default MessageList;
