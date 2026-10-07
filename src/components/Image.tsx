import type {ImageTypes} from "../utils/api.ts";
import {useState} from "react";

type ImageProps = {
    thumbnail: string;
    imageType: ImageTypes;
}

const wrapperLoadingStyle = {
    background: "url(\"src/assets/loading.gif\") center / 300px 450px no-repeat"
}

function Image({thumbnail, imageType}: ImageProps) {

    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="images-view-image-wrapper" style={isLoaded ? {background: "none"} : wrapperLoadingStyle}>
            <img
                style={{opacity: isLoaded ? 1 : 0.2, transition: "opacity 0.4s"}}
                className={`images-view-image images-view-image-${imageType}`}
                src={thumbnail}
                alt=""
                onLoad={() => setIsLoaded(true)}
            />
        </div>
    );

}

export default Image;