import React, { useContext, useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import '../styles/App.css';
import Loading from "../components/loading";
import {Link} from 'react-router-dom'; 


function PrivateEventPage(props) {
const {id} =  props.match.params;
const {isAuthenticated, isLoading} = useAuth0();
const [isAPILoading, setLoading] = useState('true'); 

const user = JSON.parse(localStorage.getItem('allEvents')||null); 
console.log(user); 
if(isLoading)
{
  return <Loading/>
}
else {
const event = user.find(x => x.id==id); 
const result = user.filter((element) => {
  return event.related_events.includes(element.id); 
})
return(
<div className = "event">
    <h2>{event.name}</h2>
    <div className="event-info">
        {event.speakers.length > 0 && 
              <img className = "image" src={event.speakers[0].profile_pic} ></img> 
        }
        <p>
          <b>Event Type:  </b> {event.event_type}
        </p>
        
        {console.log(event.speakers)}
        {event.speakers.length!==0 &&
          <p>
          <b>Speaker: </b> {event.speakers[0].name}
          </p>
        }
        
        <p>
          <b>When: </b>
          {new Date(event.start_time).toLocaleDateString('en', {weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'})} to {new Date(event.end_time).toLocaleDateString('en', {hour: 'numeric', minute: 'numeric'} ).substring(10)}
        </p>
        <p><b>Learn More: </b>
        {
        (isAuthenticated && event.private_url!==undefined) &&
        <a href={event.private_url}>{event.private_url}</a>
        }
        </p>
      </div>
      <p className="event-descrip">{event.description}</p> 
    

    <div>
    <h2>Related Events: </h2>
    <div className = "events-related">
    {result.length!==0 ?
    result.map((element) => {
        return <p><Link to = {{pathname: `/events/private/${element.id}`}}>{element.name}</Link></p>
      }
      )
      :<p>No results!</p>
    }
    </div>
    
    </div>
    
</div>
);
  }
}

export default withAuthenticationRequired(PrivateEventPage, {
  onRedirecting: () => <Loading />,
});