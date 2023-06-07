import React, { useContext, useState } from 'react'
import Notecontext from '../context/notes/Notecontext'

const AddNote = (props) => {
    const context=useContext(Notecontext);
    const {addNote}=context;
    const [note, setNote] = useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
addNote(note.title,note.description,note.tag);
setNote({title:"",description:"",tag:""})
props.showAlert("Note added successfully","success")
    }
    const onchange=(e)=>{
setNote({...note,[e.target.name]:e.target.value})
    }
    return (
      
        <div className="container my-3">
            <div ><h2>Add a Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="title">Title</label>
                        <input type="text" className="form-control" id="title" aria-describedby="emailHelp" onChange={onchange} value={note.title} name="title"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" onChange={onchange} value={note.description} name="description"/>
                   
                    </div>
                    <div className="mb-3 ">
                        <label htmlFor="tag" className="tag" >Tag</label>
                        <input type="text" className="form-control" htmlFor="tag" value={note.tag} name="tag" onChange={onchange}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button>
                </form>
            </div>

        </div>
    )
}

export default AddNote