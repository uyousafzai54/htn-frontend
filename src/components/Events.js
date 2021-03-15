import React, { Component, useState, useEffect} from 'react';
import NavBar from './nav-bar';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from './loading';
import Event from './Event'
import './Search.css';
import './events.css'

function Events()
{
  const {isAuthenticated, isLoading} = useAuth0();
  console.log(isAuthenticated);
  const [events, setEvents] = useState([]); 
  const [search, setSearch] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]); 
  const [type, setType] = useState('all'); 


  useEffect(() => {
    fetch('https://api.hackthenorth.com/v3/graphql?query={ events { id name event_type permission start_time end_time description speakers { name profile_pic } public_url private_url related_events } }')
      .then((response) => response.json())
      .then((jsonResp) => {
        setEvents(jsonResp.data.events.sort((a, b) => a.start_time < b.start_time ? -1 : 1));
        console.log(JSON.stringify(jsonResp.data.events));
        
      })
      .catch((error) => console.error(error))
      .finally(() => {
        //this.setState({ isLoading: false }); 
      });
  }, [])

  useEffect(() => {
    setFilteredEvents (
      events.filter(event => {
        return  (
        event.name.toLowerCase().includes(search.toLowerCase()) || 
        event.description.toLowerCase().includes(search.toLowerCase()) ||
        event.speakers.some((speaker) => {
          return speaker.name.toLowerCase().includes(search.toLowerCase())
        })
      ) && (type === "all" || event.event_type === type)
      }
    )) 
  }, [search, events, type])
  console.log(search);
  if(isAuthenticated)
  {
    return (
      <div className = "events-list-page">
        <h2>Events</h2>
        <div className = "search-bar-container">
        <input
          className="form-control"
          type="text"
          placeholder="Search keywords..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
         <select
          className="form-control"
          placeholder="Event Type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option type = "all">
            all
          </option>
          
        <option type = "workshop">
          workshop
        </option>  
        <option type = "tech_talk">
          tech_talk
        </option> 
        <option type = "activity">
          activity
        </option> 
        </select>
        </div>
        <div className = "card">
        {filteredEvents.length > 0 ?
        filteredEvents.map((event) => 
          <Event className = "card" event = {event}/> 
        )
        : <p>No results </p>
        }
        </div>
      </div>
    ); 
  }
  else if(!isAuthenticated)
  {
    return (
      <div className = "events-list-page">
        <h2>Events</h2>
        <div className = "search-bar-container">
        <input
          className="form-control"
          type="text"
          placeholder="Search keywords..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
         <select
          className="form-control"
          placeholder="Event Type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option type = "all">
            all
          </option>
          
        <option type = "workshop">
          workshop
        </option>  
        <option type = "tech_talk">
          tech_talk
        </option> 
        <option type = "activity">
          activity
        </option> 
        </select>
        </div>
        <div className = "card">
        {filteredEvents.length > 0 ?
        filteredEvents.map((event) =>
          event.permission==='public'?
          <Event className = "card" event = {event}/> 
          :
          null
        )
        : <p>No results </p>
        }
        </div>
      </div>
    );
  }
  return (
    <div>
    </div>
  ); 
}; 

export default Events;