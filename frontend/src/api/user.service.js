import axios from 'axios';
import authHeader from './auth-header';
import AuthService from './auth.service'

const API_URL = 'http://127.0.0.1:5000/api/post/';

class UserService {

    getAllPosts() {
        return axios.get(API_URL + 'all', { headers: authHeader() });
    }

    getPostByID(post_id) {
        return axios.get(API_URL + post_id, { headers: authHeader() });
    }

    createPost(content) {
        // const user = AuthService.getCurrentUser();
        // if (user && user.token)
        return axios.post(API_URL + 'create', { content: content }, { headers: authHeader() });
    }

    deletePost(post_id) {
        return axios.delete(API_URL + 'delete', { headers: authHeader(), data: { pid: post_id } })
    }

    updatePost(post_id, content) {
        return axios.patch(API_URL + 'update', { pid: post_id, content: content }, { headers: authHeader() })
    }

    createComment(post_id, content) {
        return axios.post(API_URL + 'comment/add', { content: content, pid: post_id }, { headers: authHeader() });
        // console.log('message:', content, 'by:', user_id);
    }

    deleteComment(comment_id, post_id) {
        return axios.delete(API_URL + 'comment/delete', { headers: authHeader(), data: { cid: comment_id, pid: post_id } })
    }

    updateComment(comment_id, post_id, content) {
        return axios.patch(API_URL + 'comment/update', { cid: comment_id, content: content, pid: post_id }, { headers: authHeader() })
    }
}

export default new UserService();