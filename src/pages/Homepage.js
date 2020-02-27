import React from 'react';
import Logo from "../components/Logo/Logo";
import Rank from "../components/Rank/Rank";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import Success from '../components/Success/Success.js';

const Hompage = ({name, entries, input, onInputChange, onInputFocus, onInputBlur, onButtonSubmit, onButtonClick, handleKeyUp, OnImageUpload, isFaceFound, box, imageURL, isImageLoaded}) => {
    return(
        <div className="flex flex-column flex-wrap mv2">
            <Logo />
            <Rank
                name = {name}
                entries = {entries}
            />
            <ImageLinkForm
                input ={input}
                onInputChange = {onInputChange}
                onInputFocus={onInputFocus}
                onInputBlur={onInputBlur}
                onButtonSubmit={onButtonSubmit}
                handleKeyUp={handleKeyUp}
                OnImageUpload={OnImageUpload}
                isImageLoaded={isImageLoaded}
                onButtonClick = {onButtonClick}
            />
            {isFaceFound === true ? (
                <div>
                <Success/>
                </div>
            ): null}
            <FaceRecognition box={box} imageURL={imageURL}/>
        </div>
    )
}

export default Hompage;