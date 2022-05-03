import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { getSingleGame } from "./GameManager"

export const GameDetails = () => {
    const [currentGame, setCurrentGame] = useState({})
    const gameId = useParams()
// get single game
    useEffect(() => {
        getSingleGame(gameId.gameId)
        .then(data => setCurrentGame(data))
    }, [])

    return (
        <div><h2>{currentGame.title}</h2>
        by {currentGame.maker}
        <p>
            # Of Players: {currentGame.number_of_players} | Difficulty: {currentGame.skill_level}
        </p>
        Game Type: {currentGame.game_type?.label}
        </div> 
        
        

    )
}