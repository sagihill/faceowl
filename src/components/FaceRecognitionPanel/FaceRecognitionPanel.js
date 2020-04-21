import React from 'react';
import './FaceRecognitionPanel.css';
import UrlInput from '../UrlInput/UrlInput';
import BrowseButtonInput from '../BrowseButtonInput/BrowseButtonInput';
import CustomButton from '../CustomButton/CustomButton';

const FaceRecognitionPanel = ({onInputChange,onInputBlur, onButtonSubmit, onButtonClick ,input, handleKeyUp, OnImageUpload, loadingImage, isButtonSubmitted}) => {
	return (
		<div className ='face_recognition_panel-container'>
            <div className='url_input-browse_button_input-container'>
                    <UrlInput
                        name='linkInput' 
                        type='text' 
                        value={input} 
                        handleChange = {onInputChange}
                        onKeyUp = {handleKeyUp}
                        label='Paste image URL here'
                        required
                    />
                    <BrowseButtonInput 
                        OnImageUpload = {OnImageUpload} 
                        loadingImage = {loadingImage}
                        onButtonClick = {onButtonClick}
                    />
            </div>
            <CustomButton className='find-button' onClick = {onButtonSubmit} onBlur = {onInputBlur} type='submit'>Find</CustomButton>
		</div>
	);
}

export default FaceRecognitionPanel;