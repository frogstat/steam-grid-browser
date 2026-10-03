import "./App.css"
import GameCard from "./components/GameCard.tsx";
import {useRef, useState} from "react";
import type {GameSearchResult} from "./utils/types.ts";
import {searchGames} from "./utils/api.ts";


function App() {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<GameSearchResult[]>([]);

    const checkboxRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e:any) {
        e.preventDefault();
        setResults([])
        const searchById = checkboxRef.current?.checked ?? false
        if(searchById) {

        } else {
            searchGames(query).then((results: GameSearchResult[]) => {
                setResults(results);
            })
        }



    }

    return (
        <>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" placeholder="Search Game" onChange={(e) => setQuery(e.target.value)}/><br/>
                <input ref={checkboxRef} type="checkbox"/> Search by ID
            </form>
            <div className={"game-card-container"}>
                {results.length > 0 && results.map((game: GameSearchResult) =>
                    <GameCard key={game.id} id={game.id} title={game.name}/>
                )}
                {results.length === 0 && <p>No game found.</p>}
            </div>
        </>
    )
}

export default App
