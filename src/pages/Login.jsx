import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Contextproviders'
import { toast } from 'react-toastify'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const {login} = useAuth()

   const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            const response = await axios.post(
                "https://notebackendapp-1.onrender.com/api/auth/login",
               { email, password } 
            ) 
            if (response.data.success){
                toast.success(`Login Successfully`)
                login(response.data.user)
                localStorage.setItem('token',response.data.token)
                navigate('/')
            }
        }catch(error){
            console.log(error.message)
        }
    }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='border shadow p-6 w-80 bg-white'>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label className='block text-gray-700' htmlFor="email">Email</label>
                <input className='w-full px-3 py-4 border' onChange={(e)=> setEmail(e.target.value)} type="email" placeholder='Enter Your Email'/>
            </div>
            <div>
                <label className='block text-gray-700' htmlFor="password">Password</label>
                <input className='w-full px-3 py-4 border' onChange={(e)=> setPassword(e.target.value)} type="password" placeholder='********'/>
            </div>
            <div>
                <button type='submit' className='w-full bg-teal-600 text-white py-2'>Login</button>
                <p className='text-center'>Don't Have Account? <Link to="/register">Singn Up</Link></p>
            </div>
            
        </form>
        </div>
    </div>
  )
}

export default Login

