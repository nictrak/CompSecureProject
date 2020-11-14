import React, { useState, useEffect } from 'react';
import UserService from '../../api/user.service';
import CommentDisplay from './comment.display';

const PostDisplay = props => {

    const { username, post_id, timedate, content, comments } = props;

    const [postContent, setPostContent] = useState("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book");

    const [editedContent, setEditedContent] = useState(content);

    const [commentText, setCommentText] = useState("");

    const handleEditPostTextChange = e => {
        setEditedContent(e.target.value)
    }

    const handleCommentTextChange = e => {
        setCommentText(e.target.value)
    }

    const handleCommentOnPost = e => {
        e.preventDefault();
        // UserService.createComment(user_id, post_id, content).then(response => { }, error => {
        //     const resMessage =
        //         (error.response &&
        //             error.response.data &&
        //             error.response.data.message) ||
        //         error.message ||
        //         error.toString();
        // });
        setCommentText("")
    }

    const handlePostContentChange = e => {
        e.preventDefault();
        // UserService.updatePost(post_id, user_id, content).then(response => { }, err => {
        //     const resMessage =
        //         (error.response &&
        //             error.response.data &&
        //             error.response.data.message) ||
        //         error.message ||
        //         error.toString();
        // });
        setPostContent(editedContent);
        const close_button = document.getElementById("editPostModalCloseButton");
        close_button.click();
    }

    const handleDeletePost = e => {
        e.preventDefault();
        // UserService.deletePost(post_id).then(response => { }, error => {
        //     const resMessage =
        //         (error.response &&
        //             error.response.data &&
        //             error.response.data.message) ||
        //         error.message ||
        //         error.toString();
        // });
        const close_button = document.getElementById("deletePostModalCloseButton");
        close_button.click();
    }

    return (
        <React.Fragment>
            <div className="row my-3">
                <div className='col-12 mx-auto px-2 py-2 post-display-box'>
                    <div className='row  '>
                        <div className="col "><h4><span className="badge badge-pill badge-primary">Username</span></h4></div>
                        <div className='col text-right'><div className="dropdown" style={{ zIndex: '99' }}>
                            <div className='row align-items-center'>
                                <div className='col text-right'><small>Date Time</small></div>
                                <div className='col-lg-2 col-sm col-xs text-left'>
                                    <button className="btn btn-secondary btn-sm" style={{ borderRadius: '50%' }} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-three-dots" fill="white" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                        </svg>
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <button type="button" className="btn btn-primary dropdown-item" data-toggle="modal" data-target="#editPostModal">
                                            Edit
                                    </button>
                                        <button type="button" className="btn btn-primary dropdown-item" data-toggle="modal" data-target="#deletePostModal">
                                            Delete
                                    </button>
                                    </div></div>
                            </div>

                        </div>
                        </div>
                    </div>
                    <div className="row mx-auto py-2">
                        <div className="col-12"><b>{postContent}</b></div>
                    </div>
                    <div className='row my-3 px-3 align-items-center'>
                        <div className="input-group">
                            <input type="text" className="form-control" style={{ borderBottomLeftRadius: '16px', borderTopLeftRadius: '16px' }} placeholder="Comment on this post" aria-describedby="button-addon2" onChange={handleCommentTextChange} value={commentText} />
                            <div className="input-group-append">
                                <button className="btn btn-success" style={{ borderBottomRightRadius: '16px', borderTopRightRadius: '16px' }} type="button" id="button-addon2" onClick={handleCommentOnPost} disabled={commentText === ''}>Comment</button>
                            </div>
                        </div>
                    </div>
                    {/* <div className='row'>
                        <div className="col-12"><CommentDisplay /></div>
                    </div> */}
                    <CommentDisplay />
                    <CommentDisplay />
                </div>
            </div>
            <div className="modal fade" id="editPostModal" tabIndex="-1" aria-labelledby="editPostModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editPostModalLabel">Edit Post</h5>
                            <button type="button" id="editPostModalCloseButton" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    {/* <label for="exampleFormControlTextarea1">Example textarea</label> */}
                                    <textarea className="form-control" id="editCommentTextArea" rows="3" onChange={handleEditPostTextChange} value={editedContent}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancle</button>
                            <button type="button" className="btn btn-primary" onClick={handlePostContentChange}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="deletePostModal" tabIndex="-1" aria-labelledby="deletePostModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deletePostModalLabel">Delete Comment</h5>
                            <button type="button" id="deletePostModalCloseButton" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancle</button>
                            <button type="button" className="btn btn-danger" onClick={handleDeletePost}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default PostDisplay;