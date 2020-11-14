import React, { useState, useEffect } from 'react'
import PostTextBox from './Post/post.textbox';
import PostDisplay from './Post/post.display';

const Feed = () => {
    return (
        <div className='row mt-4'>
            <div className='col-md-6 col-sm col-xs mx-auto'>
                <PostTextBox />
                <PostDisplay />
            </div>
        </div>);
}

export default Feed;