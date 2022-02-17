import React, { Component, useState, useEffect, useContext} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Event from '../components/Event'
import '../styles/App.css';

function Events()
{
  const {isAuthenticated, isLoading} = useAuth0();
  console.log(isAuthenticated);
  const [events, setEvents] = useState([]); 
  const [search, setSearch] = useState('');
  const [loading, isAPILoading] = useState(true); 
  const [filteredEvents, setFilteredEvents] = useState([]); 
  const [type, setType] = useState('all'); 

  useEffect(() => {
    fetch('https://api.hackthenorth.com/v3/events')
      .then((response) => response.json())
      .then((jsonResp) => {
        setEvents(jsonResp.sort((a, b) => a.start_time < b.start_time ? -1 : 1));
        localStorage.setItem('allEvents', JSON.stringify(jsonResp));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        isAPILoading(false); 
      });
  }, [])

  useEffect(() => {
    setFilteredEvents (
      events.filter(event => {
        return  (
        (type === event.event_type  || type === "all") &&
        (event.name.toLowerCase().includes(search.toLowerCase()) || 
        event.description.toLowerCase().includes(search.toLowerCase()) ||
        event.speakers.some((speaker) => {
          return speaker.name.toLowerCase().includes(search.toLowerCase())
        })
        ) && ((event.permission==='private'&&isAuthenticated)||((event.permission==='public'&&!isAuthenticated))||(event.permission==='public'&&isAuthenticated))
      ) 
      }
    )) 
  }, [search, events, type])
  console.log(search);
  if(loading||isLoading)
  {
    return <div><p>Loading...</p></div>
  }
  if(isAuthenticated)
  {
    return (
      <div className = "events-list-page">
        <h2>Hack the North: Events</h2>
        <div>
        <div className = "search-bar-container">
        <form className = "form-inline">
        <input
          className="form-control rounded"
          id = "form1"
          type="text"
          placeholder="Search events..."
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
        </form>
        </div>
      
        </div>
        <div>
        {filteredEvents.length > 0 ?
        filteredEvents.map((event) => 
          <Event className = "card" event = {event}/> 
        )
        : <p>No results! </p>
        }
        </div>
      </div>
    ); 
  }
  else if(!isAuthenticated)
  {
    return (
      <div className = "events-list-page">
        <h2>Hack the North: Events</h2>
        <div>
        <div className = "search-bar-container">
        <form className = "form-inline">
        <input
          className="form-control rounded"
          id = "form1"
          type="text"
          placeholder="Search events..."
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
        </form>
        </div>
      
        </div>
        <div>
        {filteredEvents.length > 0 ?
        filteredEvents.map((event) =>
          event.permission==='public'?
          <Event className = "card" event = {event}/> 
          :
          null
        )
        : <p>No results! </p>
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