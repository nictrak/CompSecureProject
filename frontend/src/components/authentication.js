import React, { useState, useEffect } from 'react';

const Authentication = () => {

    const [loginPage, setLoginPage] = useState(true)

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [confirmedPassword, setConfirmedPassword] = useState("")

    const handleUsernameChange = e => {
        e.preventDefault()
        setUsername(e.target.value)
    }

    const handlePasswordChange = e => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const handleConfirmedPasswordChange = e => {
        e.preventDefault()
        setConfirmedPassword(e.target.value)
    }

    const handleLoginButton = () => {

    }

    const toggleLoginPage = () => {
        setUsername('')
        setPassword('')
        setConfirmedPassword('')
        setLoginPage(!loginPage)
    }

    if (loginPage) {
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
                            <small className="">Aren't a member yet? <span className='link-to text-primary' onClick={toggleLoginPage}>Register</span></small>
                            <div className="w-100 text-right">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className='container'>
                <div className="row justify-content-center" style={{ height: '100vh' }}>
                    <div className="col-sm-8 col-md-6 col-lg-4 my-auto">
                        <h1 className='text-primary'>Register</h1>
                        <form>
                            <div className="form-group">
                                <label for="userNameInput">Username</label>
                                <input type="text" className="form-control" id="userNameInput" onChange={handleUsernameChange} value={username} aria-describedby="usernameHelp" />
                                <small id="usernameHelp" className="form-text text-muted">Username must contain only alphabets and numbers.</small>
                            </div>
                            <div className="form-group">
                                <label for="innputPassword">Password</label>
                                <input type="password" className="form-control" id="innputPassword" onChange={handlePasswordChange} value={password} aria-describedby="passwordHelp" />
                                <small id="passwordHelp" className="form-text text-muted">Password must contain at least 8 characters.</small>
                            </div>
                            <div className="form-group">
                                <label for="innputConfirmedPassword">Confirmed Password</label>
                                <input type="password" className="form-control" id="innputConfirmedPassword" onChange={handleConfirmedPasswordChange} value={confirmedPassword} aria-describedby="confirmedPasswordHelp" />
                                {password !== '' && confirmedPassword !== '' ? password !== confirmedPassword ? <small id="confirmedPasswordHelp" className="form-text text-danger">Password doesn't match.</small> : <small id="confirmedPasswordHelp" className="form-text text-success">Password matches.</small> : null}
                            </div>
                            <small className="">Already a member! <span className='link-to text-primary' onClick={toggleLoginPage}>Login</span></small>
                            <div className="w-100 text-right">
                                <button type="submit" className="btn btn-success">Register</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Authentication;