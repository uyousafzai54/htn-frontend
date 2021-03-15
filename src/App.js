import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from "./components/nav-bar"; 
import Events from "./components/Events";
import Profile from "./components/Profile";
import Loading from './components/loading';
import { useAuth0 } from "@auth0/auth0-react";
function App()
{
  const {isAuthenticated, isLoading} = useAuth0();
  if(isLoading)
  {
    return <Loading></Loading>;
  }
  return (
    <Router>
      <div className = "App">
        <Navbar/>
        <br/>
        <Route path='/events' component={Events} />
        <Route path='/profile' component={Profile} />
      </div>
    </Router>
  ); 
}; 

export default App;