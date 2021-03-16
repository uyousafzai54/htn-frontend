import React from 'react'
import {Link} from 'react-router-dom'; 
import './events.css';

    const Event = ({event}) => {
      const url = process.env.REACT_APP_AUTH0_CLIENT_URL;
      return (
        <div>
            <div class="card border-dark mb-3 " styles = "width: 5rem;">
            {/*event.speakers.length > 0 && 
              <img className = "pfp" src={event.speakers[0].profile_pic} ></img> 
            */ }
            <div class="card-body">
              <h5 class="card-title">{event.name}</h5>
              {event.speakers.length > 0 && 
              <h6 class="card-subtitle mb-2 text-muted">{event.speakers[0].name}</h6>
              }
              <h6 class="card-subtitle mb-2 text-muted">{event.event_type}</h6>
              <p class="card-text">{event.description}</p>
              <Link to = {{pathname: `/events/${event.id}`}}>Details</Link>
            </div>
          </div>
        </div>
      )
    };

    export default Event