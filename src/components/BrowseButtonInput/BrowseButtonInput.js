import React from 'react';
import './BrowseButtonInput.style.css'

const BrowseButtonInput = ({loadingImage, OnImageUpload, onButtonClick}) => {
    return (
        <div className='browse_button_input-container'>
            {!loadingImage ? (
                <input
                    className='normal-browse-button'
                    name='browseImage' 
                    type='file' 
                    onClick={onButtonClick}
                    accept="image/*" 
                    placeholder="Browse" 
                    onChange={OnImageUpload}
                />
            ) : (
                <input
                    className='loading-browse-button'
                    name='browseImage' 
                    type='file' 
                    onClick={onButtonClick}
                    accept="image/*" 
                    placeholder="Loading" 
                    onChange={OnImageUpload}
                />
            )
            }
    </div>
    )
}

export default BrowseButtonInput;