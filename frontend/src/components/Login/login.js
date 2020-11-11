import React, { useState, useEffect } from 'react';

const Login = () => {

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

    const handleLoginButton = () => {

    }

    return (
        <div className='container'>
            <div className="row justify-content-center" style={{ height: '100vh' }}>
                <div className="col-sm-8 col-md-6 col-lg-4 my-auto">
                    <h1 className='text-primary'>Login</h1>
                    <form>
                        <div className="form-group">
                            <label for="userNameInput">Username</label>
                            <input type="text" className="form-control" id="userNameInput" onChange={handleUsernameChange} value={username} />
                        </div>
                        <div className="form-group">
                            <label for="innputPassword">Password</label>
                            <input type="password" className="form-control" id="innputPassword" onChange={handlePasswordChange} value={password} />
                        </div>
                        <small className="">Aren't a member yet? <a href="/register">Register</a></small>
                        <div className="w-100 text-right">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;