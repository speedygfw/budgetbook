import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "api/login_check", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          response.data.id = "/api/users/1";

          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("tokenExpired", JSON.stringify(false));
          
        }
        return response.data;
      });
  }
  
  logout() {
    localStorage.removeItem("user");
    }
    
  getCurrentUser() {
    let user = JSON.parse(localStorage.getItem('user'));
    let tokenExpired = JSON.parse(localStorage.getItem('tokenExpired'));

    if (tokenExpired)
      return null;
    
    return user;

  }
}
export default new AuthService();