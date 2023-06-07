import React from 'react'
import { useContext } from 'react';
import Notecontext from '../context/notes/Notecontext';
const Noteitem = (props) => {

  const {note,updateNote}=props;
  const context=useContext(Notecontext);
  const {deleteNote}=context;

  const handledelete=()=>{
    deleteNote(note._id)
    props.showAlert("Note deleted successfully","success")
  }

  return (<div className="col-md-3">
   <div className="card my-3" >
    <div className="card-body">
        <div className="d-flex align-items-center">
            
      <h5 className="card-title">{note.title}</h5>
      <i className="fa-solid fa-trash-can mx-2" onClick={handledelete}></i>
      <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>

      </div>
      <p className="card-text">{note.description}</p>

    </div>
  </div>
  </div>
  )
}

export default Noteitem