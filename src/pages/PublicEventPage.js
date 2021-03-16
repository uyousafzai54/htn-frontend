import React, { useContext, useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import '../styles/App.css';
import Loading from "../components/loading.js";
import {Link, Redirect} from 'react-router-dom'; 


function PublicEventPage(props) {
const {id} =  props.match.params;
const {isAuthenticated, isLoading} = useAuth0();
const [isAPILoading, setLoading] = useState('true'); 

var user = JSON.parse(localStorage.getItem('allEvents')||null); 
console.log(user); 
console.log(user.find(x=>x.id==id).permission==='private');
if(isLoading)
{
  return <Loading/>
}
else if(user.find(x=>x.id==id).permission==='private')
{
  return <Redirect to = {`/events/private/${id}`}></Redirect>
}
else {
const event = user.find(x => x.id==id); 
const result = user.filter((element) => {
  return (event.related_events.includes(element.id));
})

return(
<div className = "event-page">
    <h2>{event.name}</h2>
    <div className="event-info-container">
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
          <b>Date: </b>
          {new Date(event.start_time).toLocaleDateString('en', {weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'})} to {new Date(event.end_time).toLocaleDateString('en', {hour: 'numeric', minute: 'numeric'} ).substring(10)}
        </p>
        <p><b>Learn More: </b>
        {
        (isAuthenticated && event.private_url!==undefined)
        ? <a href={event.private_url}>{event.private_url}</a>
        : <a href={event.public_url}>{event.public_url}</a>
        }
        </p>
      </div>
      <p className="event-description">{event.description}</p> 
    <h3>Related Events: </h3>

    <div className = "events-related">
    {result.length!==0 ?
    
      result.map((element) => {
        return element.permission==='private'
        ? <p><Link to = {{pathname: `/events/private/${element.id}`}}>{element.name}</Link></p>
        : <p><Link to = {{pathname: `/events/public/${element.id}`}}>{element.name}</Link></p>
      }
      )
      :<p>No results!</p>
    }
    </div>
    
</div>
);
  }
}

export default PublicEventPage; 