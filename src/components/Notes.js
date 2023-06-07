import React, { useContext, useEffect, useRef,useState } from 'react'
import Notecontext from '../context/notes/Notecontext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
        const context = useContext(Notecontext);
        let history=useNavigate();

    const { notes, getNotes,editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
        getNotes()
        console.log(localStorage.getItem('token'))
        //eslint-disable-next-line
        }
        else{
history("/login")
        }
    }, [])
    const [note, setNote] = useState({id:"", etitle:"",edescription:"",etag:"Default"})
    const [prevnote, setPrevnote] = useState({id:"", title:"",description:"",tag:"Default"})

    const ref = useRef(null);
    const refclose=useRef(null)
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description,etag:currentNote.tag})
       setPrevnote(currentNote)
        
    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleClick=(e)=>{
    e.preventDefault();
    refclose.current.click();
    console.log(prevnote)
    editNote(note.id,note.etitle,note.edescription,note.etag)

   if(!(prevnote.title===note.etitle && prevnote.description===note.edescription && prevnote.tag===note.etag )){
    props.showAlert("updated successfully","success")}
   }

return (<>
    <AddNote showAlert={props.showAlert} />
    <button type="button" className="btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="container my-3">
                        <div ><h2>Add a Note</h2>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="etitle">Title</label>
                                    <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" onChange={onchange} value={note.etitle} name="etitle" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" onChange={onchange} value={note.edescription} name="edescription" />

                                </div>
                                <div className="mb-3 ">
                                    <label htmlFor="etag" className="etag" >Tag</label>
                                    <input type="text" className="form-control" htmlFor="etag" value={note.etag} />
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" ref={refclose} data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                </div>
            </div>
        </div>
    </div>
    <div className="row my-3">
        <h2 >Your Notes</h2>
        {notes.length===0 && <p>No notes to Display </p>}
        {notes.map((note) => { return <Noteitem key={note._id} note={note} showAlert={props.showAlert} updateNote={updateNote} /> })}
    </div>
</>
)
}

export default Notes