import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
   const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
               { name, email, password } 
            ) 
            
            if(response.data.success){
                navigate('/login')
            }
        }catch(error){
            console.log(error.message)
        }
    }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='border shadow p-6 w-80 bg-white'>
        <h2 className='text-2xl font-bold mb-4'>SignUp</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                <label className='block text-gray-700'>Name</label>
                <input className='w-full px-3 py-4 border' onChange={(e)=> setName(e.target.value)} type="text" placeholder='Enter Your Name'/>
            </div>
            <div>
                <label className='block text-gray-700' htmlFor="email">Email</label>
                <input className='w-full px-3 py-4 border' onChange={(e)=> setEmail(e.target.value)} type="email" placeholder='Enter Your Email'/>
            </div>
            <div>
                <label className='block text-gray-700' htmlFor="password">Name</label>
                <input className='w-full px-3 py-4 border' onChange={(e)=> setPassword(e.target.value)} type="password" placeholder='********'/>
            </div>
            <div>
                <button type='submit' className='w-full bg-teal-600 text-white py-2'>Signup</button>
                <p className='text-center'>Already Have Account? <Link to="/login">Login</Link></p>
            </div>
            
        </form>
        </div>
    </div>
  )
}

export default Signup 
