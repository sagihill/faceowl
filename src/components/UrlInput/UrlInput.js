import React from 'react';
import './UrlInput.style.css';
import '../../fonts/Linearicons-Free-v1.0.0/icon-font.min.css'


const UrlInput = ({handleChange, label, ...otherProps}) => {
    return(
        <div className="url-input-container">
            <input className="url-input" placeholder={label} onChange = {handleChange} {...otherProps}/>
            <span className="focus-anim-url-input"></span>
        </div>
    )
}

export default UrlInput;