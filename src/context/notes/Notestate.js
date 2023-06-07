import React, { useState } from "react";
import Notecontext from "./Notecontext";

const Notestate=(props)=>{
const host="http://localhost:5000"
const notesInitial=[]
  //get all notes
  const getNotes=async ()=>{
    //TODO api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
"authtoken":localStorage.getItem('token')
      },
    });
const json =await response.json()
    console.log(json)
    setNotes(json)

  }
  const [notes,setNotes]=useState(notesInitial)
  //add a note
  const addNote=async (title,description,tag)=>{
    //TODO api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
"authtoken":localStorage.getItem('token')
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
const note=await response.json();
setNotes(notes.concat(note))
  }
  //delete a note
  const deleteNote=async (id)=>{

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
"authtoken":localStorage.getItem('token')
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    const json =await response.json()

    const newnotes=notes.filter((note)=>{return note._id!==id});
    setNotes(newnotes)
   


  }
  //edit a note
  const editNote=async (id,title,description,tag)=>{
    //API CALL using fetch api
    
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
"authtoken":localStorage.getItem('token')
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    const json=await response.json;
    let newNotes=JSON.parse(JSON.stringify(notes))
    //logic to edit in client
for (let index = 0; index < notes.length; index++) {
  const element = newNotes[index];
  if(element._id==id){
    newNotes[index].title=title;
    newNotes[index].description=description;
    newNotes[index].tag=tag;

    break;  
  }
 
}

setNotes(newNotes);

  }
return (
   
    <Notecontext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNotes}} >
        {props.children}
    </Notecontext.Provider>
)
}
export default Notestate;