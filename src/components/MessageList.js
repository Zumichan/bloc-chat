import React, { Component } from 'react';

class MessageList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      messages:[],
      username:"",
      content:"",
      sentAt:"",
      roomId:""
    }
   this.messagesRef = this.props.firebase.database().ref('messages');
   }

   createMessage(e) {
     e.preventDefault();
     this.messagesRef.push({
       username:this.state.username,
       content: this.state.content,
       sentAt: this.state.sentAt,
       roomId: this.state.roomId
     });
     {/*Clear the value of the text inputs on cretion of a message*/}
     this.setState({
       username:"",
       content:"",
       sentAt:"",
       roomId:""
     });
   }

   handleChange(e){
     e.preventDefault();
     this.setState({
       username: "user",
       content: e.target.value,
       sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
       roomId: this.props.activeRoom
      })
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
            this.state.messages.filter(message=>message.roomId == this.props.activeRoom).map((message, index)=>{
            if(message.roomId === this.props.activeRoom){
              return <li key={index}>{message.username} {message.content}</li>
            }
            return null;
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
