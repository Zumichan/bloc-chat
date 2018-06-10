import React, { Component } from 'react';

class MessageList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      messages:[],
      newMessage:""
    }
   this.messagesRef = this.props.firebase.database().ref('messages');
   }

   createMessage(e) {
     e.preventDefault();
     this.messagesRef.push({
       username:"username",
       content: this.state.newMessage,
       sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
       roomId: this.props.activeRoom.key
     });
     //Clear the value of the text inputs on cretion of a message
     this.setState({
       username:"",
       content:"",
       sentAt:"",
       roomId:""
     });
   }

   handleChange(e){
     this.setState(
       { newMessage:""}
     )
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
          <h2 className='room-name'>
            { this.props.activeRoom? this.props.activeRoom.name : "Please select a room" }
          </h2>

            //filter results by the ID of the active room
            <ul>
            {this.state.messages.map((message,index)=>
              <div key={index}>
                {message.content}
              </div>
          )}
          </ul>
          <form onSubmit={ (e) => this.handleChange(e) }>
          <input value={ this.state.newMessage }
                 onChange={ (e) => this.handleChange(e) }
          />
          <input type="submit" value="Select"/>
          </form>

      </section>
      );
  }
}

export default MessageList;
