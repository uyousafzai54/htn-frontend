import React from 'react'

    const Event = ({event}) => {
      return (
        <div>
            <div class="card border-dark mb-3 " styles = "width: 5rem;">
            {/*event.speakers.length > 0 && 
              <!-- <img class="card-img-top" src={event.speakers[0].profile_pic} ></img> -->
            */}
            <div class="card-body">
              <h5 class="card-title">{event.name}</h5>
              {event.speakers.length > 0 && 
              <h6 class="card-subtitle mb-2 text-muted">{event.speakers[0].name}</h6>
              }
              <h6 class="card-subtitle mb-2 text-muted">{event.event_type}</h6>
              <p class="card-text">{event.description}</p>
              <a href={event.public_url} class="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>
      )
    };

    export default Event