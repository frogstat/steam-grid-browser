type DetailedImageViewProps = {
    image: string
    exitDetailedView: () => void
}

function DetailedImageView({image, exitDetailedView}: DetailedImageViewProps) {


    return (
        <div onClick={exitDetailedView} className="detailed-view-overlay">
            <div className="detailed-view-container">
                <span onClick={exitDetailedView}>X</span>
                <img
                    className="detailed-view-image"
                    src={image}
                    alt={image}
                />
            </div>
        </div>
    )
}

export default DetailedImageView;