import React from 'react'
import {Link} from 'react-router-dom'; 
import '../styles/App.css';
import { useAuth0 } from "@auth0/auth0-react";

    const Event = ({event}) => {
      const url = process.env.REACT_APP_AUTH0_CLIENT_URL;
      const {isAuthenticated, isLoading} = useAuth0();
      return (
        <div>
            <div class="card bg-light mb-3 w-50" styles = "width: 5rem;">
            {/*event.speakers.length > 0 && 
              <img className = "pfp" src={event.speakers[0].profile_pic} ></img> 
            */ }
            <div class="card-body">
              <h5 class="card-title">{event.name}</h5>
              {event.speakers.length > 0 && 
              <h6 class="card-subtitle mb-2 text-muted">{event.speakers[0].name}</h6>
              }
              <h6 class="card-subtitle mb-2 text-muted">{event.event_type}</h6>
              <h6 class="card-subtitle mb-2 text-muted">When: {new Date(event.start_time).toLocaleDateString('en', {weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'})} to {new Date(event.end_time).toLocaleDateString('en', {hour: 'numeric', minute: 'numeric'} ).substring(10)}</h6>
              <p className = "descrip" class="card-text">{event.description}</p>
              {(isAuthenticated && event.permission==='private') ?
              <Link to = {{pathname: `/events/private/${event.id}`}}>Details</Link> 
              :<Link to = {{pathname: `/events/public/${event.id}`}}>Details</Link>
              }
              
            </div>
          </div>
        </div>
      )
    };

    export default Event