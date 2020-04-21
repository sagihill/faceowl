import React from 'react';
import './CustomButton.css'

const CustomButton = ({ children,...otherProps}) => {
    return (
        <button className={`button` }{...otherProps} >
            {children}
        </button>
    )
}

export default CustomButton;