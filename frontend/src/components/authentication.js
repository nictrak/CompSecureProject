import React, { useState, useEffect } from 'react';
import AuthService from '../api/auth.service'

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

    const handleLoginButton = (e) => {
        e.preventDefault();
        AuthService.login(username, password);
        // .then(
        //     () => {
        //         window.location.reload();
        //     },
        //     error => {
        //         const resMessage =
        //             (error.response &&
        //                 error.response.data &&
        //                 error.response.data.message) ||
        //             error.message ||
        //             error.toString();

        //     }
        // );
    }

    const handleRegisterButton = () => {

        AuthService.register(
            username,
            password
        ).then(
            response => {

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
                                <input type="text" className="form-control" id="userNameInput" onChange={handleUsernameChange} value={username} required />

                            </div>
                            <div className="form-group">
                                <label for="innputPassword">Password</label>
                                <input type="password" className="form-control" id="innputPassword" onChange={handlePasswordChange} value={password} required />
                            </div>
                            <small className="">Aren't a member yet? <span className='link-to text-primary' onClick={toggleLoginPage}>Register</span></small>
                            <div className="w-100 text-right">
                                <button type="submit" className="btn btn-primary" onClick={handleLoginButton}>Login</button>
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
                                <input type="text" className="form-control" id="userNameInput" onChange={handleUsernameChange} value={username} aria-describedby="usernameHelp" required pattern="^(?=.*[a-zA-Z])(?=\w*[0-9])\w{3,20}$" />
                                <small id="usernameHelp" className="form-text text-muted">Username must contain 3 to 20 characters, only alphabets or numbers.</small>
                            </div>
                            <div className="form-group">
                                <label for="innputPassword">Password</label>
                                <input type="password" className="form-control" id="innputPassword" onChange={handlePasswordChange} value={password} aria-describedby="passwordHelp" required required minLength={8} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{8, 20}$" />
                                <small id="passwordHelp" className="form-text text-muted">Password must contain at least 8 characters.</small>
                            </div>
                            <div className="form-group">
                                <label for="innputConfirmedPassword">Confirmed Password</label>
                                <input type="password" className="form-control" id="innputConfirmedPassword" onChange={handleConfirmedPasswordChange} value={confirmedPassword} aria-describedby="confirmedPasswordHelp" required minLength={8} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{8, 20}$" />
                                {password !== '' && confirmedPassword !== '' ? password !== confirmedPassword ? <small id="confirmedPasswordHelp" className="form-text text-danger">Password doesn't match.</small> : <small id="confirmedPasswordHelp" className="form-text text-success">Password matches.</small> : null}
                            </div>
                            <small className="">Already a member! <span className='link-to text-primary' onClick={toggleLoginPage}>Login</span></small>
                            <div className="w-100 text-right">
                                <button type="submit" className="btn btn-success" onClick={handleRegisterButton}>Register</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Authentication;