import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { editGame, getGameTypes, getSingleGame } from "./GameManager.js"



export const GameEdit = () => {
    const history = useHistory()
    
    const [gameTypes, setGameTypes] = useState([])
    // set up found games state with original data
    const [currentGame, setCurrentGame] = useState({})
    const gameId = useParams()
// get single game
    useEffect(() => {
        getSingleGame(gameId.gameId)
        .then(data => setCurrentGame(data))
    }, [])

    useEffect(() => {
        getGameTypes()
        .then(data => setGameTypes(data))
    }, [])

    const changeGameState = (domEvent) => {
        const newGame = Object.assign({}, currentGame)
        newGame[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Players: </label>
                    <input type="number" name="number_of_players" required className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="number" name="skill_level" required className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select name="game_type_id" required className="form-control"
                        value={currentGame.game_type_id}
                        placeholder="Select Game Type..."
                        onChange={changeGameState}>
                            {
                                gameTypes?.map((type, index) => {
                                    return <option key={index} value={type.id} name="game_type_id">{type.label}</option>
                                })
                            }
                        </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        id: currentGame.id,
                        title: currentGame.title,
                        maker: currentGame.maker,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level),
                        game_type: parseInt(currentGame.game_type.id)
                    }

                    // Send POST request to your API
                    editGame(game)
                        .then(() => history.push(`/games/${gameId.gameId}`))
                }}
                className="btn btn-primary">Save</button>
        </form>
    )
}