import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000";
  const initalnotes = []
  const [notes, setnotes] = useState(initalnotes);

  //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiZjEyYTcwMjM5NGM3NGE4MjdhZmRmIn0sImlhdCI6MTYzOTkyNzAzM30.SSsHXSZSXqMCIihE-K52ft9j7SzdS0rNTLu0mzbi1Rg'


  //Fetch All Notes
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'authorization-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json);
    setnotes(json);
  }

  //Add a note
  const addNote = async (title, description, tag) => {
    console.log("new note added");
    //API Call
    const response = await fetch(`${host}/api/notes/addnewnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'authorization-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    setnotes(notes.concat(json));
  }

  //Delete a note
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'authorization-token': localStorage.getItem('token')
      }
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    console.log(json);

    console.log("deleting a note with id: " + id)
    const newnote = notes.filter((note) => { return note._id !== id });
    setnotes(newnote);
  }


  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'authorization-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    const responsedata = await response.json(); // parses JSON response into native JavaScript objects
    console.log(responsedata);

    //logic to edit note
    let newNotes= JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];

      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
      
    }
    setnotes(newNotes);
  }


  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;