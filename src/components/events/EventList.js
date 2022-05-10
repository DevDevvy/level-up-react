import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "./EventManager"


export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const history = useHistory()
    
    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    const deleteButton = (id) => {
        deleteEvent(id)
        .then(getEvents).then(data => setEvents(data))
    }

    const JoinButton = (id) => {
        return <button onClick={()=> joinEvent(id)
            .then(getEvents).then(data => setEvents(data))
        }>JOIN</button>
    }
    const LeaveButton = (id) => {
        return <button onClick={()=> leaveEvent(id)
        .then(getEvents).then(data => setEvents(data))
        }>LEAVE</button>
    }

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
                    return <table key={`event--${event.id}`} className="event">
                        
                        <tbody>
                            <tr>
                                {/* join/leave buttons for events */}
                                <td>{event.joined ? LeaveButton(event.id) : JoinButton(event.id)} </td>
                                <td className="event__description">
                                    <h3><Link to={`events/${event.id}`}>{event.description} </Link></h3>
                                    by {event.organizer.user.username} </td>
                                <td className="event__game">{event.game.title} will be played. 
                                    It is a {event.game.game_type.label}</td>
                                <td className="event__players">{event.game.number_of_players} players needed</td>
                                <td className="event__time">Event time: {event.time} on {event.game_date}</td>
                                <td className="event__skillLevel">Skill level is {event.game.skill_level}</td>
                                {/* edit */}
                                <td><Link to={`/events/edit/${event.id}`}><button class="button">EDIT</button></Link></td>
                                {/* delete */}
                                <td><button className="btn-3" onClick={()=>deleteButton(event.id)}>DELETE</button></td>
                            </tr>
                        </tbody>
                        
                    </table>
                    
                })
            }
        </article>
    )
}