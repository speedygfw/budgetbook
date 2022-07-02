import axios from "axios";
import { useJwt } from "react-jwt";
import { isExpired, decodeToken } from "react-jwt";

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
          let d = decodeToken(response.data.token);
          
          console.log(d);
          d.id = "/api/users/1";
          d.token = response.data.token;

          localStorage.setItem("user", JSON.stringify(d));
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