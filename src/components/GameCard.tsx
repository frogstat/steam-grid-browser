import fallbackImage from "../assets/fallback.png"
import {useState} from "react";

type GameCardProps = {
    title: string;
    thumbnail: string;
}

function GameCard({ title, thumbnail }: GameCardProps) {

    const [imageSrc, setImageSrc] = useState(thumbnail);

    function handleImageError(){
        setImageSrc(fallbackImage);
    }

    return (
        <div className="game-card">
            <img src={imageSrc} onError={handleImageError} alt="game cover"/>
            <p>{title}</p>
        </div>
    )
}

export default GameCard;