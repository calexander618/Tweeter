import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
  
 class GuestPage extends Component {     
     render() {
         return (
            <Router>
                <Switch>
                    <Route path="/login">
                        <LoginForm />
                    </Route>
                    <Route path="/signup">
                        <SignupForm />
                    </Route>
                    <Route path="/">
                        <div>
                            <button>
                                <Link to="/login">Login</Link>
                            </button>
                            <button>
                                <Link to="/signup">Signup</Link>
                            </button>
                        </div>
                    </Route>
                </Switch>
            </Router>
         );
     }
 }
 
 export default GuestPage;