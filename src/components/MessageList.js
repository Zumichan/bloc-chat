import React, { Component } from 'react';
import moment from 'moment';
import './MessageList.css';

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
        <div className="container">
    <div className="row">
        <div className="col-md-6">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <span className="glyphicon glyphicon-comment"></span> <strong>You are in {this.props.activeRoom.name}</strong>
        <section className='panel-body'>
          <ul className='chat'>
          {
            this.state.messages.map((message, index)=>{
              if (this.props.activeRoom && (message.roomId === this.props.activeRoom.key)) {
                return <li className="left clearfix" key={index}>
                        <div className="chat-body clearfix">
                          <div className="header">
                            <span className="chat-img pull-left">
                              <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" className="img-circle" />
                            </span>
                            <strong className="primary-font">  {message.username} </strong> <small className="pull-right text-muted">
                              <span className="glyphicon glyphicon-time"></span>{message.sentAt}</small>
                          </div>
                          <p>
                            {message.content}
                          </p>
                        </div>
                       </li>
              } else {
                return null
              }
            })
          }
          </ul>
        <form className="message-form" onSubmit={ (e) => this.createMessage(e) }>
        <div className="panel-footer">
          <div className="input-group">
          <input id="btn-input"
                 type="text"
                 className="form-control input-sm"
                 value={ this.state.content }
                 placeholder="Type your message here..."
                 onChange={ (e) => this.handleChange(e) }
          />
          <span className="input-group-btn">
            <input className='btn btn-warning btn-sm' id="btn-chat" type="submit" value="Send"/>
          </span>
          </div>
        </div>
        </form>
        </section>
        </div>
          </div>
      </div>
  </div>
</div>
    );
  }
}

export default MessageList;
