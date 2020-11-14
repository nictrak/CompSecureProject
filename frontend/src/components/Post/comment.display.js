import React, { useState, useEffect } from 'react';

const CommentDisplay = props => {

    const { username, post_id, comment_id, content } = props;

    const [commentContent, setCommentContent] = useState("Comment")

    const [editedComment, setEditedComment] = useState("")

    const handleEditCommentTextChange = e => {
        setEditedComment(e.target.value)
    }

    const handleEditedCommentSaveChange = e => {
        e.preventDefault();
        // UserService.updateComment(comment_id, user_id, editedComment).then(response => { }, err => {
        //     const resMessage =
        //         (error.response &&
        //             error.response.data &&
        //             error.response.data.message) ||
        //         error.message ||
        //         error.toString();
        // });
        setCommentContent(editedComment);
        const close_button = document.getElementById("editCommentModalCloseButton");
        close_button.click();
    }

    const handleDeleteComment = e => {
        e.preventDefault();
        // UserService.deleteComment(comment_id).then(response => { }, err => {
        //     const resMessage =
        //         (error.response &&
        //             error.response.data &&
        //             error.response.data.message) ||
        //         error.message ||
        //         error.toString();
        // });
        const close_button = document.getElementById("deleteCommentModalCloseButton");
        close_button.click();
    }

    return (
        <React.Fragment>
            <div className="row mt-2">
                <div className="col-md-2 col-sm-3"><h5><span className="badge badge-pill badge-dark">Username</span></h5></div>
                <div className="col-md-9 col-sm-7 comment-display-box ">{commentContent}</div>
                <div className="col-md-1 col-sm-2">
                    <div className="dropdown">
                        <button className="btn btn-secondary btn-sm" style={{ borderRadius: '50%' }} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-three-dots" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                            </svg>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button type="button" className="btn btn-primary dropdown-item" data-toggle="modal" data-target="#editModal">
                                Edit
                                    </button>
                            <button type="button" className="btn btn-primary dropdown-item" data-toggle="modal" data-target="#deleteModal">
                                Delete
                                    </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">Edit Comment</h5>
                            <button type="button" className="close" id="editCommentModalCloseButton" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    {/* <label for="exampleFormControlTextarea1">Example textarea</label> */}
                                    <textarea className="form-control" id="editCommentTextArea" rows="3" onChange={handleEditCommentTextChange} value={editedComment}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancle</button>
                            <button type="button" className="btn btn-primary" onClick={handleEditedCommentSaveChange}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Delete Comment</h5>
                            <button type="button" className="close" id="deleteCommentModalCloseButton" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancle</button>
                            <button type="button" className="btn btn-danger" onClick={handleDeleteComment}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CommentDisplay;