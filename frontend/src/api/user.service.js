import axios from 'axios';
import authHeader from './auth-header';
import AuthService from './auth.service'

const API_URL = '/api/post/';

class UserService {

    getAllPosts() {
        const headers = { headers: authHeader() };
        console.log(headers)
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
        return axios.delete(API_URL + 'delete/' + post_id, { headers: authHeader() })
    }

    updatePost(post_id, content) {
        return axios.update(API_URL + 'update/' + post_id, { post_id: post_id, content: content }, { headers: authHeader() })
    }

    createComment(user_id, post_id, content) {
        return axios.post(API_URL + 'comment/add', { user_id: user_id, content: content, post_id: post_id }, { headers: authHeader() });
        // console.log('message:', content, 'by:', user_id);
    }

    deleteComment(comment_id) {
        return axios.delete(API_URL + 'comment/delete/' + comment_id, { headers: authHeader() })
    }

    updateComment(comment_id, content) {
        return axios.update(API_URL + 'comment/update/' + comment_id, { comment_id: comment_id, content: content }, { headers: authHeader() })
    }
}

export default new UserService();