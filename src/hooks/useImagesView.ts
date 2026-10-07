import {fetchImages, type ImageTypes} from "../utils/api.ts";
import {useEffect, useState} from "react";
import type {GameImage, AllowNsfw} from "../utils/types.ts";

export function useImagesView(id:number, imageType: ImageTypes, allowNsfw: AllowNsfw) {
    const [images, setImages] = useState<GameImage[] | null>(null)
    const [maxImages, setMaxImages] = useState(6)
    const [selectedImage, setSelectedImage] = useState<GameImage | null>(null)



    useEffect(() => {
        if (!id || !imageType) {
            return;
        }
        setImages(null);

        fetchImages(id, imageType, allowNsfw).then(setImages)
            .catch(() => setImages([]))

    }, [allowNsfw, id, imageType]);

    useEffect(() => {
        if(!images){
            return;
        }
        setMaxImages(Math.min(6, images.length))
    },[images])


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
        exitDetailedView,
        maxImages,
        setMaxImages
    };

}