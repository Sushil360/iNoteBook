import React,{useContext,useState} from 'react'
import noteContext from '../Context/noteContext';

function AddNote(props) {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setnote] = useState({title:"",description:"", tag:""})

    const handleClick = (element) =>{
        element.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnote({title:"",description:"", tag:""})
        props.showAlert("Note Added Successfully","success");
    }

    const onchange = (element) =>{
        setnote({...note,[element.target.name]:element.target.value} );
    }

    return (
        <div>
            <div className='container my-3 mt-3'>
                <h3>Enter your Notes </h3>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" value={note.title} name="title" aria-describedby="emailHelp" 
                            onChange={onchange}  minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description/Message</label>
                        <input type="text" className="form-control" id="description" value={note.description} name="description"  onChange={onchange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag}  onChange={onchange} minLength={5} required/>
                    </div>
                    <button disabled={note.title.length<5 || note.description<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
