import React from "react"
import { Route } from "react-router-dom"
import { EventDetails } from "./events/EventDetails.js"
import { EventForm } from "./events/EventForm.js"
import { EventList } from "./events/EventList.js"
import { UpdateEvent } from "./events/UpdateEvent.js"
import { GameDetails } from "./game/GameDetail.js"
import { GameForm } from "./game/GameForm.js"
import { GameList } from "./game/GameList.js"
import { GameEdit } from "./game/UpdateGame.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/">
                <GameList />
            </Route>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/events/new">
                <EventForm />
            </Route>
            <Route exact path="/edit/:gameId(\d+)">
                <GameEdit />
            </Route>
            <Route exact path="/games/:gameId(\d+)">
                <GameDetails />
            </Route>
            <Route exact path="/events/edit/:eventId(\d+)">
                <UpdateEvent />
            </Route>
            <Route exact path="/events/:eventId(\d+)">
                <EventDetails />
            </Route>
        </main>
    </>
}