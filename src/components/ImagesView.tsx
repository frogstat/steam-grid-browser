import type {ImageTypes} from "../utils/api.ts";
import {useImagesView} from "../hooks/useImagesView.ts";
import type {GameImage} from "../utils/types.ts";

type ImagesViewProps = {
    id: number;
    imageType: ImageTypes
}


function ImagesView({ id, imageType }: ImagesViewProps) {

    const images = useImagesView(id, imageType);

    function resolveImages(){
        if(!images){
            return <p>Loading...</p>;
        } else if(images.length === 0) {
            return <p>No images found</p>
        }
        return images.map((image:GameImage, index:number) =>
            <div key={index} className="images-view-image-container">
                <img
                    className={`images-view-image images-view-image-${imageType}`}
                    src={image.thumbnail}
                    alt="thumbnail"
                />
            </div>
        )


    }

    return (
      <div className="image-view">
          <h1>{imageType}</h1>
          <div className="images-container">
              {resolveImages()}
          </div>
      </div>
    );
}

export default ImagesView;