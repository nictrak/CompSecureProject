import React, { useState, useEffect } from 'react'
import PostTextBox from './Post/post.textbox';
import PostDisplay from './Post/post.display';
import UserService from '../api/user.service';

const Feed = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {

        UserService.getAllPosts().then(
            responses => {
                console.log('Get all feed', responses)
                setPosts(responses.data.posts)
            }, error => { console.log(error) })

        // setPosts([
        //     { username: 'Test', post_id: 1, timedate: '29 OCT 2020', content: 'Test Post By Nick 1', comments: [{ username: 'Alexandra', comment_id: 1, content: 'Comment Na Ja by someone' }, { username: 'Rosalind', comment_id: 2, content: 'Good!' }] },
        //     {
        //         username: 'Beth', post_id: 2, timedate: '16 NOV 2020', content: "The gambit's queen", comments: [{ username: 'Benny', comment_id: 3, content: 'You lost!' }, { username: 'Test', comment_id: 4, content: 'Sorry T.T' }]
        //     }
        // ])
    }, [])

    return (
        <div className='row mt-4'>
            <div className='col-md-6 col-sm col-xs mx-auto'>
                <PostTextBox />
                <div className="d-flex flex-column-reverse bd-highlight">
                    {posts.map(post =>

                        <div key={post.post_id} className="bd-highlight"><PostDisplay key={post.post_id} username={post.username} post_id={post.post_id} timedate={post.timedate} content={post.content} comments={post.comments} />
                        </div>

                    )}
                </div>
            </div>
        </div>);
}

export default Feed;