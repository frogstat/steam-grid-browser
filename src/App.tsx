import ResultsBox from "./components/ResultsBox.tsx";
import "./App.css"
import {useSearch} from "./hooks/useSearch.ts";
import GameView from "./components/GameView.tsx";

function App() {

    const {
        query,
        setQuery,
        results,
        handleSubmit,
        selectedGame,
        setSelectedGame,
        unsetGame
    } = useSearch()

    function resolveAppScreen() {
        if (!selectedGame) {
            return <ResultsBox
                setSelectedGame={setSelectedGame}
                results={results}
            />
        }
        return (
            <GameView
                game={selectedGame}
                unsetGame={unsetGame}
            />
        );
    }

    return (
        <div className="app">
            <form onSubmit={e => handleSubmit(e)}>
                <input
                    type="text"
                    value={query}
                    placeholder="Search Game"
                    onChange={(e) => setQuery(e.target.value)}/>
                <button type="submit">Search</button>
            </form>
            {resolveAppScreen()}
        </div>
    )
}

export default App;