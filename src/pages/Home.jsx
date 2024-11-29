import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import NoteModel from '../components/NoteModel'
import axios from 'axios'
import CardNote from '../components/CardNote'
import {toast} from 'react-toastify'

const Home = () => {
    const [isModelOpen,setModelOpen] = useState(false)
    const [ filteredNotes,setFilteredNotes] = useState(false)

    const [notes,setNotes] = useState([])
    const [currentNote, setCurrentNote] = useState(null)
    const [query,setQuery] = useState('')

    useEffect(() => {
        
        fetchNotes()
    },[])

    useEffect(()=>{
        setFilteredNotes(
            notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase())) ||
            notes.filter((note) => note.description.toLowerCase().includes(query.toLowerCase())) 
        )
    },[query,notes])

    const fetchNotes = async () => {
        try {
            const {data} = await axios.get("https://notebackendapp-1.onrender.com/api/note",{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setNotes(data.notes)
        } catch (error) {
            console.log(error)
        }
       
    }

    const closeModel = () => {
        setModelOpen(false)
    }

    const onEdit = (note) => {
        setCurrentNote(note)
        setModelOpen(true)
    }

    const addNote = async (title, description) => {
        try{
            const response = await axios.post(
                "https://notebackendapp-1.onrender.com/api/note/add",
               { title, description } ,{
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
               }
               
            ) 
            
            if(response.data.success){
                toast.success("Note Added Successfully")
                fetchNotes()
                closeModel()
            }
        }catch(error){
            console.log(error.message)
        }
    }

    const editNote = async (id, title, description) => {
        try{
            const response = await axios.put(
                `https://notebackendapp-1.onrender.com/api/note/${id}`,
               { title, description } ,{
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
               }
               
            ) 
            
            if(response.data.success){
                fetchNotes()
                closeModel()
            }
        }catch(error){
            console.log(error.message)
        }
    }

    const deleteNote = async (id) => {
        try{
            const response = await axios.delete(
                `https://notebackendapp-1.onrender.com/api/note/${id}`,
               {
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
               }
               
            ) 
            
            if(response.data.success){
                toast.success('Note Deleted Successfully')
                fetchNotes()
                

            }
        }catch(error){
            console.log(error.message)
        }
    } 

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar setQuery={setQuery}/>
      <div className='px-8 pt-5 grid grid-cols-1 md: grid-cols-3 gap-6'>
        {filteredNotes.length > 0 ? filteredNotes.map(note => (
        <CardNote note={note} onEdit={onEdit} deleteNote={deleteNote}/>
      )):<p>No Notes Found</p>}
      </div>
      
      <button 
      onClick={() => setModelOpen(true)}
      className='fixed right-4 bottom-4 text-4xl bg-teal-500 text-white font-bold p-4 rounded-full'>+</button>
        {isModelOpen && <NoteModel closeModel={closeModel} addNote={addNote} currentNote={currentNote} editNote={editNote} /> }
    </div>
  )
}

export default Home
