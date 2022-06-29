import React, { Component } from "react";
import AuthService from "../services/AuthService";
import { FormErrors } from "./FormErrors";

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
      formErrors: {username: '', password: ''},
      usernameValid: false,
      passwordValid: false,
      formValid: false
    };
  }
  onChangeUsername(e) {
    this.validateField(e.target.name, e.target.value);
    this.setState({
      username: e.target.value
    });
    
  }
  onChangePassword(e) {
    this.validateField(e.target.name, e.target.value);
    this.setState({
      password: e.target.value
    });
  }
  handleLogin(e) {
    e.preventDefault();
    
    
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          let redirect = JSON.parse(localStorage.getItem('redirect'));
          if (redirect.length > 1)
            window.location.href = redirect;
          else
            window.location.href = "\\";
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    
  }
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
 }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;
  
    switch(fieldName) {
      case 'username':
        usernameValid  = value.length >= 6;
        fieldValidationErrors.username = usernameValid ? '' : ' is too short';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    usernameValid: usernameValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
  }

  logout() {
    window.location = "/logout";
  }

  render() {
    let user = AuthService.getCurrentUser();
    if (user !== null  && user.token.length > 0)
      return (
        <div>Eingeloggt
          <button className="btn btn-primary" onClick={this.logout}> Ausloggen </button>
          </div>
      )
    else
    return (
      <div className="col-md-12">
        <div className="card card-container">
          
          <form onSubmit={this.handleLogin}>
            <div className="form-group ${this.errorClass(this.state.formErrors.username)}">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
             
              />
            </div>
            <div className="form-group ${this.errorClass(this.state.formErrors.password)}">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
               
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={!this.state.formValid}
              >

                <span>Login</span>
              </button>
            </div>
         
          </form>
          <div className="panel panel-default alert-danger"> <FormErrors formErrors={this.state.formErrors} /></div>
        </div>
        
      </div>
    );
  }
}