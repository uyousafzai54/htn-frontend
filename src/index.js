import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth0-provider-with-history"; 
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <Router>
  <Auth0Provider
    domain = {process.env.REACT_APP_AUTH0_DOMAIN}
    clientId = {process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri = {process.env.REACT_APP_AUTH0_CLIENT_URL}
    >
      <App />
      </Auth0Provider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
