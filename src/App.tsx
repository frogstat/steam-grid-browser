import {useEffect, useState} from "react";
import type {Game, GameImage} from "./utils/types.ts";
import SearchScreen from "./components/SearchScreen.tsx";
import "./App.css"
import {fetchImages} from "./utils/api.ts";

function App() {

    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [fetchedImages, setFetchedImages] = useState<GameImage[]>([]);

    function resolveAppScreen(){
        if(!selectedGame){
            return <SearchScreen setSelectedGame={setSelectedGame}/>
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
        if(!selectedGame){
            return;
        }
        fetchImages(selectedGame.id, "grids").then(result =>{
            setFetchedImages(result);
        });
    },[selectedGame]);

    return resolveAppScreen();

}

export default App;