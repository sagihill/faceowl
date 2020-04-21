import React from 'react';
import Logo from "../../components/Logo/Logo";
import GreetAndTries from "../../components/GreetAndTries/GreetAndTries";
import Exp from "../../components/Exp/Exp";
import FaceRecognitionPanel from "../../components/FaceRecognitionPanel/FaceRecognitionPanel";
import Success from '../../components/Success/Success.js';
import FaceRecognitionImage from "../../components/FaceRecognitionImage/FaceRecognitionImage";
import './Homepage.style.css'

const Hompage = ({name, entries, input, onInputChange, onInputFocus, onInputBlur, onButtonSubmit, onButtonClick, handleKeyUp, OnImageUpload, isFaceFound, box, imageURL, isImageLoaded, loadingImage, isDetectingFaces, isButtonSubmitted}) => {
    return(
        <div className="homepage-container">
            <div className='homepage-card'>
                <div className='logo-greet_and_tries-container'> {/* left side */}
                    <Logo isButtonSubmitted = {isButtonSubmitted}/>
                    <GreetAndTries name = {name} entries = {entries}/>
                </div>
                <div className='exp-face_recognition_panel-container'> {/* right side */}
                    <Exp/>
                    <FaceRecognitionPanel
                        input ={input}
                        onInputChange = {onInputChange}
                        onInputFocus={onInputFocus}
                        onInputBlur={onInputBlur}
                        onButtonSubmit={onButtonSubmit}
                        handleKeyUp={handleKeyUp}
                        OnImageUpload={OnImageUpload}
                        isImageLoaded={isImageLoaded}
                        loadingImage ={loadingImage}
                        onButtonClick = {onButtonClick}
                        isButtonSubmitted = {isButtonSubmitted}
                    />
                </div>
            </div>
            {
                (isDetectingFaces) ? (
                    <div className='success-face_recognition_image-container'>
                        {isFaceFound === true ? (
                            <Success/>
                        ): null}
                            <FaceRecognitionImage box={box} imageURL={imageURL}/>
                    </div>
                ): null
            }
        </div>       
    )
}

export default Hompage;