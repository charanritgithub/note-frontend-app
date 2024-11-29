import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'


const authContext = createContext()


const ContextProviders = ({children}) => {
    const [user,setUser] = useState(null)
    const login = (user) => {
      setUser(user)
    }
    const logout = () => {
      localStorage.removeItem("token")
      setUser(null)
      toast.success(`logout from ${user.name} Account`)
    }

    useEffect(() => {
      const verifyUser = async () => {
        try {
            const res = await axios.get('https://notebackendapp-1.onrender.com/api/auth/verify',{
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
            })
          

            if(res.data.success){
              setUser(res.data.user)
            }else{
              setUser(null)
            }
        } catch (error) {
          console.log(error)
        }
      }
      verifyUser()
    },[])
  return (
    
      <authContext.Provider value={{ user,login,logout }}> {children} </authContext.Provider>
    
  )
}
export const useAuth = () => useContext(authContext) 

export default ContextProviders
