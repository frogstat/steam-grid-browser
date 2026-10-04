import GameCard from "./GameCard.tsx";
import type {Game} from "../utils/types.ts";
import {useSearch} from "../hooks/useSearch.ts";

type SearchScreenProps = {
    setSelectedGame: (game: Game) => void
}

function SearchScreen({setSelectedGame}: SearchScreenProps) {

    const {
        query,
        setQuery,
        results,
        handleSubmit,
        checkboxRef
    } = useSearch()


    function resolveResultsScreen() {
        if (results === null) {
            return <p>Results will appear here</p>
        } else if (results.length === 0) {
            return <p>No results were found!</p>
        }
        return results.map((game: Game) =>
            <div key={game.id} onClick={() => setSelectedGame(game)}>
                <GameCard id={game.id} title={game.title}/>
            </div>
        )
    }

    return (
        <>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" value={query} placeholder="Search Game" onChange={(e) => setQuery(e.target.value)}/><br/>
                <input ref={checkboxRef} type="checkbox"/> Search by ID
            </form>
            <div className={"game-card-container"}>
                {resolveResultsScreen()}
            </div>
        </>
    )
}

export default SearchScreen
