import {fetchImages, type ImageTypes} from "../utils/api.ts";
import {useEffect, useState} from "react";
import type {GameImage} from "../utils/types.ts";

export function useImagesView(id:number, imageType: ImageTypes) {
    const [images, setImages] = useState<GameImage[] | null>(null)
    const [selectedImage, setSelectedImage] = useState<GameImage | null>(null)


    useEffect(() => {
        if (!id || !imageType) {
            return;
        }

        fetchImages(id, imageType).then(setImages)
            .catch(() => setImages([]))

    }, [id, imageType]);

    function enterDetailedView(gameImage: GameImage){
        setSelectedImage(gameImage)
    }

    function exitDetailedView(){
        setSelectedImage(null)
    }



    return {
        images,
        selectedImage,
        enterDetailedView,
        exitDetailedView
    };

}