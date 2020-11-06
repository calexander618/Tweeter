import React, { Component } from 'react';
import HomePage from './views/HomePage';
import GuestPage from './views/GuestPage';
class App extends Component {
  state = {
    searchResults: [],
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {    
    return (
      <LandingPage />
    );
  }
}

function LandingPage() {
  const authorized = false;
  if (authorized) {
    return (
      <HomePage />
    )
  }
  else {
    return (
      <GuestPage />
    );
  }

}

export default App;