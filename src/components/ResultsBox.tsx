import GameCard from "./GameCard.tsx";
import type {Game} from "../utils/types.ts";


type SearchScreenProps = {
    setSelectedGame: (game: Game) => void
    results: Game[] | null
}

function ResultsBox({setSelectedGame, results}: SearchScreenProps) {

    function resolveResultsScreen() {
        if (results === null) {
            return <p>Results will appear here</p>
        } else if (results.length === 0) {
            return <p>No results were found!</p>
        }
        return results.map((game: Game) =>
            <GameCard key={game.id} game={game} setSelectedGame={setSelectedGame}/>
        )
    }

    return (
        <div className={"game-card-container"}>
            {resolveResultsScreen()}
        </div>
    )
}

export default ResultsBox
