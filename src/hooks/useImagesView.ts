import {fetchImages, type ImageTypes} from "../utils/api.ts";
import {useEffect, useRef, useState} from "react";
import type {GameImage} from "../utils/types.ts";

export function useImagesView(id:number, imageType: ImageTypes) {
    const [images, setImages] = useState<GameImage[] | null>(null)
    const [selectedImage, setSelectedImage] = useState<GameImage | null>(null)
    const [maxImages, setMaxImages] = useState(6)
    const imagesViewRef = useRef<HTMLDivElement>(null)


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

    useEffect(() => {
        imagesViewRef.current?.scrollIntoView({
            block: "start",
            behavior: "smooth"
        });
    },[maxImages])



    return {
        images,
        selectedImage,
        enterDetailedView,
        exitDetailedView,
        maxImages,
        setMaxImages,
        imagesViewRef
    };

}