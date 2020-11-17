import React, { useState, useEffect } from 'react';
import UserService from '../../api/user.service';
import AuthService from '../../api/auth.service';

const CommentDisplay = props => {

    const { username, comment_id, post_id, content } = props;

    const [commentContent, setCommentContent] = useState(content)

    const [editedComment, setEditedComment] = useState(content)

    const [isVisible, setIsVisible] = useState(true)

    const [isEligibleToDoActions, setIsEligibleToDoActions] = useState(false)

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        // console.log(comment_id, user)
        if (user)
            setIsEligibleToDoActions(user && user['token'] && (user['role'] === 'moderator' || user['username'] === username))
    }, [])

    const handleEditCommentTextChange = e => {
        setEditedComment(e.target.value)
    }

    const handleEditedCommentSaveChange = e => {
        e.preventDefault();
        UserService.updateComment(comment_id, post_id, editedComment).then(response => {
            if (response.status === 200)
                setCommentContent(editedComment);
        }, error => {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
        });
        const close_button = document.getElementById("editModalCloseButton_" + comment_id);
        close_button.click();
    }

    const handleDeleteComment = () => {
        // e.preventDefault();
        UserService.deleteComment(comment_id, post_id).then(response => {
            setIsVisible(false)
        }, error => {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
        });
        const close_button = document.getElementById("deleteModalCloseButton_" + comment_id);
        close_button.click();
    }

    if (isVisible)
        return (
            <React.Fragment>
                <div className="row mt-2">
                    <div className="col-md-2 col-sm-3"><h5><span className="badge badge-pill badge-dark">{username}</span></h5></div>
                    <div className="col-md-9 col-sm-7 comment-display-box ">{commentContent}</div>
                    <div className="col-md-1 col-sm-2">
                        {isEligibleToDoActions ? <div className="dropdown">
                            <button className="btn btn-secondary btn-sm" style={{ borderRadius: '50%' }} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-three-dots" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                </svg>
                            </button>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button type="button" className="btn btn-primary dropdown-item" data-toggle="modal" data-target={"#editModal_" + comment_id}>
                                    Edit
                                    </button>
                                <button type="button" className="btn btn-primary dropdown-item" data-toggle="modal" data-target={"#deleteModal_" + comment_id}>
                                    Delete
                                    </button>
                            </div>
                        </div> : null}
                    </div>
                </div>
                <div className="modal fade" id={"editModal_" + comment_id} tabIndex="-1" aria-labelledby={"editModalLabel_" + comment_id} aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={"editModalLabel_" + comment_id}>Edit Comment</h5>
                                <button type="button" className="close" id={"editModalCloseButton_" + comment_id} data-dismiss="modal" aria-label="Close">
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
                <div className="modal fade" id={"deleteModal_" + comment_id} tabIndex="-1" aria-labelledby={"deleteModalLabel_" + comment_id} aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={"deleteModalLabel_" + comment_id}>Delete Comment</h5>
                                <button type="button" className="close" id={"deleteModalCloseButton_" + comment_id} data-dismiss="modal" aria-label="Close">
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
    else return null;
}

export default CommentDisplay;