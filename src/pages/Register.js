import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from './../services/api'
import { Authcontext } from '../AuthContext'

function Register() {

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')
    const navigate = useNavigate();

    // const {login} = useContext(Authcontext)


    const handlesubmit = async(e) => {
        e.prevenDefault();
        try{
            await register({name, email, password});
            navigate('/login')
        } catch(error){
            console.log('Error')
        }

    };



  return (
    <div>
        <form onSubmit={handlesubmit}>
            <div>
                <label htmlFor='name'>Name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter your name'
                    required
                />
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your Email'
                    required
                />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your Password'
                    required
                />
            </div>
            <button>
                Register
            </button>
        </form>
    </div>
  )
}

export default Register
