import {useState} from "react";
import loadingImage from "../assets/loading.gif"

type DetailedImageViewProps = {
    image: string
    exitDetailedView: () => void
}

function DetailedImageView({image, exitDetailedView}: DetailedImageViewProps) {

    const [imageSrc, setImageSrc] = useState(loadingImage)

    return (
        <div onClick={exitDetailedView} className="detailed-view-overlay">
            <div className="detailed-view-container" onClick={e => e.stopPropagation()}>
                <div className="detailed-view-actions">
                    <span onClick={exitDetailedView}>X</span>
                    <a href={image} target="_blank" rel="noopener noreferrer">↓</a>
                </div>
                <img
                    className="detailed-view-image"
                    src={imageSrc}
                    alt={image}
                    onLoad={() => setImageSrc(image)}
                />
            </div>
        </div>
    )
}

export default DetailedImageView;