import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Navbar from "./components/nav-bar"; 
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import Loading from './components/loading';
import { useAuth0 } from "@auth0/auth0-react";
import PrivateEventPage from './pages/PrivateEventPage';
import PublicEventPage from './pages/PublicEventPage';
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
        <Redirect from="/" to="/events" />
        <Route path='/events/public/:id' exact component={PublicEventPage} />
        <Route path='/events/private/:id' exact component={PrivateEventPage} />
        <Route path='/events' exact component={Events} />
        <Route path='/profile' exact component={Profile} />
      </div>
    </Router>
  ); 
}; 

export default App;