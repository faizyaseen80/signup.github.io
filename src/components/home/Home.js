import React, {useEffect } from 'react'
import './home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    let navigate = useNavigate()
    let token = localStorage.getItem("token")
    
    const fetchuser = async() => {
        const response = await fetch('http://localhost:5000/api/auth/getuser', {
            method: 'POST',
            headers: {
                'auth-token': token
            }
        })
        let json = await response.json()
        return json
    }
    
    fetchuser().then((value) => {
        const name = document.getElementById("name")
        const dob = document.getElementById("dob")
        const email = document.getElementById("email")
        name.innerHTML =`Name : ${ value.name}`
        dob.innerHTML =`Date of Birth : ${ value.dob}`
        email.innerHTML =`Email : ${ value.email}`
    })

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    useEffect(() => {
      if (localStorage.getItem("token")) {
          navigate('/')
        } else {
            navigate('/login')
        }
        // eslint-disable-next-line
}, [])
    

  return (
    <>
        <nav>
            <ul>
                <li>
                    Home
                </li>
            </ul>
                <button onClick={handleLogout}>Logout</button> 
        </nav>
        <div className='container'>
            <h1>Welcome</h1>
            <div className='home-container'>
                <p id='name'>User Name :</p>
                <p id='dob'>Date of Birth :&nbsp;</p>
                <p id='email'>Email :&nbsp;</p>
            </div>
        </div>
        </>
  )
}

export default Home