import {useState} from "react";
import type {Game} from "./utils/types.ts";
import SearchScreen from "./components/SearchScreen.tsx";
import "./App.css"

function App() {

    const [selectedGame, setSelectedGame] = useState<Game | null>(null);

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
            </div>
        );
    }

    return resolveAppScreen();

}

export default App;