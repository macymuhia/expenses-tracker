import axios from 'axios';

const API_URL = 'http://localhost:8040/users/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        userName: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      userName: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();