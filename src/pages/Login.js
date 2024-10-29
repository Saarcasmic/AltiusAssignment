import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginn } from './../services/api'
import { Authcontext } from '../AuthContext'

function Login() {

    const [email, setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')

    const navigate = useNavigate();
    const {login} = useContext(Authcontext)


    const handlesubmit = async(e) => {
        e.prevenDefault();
        try{
            const data = await loginn({email, password});
            localStorage.setItem('token', data.token);
            login(data.token)
            navigate('/dashboard')
        } catch(error){
            if (error.response) {
                console.log('Error')
            }
        }

    };



  return (
    <div>
        <form onSubmit={handlesubmit}>
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
                Login
            </button>
        </form>
        <div>
            <p>
                <Link to="/register">Register</Link>
            </p>
        </div>
    </div>
  )
}

export default Login
