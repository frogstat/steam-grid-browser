import {useEffect, useState} from "react";
import type {GameImage} from "./utils/types.ts";
import ResultsBox from "./components/ResultsBox.tsx";
import "./App.css"
import {fetchImages} from "./utils/api.ts";
import {useSearch} from "./hooks/useSearch.ts";

function App() {


    const [fetchedImages, setFetchedImages] = useState<GameImage[]>([]);

    const {
        query,
        setQuery,
        results,
        handleSubmit,
        checkboxRef,
        selectedGame,
        setSelectedGame
    } = useSearch()

    function resolveAppScreen() {
        if (!selectedGame) {
            return <ResultsBox
                setSelectedGame={setSelectedGame}
                results={results}
            />
        }
        return (
            <div>
                <button onClick={() => setSelectedGame(null)}>RETURN</button>
                <h1>{selectedGame.title}</h1>
                <h2>{selectedGame.id}</h2>
                <h3>:)</h3>
                {fetchedImages.map((image: GameImage) =>
                    <img src={image.thumbnail} alt={"hehe"} className="game-card-image"/>
                )}
            </div>
        );
    }

    useEffect(() => {
        setFetchedImages([])
        if (!selectedGame) {
            return;
        }
        fetchImages(selectedGame.id, "grids").then(result => {
            setFetchedImages(result);
        });
    }, [selectedGame]);

    return (
        <>
            <form onSubmit={e => handleSubmit(e)}>
                <input
                    type="text"
                    value={query}
                    placeholder="Search Game"
                    onChange={(e) => setQuery(e.target.value)}/><br/>
                <input ref={checkboxRef} type="checkbox"/> Search by ID
            </form>
            {resolveAppScreen()}
        </>
    )
}

export default App;