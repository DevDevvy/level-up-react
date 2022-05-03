import React, { useEffect, useState } from "react"
import { deleteGame, getGames } from "./GameManager.js"
import "./GameList.css"
import { Link, useHistory } from "react-router-dom"
export const GameList = (props) => {
    const [ games, setGames ] = useState([])   
    const history = useHistory()
    const [clicked, setClicked] = useState(false)
    
    // useEffect(() => {
    //     getGames().then(data => setGames(data))
    // }, [])
    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const deleteButton = (id) => {
        deleteGame(id)
        .then(getGames).then(data => setGames(data))
    }


    return (
        <article className="games">
            <header>
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/games/new" })
                    }}
                >Register New Game</button>
            </header>
            
            <h2>Game List:</h2>
            <table>
                <thead>
                    <tr>
                        <th>Game</th>
                        <th>Players</th>
                        <th>Skill lvl</th>
                    </tr>
                </thead>
            {
                games.map(game => {
                    return <tbody key={`game--${game.id}`} className="game">
                        <tr>
                            <td className="game__title"><Link to={`/games/${game.id}`}><h3>{game.title}</h3></Link> by {game.maker}</td>
                            <td className="game__players">{game.number_of_players}</td>
                            <td className="game__skillLevel">{game.skill_level}</td>
                            <td><Link to={`/edit/${game.id}`}>EDIT</Link></td>
                            <td><button onClick={()=>deleteButton(game.id)}>DELETE</button></td>
                        </tr>
                    </tbody>
                })
            }
            </table>
        </article>
    )
}