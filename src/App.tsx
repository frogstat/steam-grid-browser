import "./App.css"
import GameCard from "./components/GameCard.tsx";
import {useRef, useState} from "react";

import {fetchGame, searchGames} from "./utils/api.ts";
import type {Game} from "./utils/types.ts";


function App() {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Game[] | null>(null);

    const checkboxRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: any) {
        e.preventDefault();
        const searchById = checkboxRef.current?.checked ?? false
        if (searchById) {
            fetchGame(query).then((gameResult: Game) => {
                console.log(gameResult);
                setResults([gameResult]);
            }).catch(() => setResults([]))
        } else {
            searchGames(query).then((gameResults: Game[]) => {
                console.log(gameResults);
                setResults(gameResults);
            }).catch(() => setResults([]))
        }

    }

    function resolveResultsScreen() {
        if (results === null) {
            return <p>Results will appear here</p>
        } else if (results.length === 0) {
            return <p>No results were found!</p>
        }
        return results.map((game: Game) =>
            <GameCard key={game.id} id={game.id} title={game.title}/>
        )
    }

    return (
        <>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" placeholder="Search Game" onChange={(e) => setQuery(e.target.value)}/><br/>
                <input ref={checkboxRef} type="checkbox"/> Search by ID
            </form>
            <div className={"game-card-container"}>
                {resolveResultsScreen()}
            </div>
        </>
    )
}

export default App
