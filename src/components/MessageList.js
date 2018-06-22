import React, { Component } from 'react';
import moment from 'moment';

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

  componentDidMount() {
     this.messagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat(message) });
     });
  }

  createMessage(e) {
     e.preventDefault();
     this.messagesRef.push({
       username:this.state.username,
       content:this.state.content,
       sentAt:this.state.sentAt,
       roomId:this.state.roomId
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
       username: !this.props.user ? "Guest" : this.props.user.displayName,
       content: e.target.value,
       sentAt: moment().format('h:mm a'),
       roomId: this.props.activeRoom.key
      })
      //console.log(this.props.user,"user is undefined");
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
