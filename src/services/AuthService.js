import axios from "axios";

const API_URL = "http://hb-api.fwalle.de/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "api/login_check", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
         
          
          //localStorage.setItem("user_id", "/api/users/1");
          response.data.id = "/api/users/1";
          response.data.username = "fwallenborn";

          // UserService.saveUser(JSON.stringify(response.data));
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