import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useUser } from '../hooks/useUser.ts'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const {user} = useAuth0()
  const userDB = useUser()
  const navigate = useNavigate()
  const initialFormData = {
    firstName: '',
    email: '',
  }
  console.log(user)
  const [formData, setFormData] = useState(initialFormData)
  
  useEffect(()=> {
    if (userDB.data) navigate('/')
  }, [userDB.data, navigate])
    
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setFormData({...formData, 'email': user.email})
    console.log('formData', formData)
  }
  // to do: 
  // mutation that adds user --> use add from useEvents
  // write api function in apis/users
  // write the post call in routes to call db function 
  // write a db function 

  // also we need to run lint and fix the errors and warnings before code review
  
 
  

  return (
    <>
      <h2>Welcome to EarthMates</h2>
      <form>
        <label htmlFor="firstName"> First Name:</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={handleChange}
          value={formData.firstName}
        />
        {/* <label HTMLfor='lastName'>Last Name</label>
    <input id='lastName' name='lastName' type='text' onchange={handleChange} value={formData.lastName}/>
    <label HTMLfor='location'>Location</label>
    <input id='location' name='location' type='text' onchange={handleChange} value={formData.location}/> */}
        <button onClick={handleRegister}>Register</button>
      </form>
    </>
  )
}
