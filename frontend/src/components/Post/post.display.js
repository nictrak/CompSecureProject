import React, { useState, useEffect } from 'react'

const PostDisplay = props => {

    const { username, post_id, timedate, content, comments } = props;

    const [editedContent, setEditedContent] = useState(content)

    return (
        <div className="row">
            <div className='col-6 mx-auto'>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title"><span className='badge badge-primary'>username</span></h5>
                        {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a> */}
                        <form>
                            <div className='form-group'>
                                <textarea className='form-control post-text-box-text-area' />
                            </div>
                            <button type='submit' className='btn btn-block btn-primary' >Create Post</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDisplay;