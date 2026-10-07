import type {Game, AllowNsfw} from "../utils/types.ts";
import ImagesView from "./ImagesView.tsx";
import {type ChangeEvent, useState} from "react";

type GameViewProps = {
    game: Game,
    unsetGame: () => void,
}

function GameView({game, unsetGame}: GameViewProps) {

    const [nsfwFilter, setNsfwFilter] = useState<AllowNsfw>("false")

    function handleNsfwFilterChange(e: ChangeEvent<HTMLSelectElement>){
        const option = e.target.selectedOptions[0];
        const newFilter:AllowNsfw = option.value as AllowNsfw;
        setNsfwFilter(newFilter)
    }

    return (
        <div className="game-view">
            <div className="game-view-header">
                <button className="game-view-button" onClick={unsetGame}>Return</button>
                <p className="game-view-title">{game.title}</p>
                <select onChange={handleNsfwFilterChange} value={nsfwFilter}>
                    <option value="false">No NSFW</option>
                    <option value="true">NSFW</option>
                    <option value="any">Any</option>
                </select>
            </div>
            <ImagesView id={game.id} imageType={"grids"} allowNsfw={nsfwFilter}/>
            <ImagesView id={game.id} imageType={"heroes"} allowNsfw={nsfwFilter}/>
            <ImagesView id={game.id} imageType={"icons"} allowNsfw={nsfwFilter}/>
        </div>
    )
}

export default GameView;