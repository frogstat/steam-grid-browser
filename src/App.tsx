import "./App.css"
import GameCard from "./components/GameCard.tsx";
import {useRef, useState} from "react";
import type {GameSearchResult} from "./utils/types.ts";
import {getGameByIdPure, searchGames} from "./utils/api.ts";


function App() {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<GameSearchResult[] | null>(null);

    const checkboxRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: any) {
        e.preventDefault();
        const searchById = checkboxRef.current?.checked ?? false
        if (searchById) {
            getGameByIdPure(query).then((results: GameSearchResult[]) => {
                setResults(results);
            }).catch(() => setResults([]))
        } else {
            searchGames(query).then((results: GameSearchResult[]) => {
                setResults(results);
            }).catch(() => setResults([]))
        }

    }

    function resolveResultsScreen() {
        if (results === null) {
            return <p>Results will appear here</p>
        } else if (results.length === 0) {
            return <p>No results were found!</p>
        }
        return results.map((game: GameSearchResult) =>
            <GameCard key={game.id} id={game.id} title={game.name}/>
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
