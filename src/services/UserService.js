
class UserService {
    getUser(){
        let user = JSON.parse(localStorage.getItem('user'));
        return user;
    }
    saveUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }
}

export default new UserService;