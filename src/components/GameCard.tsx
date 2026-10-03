import fallbackImage from "../assets/fallback.png"
import blackImage from "../assets/black.png"
import {useEffect, useState} from "react";
import {getGameById} from "../utils/api.ts";
import type {Game} from "../utils/types.ts";

type GameCardProps = {
    id: number;
    title: string;
}

function GameCard({id, title}: GameCardProps) {

    const [imageSrc, setImageSrc] = useState(blackImage);

    useEffect(() => {
        getGameById(String(id)).then((game: Game) => {
            console.log(game);
            setImageSrc(game.grids[0]?.thumbnail ?? fallbackImage);
        })
    }, [])


    return (
        <div className="game-card">
            <img
                className="game-card-image"
                src={imageSrc}
                alt="cover"/>
            <span>{title}</span>
        </div>
    )
}

export default GameCard;