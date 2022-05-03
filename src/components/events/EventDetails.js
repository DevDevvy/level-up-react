import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { getSingleEvent } from "./EventManager"


export const EventDetails = () => {
    const [event, setEvent] = useState({})
    const eventId = useParams()
// get single event
    useEffect(() => {
        getSingleEvent(eventId.eventId)
        .then(data => setEvent(data))
    }, [])

    return (
        <div><h2>{event.description}</h2>
            by {event.organizer?.user.username}
            <p> Game: {event.game?.title} | Date: {event.game_date} @ {event.time} </p>
            Game Type: {event.game?.game_type.label}
        </div> 
    )
}
