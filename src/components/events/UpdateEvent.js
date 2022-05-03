
import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { getGames } from "../game/GameManager.js"
import { editEvent, getSingleEvent } from "./EventManager.js"


export const UpdateEvent = () => {
    const history = useHistory()
    const [event, setEvent] = useState({})
    const [games, setGames] = useState([])
    const eventId = useParams()

    useEffect(() => {
        getSingleEvent(eventId.eventId)
        .then(data => setEvent(data))
    }, [])

    useEffect(() => {
        getGames()
        .then(data => setGames(data))
    }, [])
    const changeEventState = (domEvent) => {
        const newEventObject = Object.assign({}, event)
        newEventObject[domEvent.target.name] = domEvent.target.value
        setEvent(newEventObject)
    }

    return (
        <form className="eventForm">
            <h2 className="gameForm__title">Edit Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={event.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_date">Game Date: </label>
                    <input type="text" name="game_date" required className="form-control"
                        value={event.game_date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="text" name="time" required className="form-control"
                        value={event.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select name="game_id" required className="form-control"
                        value={event.game?.id}
                        placeholder="Select Game Type..."
                        onChange={changeEventState}>
                            <option value="0">Choose a Game!</option>
                            {
                                games.map((game, index) => {
                                    return <option key={index} value={game.id} name="game_id">{game.title}</option>
                                })
                            }
                        </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const editedEvent = {
                        id: event.id,
                        description: event.description,
                        game_date: event.game_date,
                        time: event.time,
                        game: parseInt(event.game.id)
                    }

                    // Send POST request to your API
                    editEvent(editedEvent)
                        .then(() => history.push(`/events/${eventId.eventId}`))
                }}
                className="btn btn-primary">Save</button>
        </form>
    )
}