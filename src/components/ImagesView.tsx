import type {ImageTypes} from "../utils/api.ts";
import {useImagesView} from "../hooks/useImagesView.ts";
import type {GameImage} from "../utils/types.ts";
import DetailedImageView from "./DetailedImageView.tsx";
import Image from "./Image.tsx";

type ImagesViewProps = {
    id: number;
    imageType: ImageTypes
}


function ImagesView({id, imageType}: ImagesViewProps) {

    const {
        images,
        selectedImage,
        enterDetailedView,
        exitDetailedView,
        maxImages,
        setMaxImages,
        imagesViewRef
    } = useImagesView(id, imageType);

    function resolveImages() {
        if (!images) {
            return <p>Loading...</p>;
        } else if (images.length === 0) {
            return <p>No images found</p>
        }
        return images
            .slice(0,maxImages)
            .map((image: GameImage, index: number) =>
            <div
                key={index}
                className="images-view-image-container"
                onClick={() => enterDetailedView(image)}>
                <Image thumbnail={image.thumbnail} imageType={imageType}/>
            </div>
        )
    }

    return (
        <>
            <div className="images-view" ref={imagesViewRef}>
                <h1>{imageType}</h1>
                <div className="images-container">
                    {resolveImages()}
                </div>
                {images && images.length > maxImages &&
                    <button onClick={() => setMaxImages(9999)}>Show More</button>
                }
                {images && images.length < maxImages &&
                    <button onClick={() => setMaxImages(6)}>Show Fewer</button>
                }
            </div>

            {selectedImage &&
                <DetailedImageView
                    image={selectedImage.image}
                    exitDetailedView={exitDetailedView}
                />
            }
        </>

    );
}

export default ImagesView;