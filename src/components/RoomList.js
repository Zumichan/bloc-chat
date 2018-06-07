import React, { Component } from 'react';

class RoomList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName:""
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
     {/*Prevent the default page reload on form submit*/}
     e.preventDefault();
      {/*If newRoomName has no value, return the function early=>User can't create empty newRoomName*/}
     if(!this.state.newRoomName){
       return
     }
     this.roomsRef.push(
       { name: this.state.newRoomName }
     );
     {/*Clear the value of the text input on cretion of a newRoomName*/}
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
         this.state.rooms.map( room =>
           <li key={room.key} >
              {room.name}
           </li>
         )
       }
       </ul>
       <form onSubmit={ (e) => this.createRoom(e) }>
         <input type="text"
                value={this.state.newRoomName}
                placeholder="Please enter a room name."
                onChange={(e) => this.handleChange(e)}
         />
         <input type="submit" value="Create New Room"/>
       </form>
      </section>
      );
  }
}

export default RoomList;
