import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "login", {
                username,
                password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
        window.location.reload()
    }

    register(username, password) {
        return axios.post(API_URL + "register", {
            username,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

    isModerator() {
        const user = this.getCurrentUser();
        if (user && user['token'] && user['role'] === 'moderator')
            return true
        return false;
    }


}

export default new AuthService();