import React, { Component } from 'react';

class RoomList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ""
    }
    this.roomsRef = this.props.firebase.database().ref('rooms');
   }

   componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat(room) });
     });
   }

   createRoom(e) {
     e.preventDefault();
     if(!this.state.newRoomName){
       return
     }
     this.roomsRef.push(
       { name: this.state.newRoomName }
     );
     this.setState(
       { newRoomName:"" }
     )
   }

   handleChange(e){
     this.setState(
       { newRoomName: e.target.value }
     );
   }

    render(){
      return(
        <section className='room-list'>
        <ul>
          {
            this.state.rooms.map( (room,index) =>
              <li key={index} onClick={ () => this.props.changeActiveRoom(room) }>
                {room.name}
              </li>
            )
          }
        </ul>

         <form onSubmit={ (e) => this.createRoom(e) }>
           <input type="text"
                  value={ this.state.newRoomName }
                  placeholder="Please enter a room name."
                  onChange={ (e) => this.handleChange(e) }
           />
           <input type="submit" value="Create New Room"/>
         </form>
         </section>
      );
    }
  }

export default RoomList;
