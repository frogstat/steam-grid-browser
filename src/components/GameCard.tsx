import fallbackImage from "../assets/fallback.png"
import blackImage from "../assets/loading.gif"
import {useEffect, useState} from "react";
import {fetchCover} from "../utils/api.ts";
import type {Game, GameImage} from "../utils/types.ts";

type GameCardProps = {
    game: Game;
    setSelectedGame: (game: Game) => void;
}

function GameCard({game, setSelectedGame}: GameCardProps) {

    const [imageSrc, setImageSrc] = useState(blackImage);

    useEffect(() => {
        fetchCover(game.id).then((cover: GameImage) => {
            setImageSrc(cover.thumbnail ?? fallbackImage);
        })
    }, [game])


    return (
        <div className="game-card" onClick={() => setSelectedGame(game)}>
            <img
                className="game-card-image"
                src={imageSrc}
                alt="cover"/>
            <div className="game-card-title">
                <span>{game.title}</span>
            </div>

        </div>
    )
}

export default GameCard;