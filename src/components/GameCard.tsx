import fallbackImage from "../assets/fallback.png"
import blackImage from "../assets/loading.gif"
import {useEffect, useState} from "react";
import {fetchCover} from "../utils/api.ts";
import type {GameImage} from "../utils/types.ts";

type GameCardProps = {
    id: number;
    title: string;
}

function GameCard({id, title}: GameCardProps) {

    const [imageSrc, setImageSrc] = useState(blackImage);

    useEffect(() => {
        fetchCover(id).then((cover: GameImage) => {
            setImageSrc(cover.thumbnail ?? fallbackImage);
        })
    }, [id])


    return (
        <div className="game-card">
            <img
                className="game-card-image"
                src={imageSrc}
                alt="cover"/>
            <div className="game-card-title">
                <span>{title}</span>
            </div>

        </div>
    )
}

export default GameCard;