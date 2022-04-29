import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getEvents } from "./EventManager"


export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const history = useHistory()
    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <header>
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/events/new" })
                    }}
                >Register New Event</button>
            </header>
            <h3>Event List:</h3>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <br></br>
                        
                        <div className="event__description">{event.description} by {event.organizer.user.username}</div>
                        <div className="event__game">{event.game.title} will be played. It is a {event.game.game_type.label}</div>
                        <div className="event__players">{event.game.number_of_players} players needed</div>
                        <div className="event__time">Event time: {event.time} on {event.date}</div>
                        <div className="event__skillLevel">Skill level is {event.game.skill_level}</div>
                        <br></br>
                    </section>
                    
                })
            }
        </article>
    )
}