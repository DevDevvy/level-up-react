
import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getGames } from "../game/GameManager.js"
import { createEvent } from "./EventManager.js"


export const EventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [newEvent, setNewEvent] = useState({
        description: "",
        game_date: "",
        time: "",
        game_id: ""
    })
    useEffect(() => {
        getGames()
        .then(data => setGames(data))
    }, [])

    const changeEventState = (domEvent) => {
        const newEventObject = Object.assign({}, newEvent)
        newEventObject[domEvent.target.name] = domEvent.target.value
        setNewEvent(newEventObject)
    }

    return (
        <form className="eventForm">
            <h2 className="gameForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={newEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_date">Game Date: </label>
                    <input type="text" name="game_date" required className="form-control"
                        value={newEvent.game_date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="text" name="time" required className="form-control"
                        value={newEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select name="game_id" required className="form-control"
                        value={newEvent.game_id}
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

                    const event = {
                        description: newEvent.description,
                        game_date: newEvent.game_date,
                        time: newEvent.time,
                        game: parseInt(newEvent.game_id)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}