import React, { Component } from 'react';
import axios from 'axios';

 class SignupForm extends Component {     
    state = {
        userData: {
            usernameInput: "",
            passwordInput: ""
        }
    }
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = ({target}) => {
        this.setState(prevState => ({
          userData: {                   
              ...prevState.userData,
              [target.name]: target.value
          }
        }));
    };

    handleSubmit = (event) => {
        event.preventDefault();

        let tempUser = {
            username: event.target.usernameInput.value,
            password: event.target.passwordInput.value
        }
        this.loginUser(tempUser);
    };

    loginUser(userData) {
        axios.post('/api/auth/login', userData)
        .then((res) => {
            console.log(res);
            this.setState(() => ({
                userData: {
                    usernameInput: "",
                    passwordInput: ""
                }
            }));
        })
        .catch((err) => {
          console.error(err);
        });
    }
    
     render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Username:</label>
                <input type="text" name="usernameInput" onChange={this.handleChange}/>
                <br />
                <label>Password:</label>
                <input type="text" name="passwordInput" onChange={this.handleChange}/>
                <br />
                <input type="submit"/>
            </form>
        );
     }
 }
 
 export default SignupForm;