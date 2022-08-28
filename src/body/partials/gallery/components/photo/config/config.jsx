import React,{useState} from "react";
import './config.css'

const Photo = ({ index, photo, margin, direction, top, left,openLightbox }) => {

    const [imageLoaded, setImageLoaded] = useState(false);

    const handleClick = event => {
        openLightbox(event, { photo, index });
    };

    return (
        <div style={{margin, height: photo.height, width: photo.width}}>
             <img
                {...photo}
                style={{transition: "opacity 1s",cursor: "pointer"}}
                className={`image-${
                    imageLoaded ? 'visible' :  'hidden'
                }`}
                onClick={handleClick}
                alt="img"
                loading="lazy"
                onLoad={() => {setImageLoaded(true)}}
            />
        </div>
       
    );
};

export default Photo;