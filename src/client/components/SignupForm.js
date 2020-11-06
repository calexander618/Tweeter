import React, { Component } from 'react';
import axios from 'axios';

 class SignupForm extends Component {     
    state = {
        userData: {
            nameInput: "",
            emailInput: "",
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
            name: event.target.nameInput.value,
            email: event.target.emailInput.value,
            username: event.target.usernameInput.value,
            password: event.target.passwordInput.value
        }
        this.registerUser(tempUser);
    };

    registerUser(userData) {
        axios.post('/api/auth/signup', userData)
        .then((res) => {
            console.log(res);
            this.setState(() => ({
                userData: {
                    nameInput: "",
                    emailInput: "",
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
                <label>Name:</label>
                <input type="text" name="nameInput" onChange={this.handleChange}/>
                <br />
                <label>Email:</label>
                <input type="text" name="emailInput" onChange={this.handleChange}/>
                <br />
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