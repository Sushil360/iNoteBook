import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Context/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';

export default function Notes() {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const ref = useRef(null);
    const refClose = useRef(null);

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])

    const updatenote = (currentnote) => {
        ref.current.click();
        setnote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });
    }

    const onchange = (element) => {
        setnote({ ...note, [element.target.name]: element.target.value });
    }

    const handleClick = (element) => {
        console.log("updating the note ... ", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        //element.preventDefault();
        //addNote(note.title,note.description,note.tag);
    }


    return (
        <>
            <AddNote />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp"
                                        onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange} minLength={5} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5 || note.edescription<5} onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h1>Your Notes</h1>
                <div className="container mx-2">
                    {notes.length === 0 && 'No Notes to display'}
                </div>
                {notes.map((notes) => {
                    return <Noteitem key={notes._id} notes={notes} updatenote={updatenote} />;
                })}
            </div>
        </>
    )
}
