import React, { useContext, useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import "./EventPage.css"
import Loading from "./loading.js";
import Events from "./Events";
import {Link} from 'react-router-dom'; 


function EventPage(props) {
const {id} =  props.match.params;
const {isAuthenticated, isLoading} = useAuth0();
const [event, setEvent] = useState(''); 
const [isAPILoading, setLoading] = useState('true'); 
const [rE, setRE] = useState([]); 
const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  weekday: 'short',
  hour: 'numeric',
  minute: 'numeric',
};
const user = JSON.parse(localStorage.getItem('allEvents')||null); 
console.log(user); 
useEffect(() => {
    fetch(`https://api.hackthenorth.com/v3/graphql?query={ event(id: ${id}) { id name event_type permission start_time end_time description speakers { name profile_pic } public_url private_url related_events } }`)
      .then((response) => response.json())
      .then((jsonResp) => {
        setEvent(jsonResp.data.event);
        
        console.log(JSON.stringify(jsonResp.data.event.speakers.length));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
    

  }, [event])
  //console.log(event.related_events.length)
  
if(isLoading||isAPILoading)
{
  return <Loading/>
}
else {
const result = user.filter((element) => {
  return event.related_events.includes(element.id); 
})
return(
<div className = "event-page">
    <h2>{event.name}</h2>
    <div className="event-info-container">
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
          {new Date(event.start_time).toLocaleDateString('en', options)} to {new Date(event.end_time).toLocaleDateString('en', options)}
        </p>
      </div>
      <p className="event-description">{event.description}</p> 
    <h3>Related Events: </h3>

    <div>
    {result.length!==0 ?
    
      result.map((element) => {
        return <p><Link to = {{pathname: `/events/${element.id}`}}>{element.name}</Link></p>
      })
      :<p>No results!</p>
    }
    </div>
    
</div>
);
  }
}

export default withAuthenticationRequired(EventPage, {
  onRedirecting: () => <Loading />,
});