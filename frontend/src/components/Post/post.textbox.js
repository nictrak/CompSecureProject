import React, { useState, useEffect } from 'react'
import UserService from '../../api/user.service'

const PostTextBox = () => {

    const [text, setText] = useState('');

    const handleTextChange = e => {
        setText(e.target.value)
    }

    const handleCreatePostButton = e => {
        e.preventDefault()
        UserService.createPost(1, text)
        setText('')
    }

    return (
        <div className="container">
            <div className="row">
                <div className='col-6 mx-auto'>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">What do you want to say?</h5>
                            {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a> */}
                            <form>
                                <div className='form-group'>
                                    <textarea className='form-control post-text-box-text-area' value={text} onChange={handleTextChange} />
                                </div>
                                <button type='submit' className='btn btn-block btn-primary' onClick={handleCreatePostButton} disabled={text === ''}>Create Post</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>);

}

export default PostTextBox