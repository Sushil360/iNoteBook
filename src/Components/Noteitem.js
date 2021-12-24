import React,{useContext} from 'react'
import noteContext from '../Context/noteContext';

export default function Noteitem(props) {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const { notes,updatenote} = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{notes.title}</h5>
                    <p className="card-text">{notes.description} </p>
                    <i className="fas fa-trash-alt mx-3" onClick={()=>{deleteNote(notes._id); props.showAlert("Deleted Successfully","success")}}></i>
                    <i className="fas fa-edit mx-3" onClick={()=>{updatenote(notes)}}></i>
                </div>
            </div>
        </div>
    )
}
