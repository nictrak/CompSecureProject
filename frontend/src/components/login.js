import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AuthService from '../api/auth.service'

const Login = props => {

    const { setUser } = props;

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const handleUsernameChange = e => {
        e.preventDefault()
        setUsername(e.target.value)
    }

    const handlePasswordChange = e => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const handleLoginButton = (e) => {
        e.preventDefault();
        AuthService.login(username, password).then(
            response => {
                window.location.replace('/')
                console.log(localStorage.getItem("user"))
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

            }
        );
    }

    return (
        <div className='container'>
            <div className="row justify-content-center" style={{ height: '100vh' }}>
                <div className="col-sm-8 col-md-6 col-lg-4 my-auto">
                    <h1 className='text-primary'>Login</h1>
                    <form>
                        <div className="form-group">
                            <label for="userNameInput">Username</label>
                            <input type="text" className="form-control" id="userNameInput" onChange={handleUsernameChange} value={username} required />

                        </div>
                        <div className="form-group">
                            <label for="innputPassword">Password</label>
                            <input type="password" className="form-control" id="innputPassword" onChange={handlePasswordChange} value={password} required />
                        </div>
                        <small className="">Aren't a member yet? <Link to="/register" >Register</Link></small>
                        <div className="w-100 text-right">
                            <button type="submit" className="btn btn-primary" onClick={handleLoginButton}>Login</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );

}

export default Login;