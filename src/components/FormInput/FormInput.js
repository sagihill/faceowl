import React from 'react';
import './FormInput.style.css';
import '../../fonts/Linearicons-Free-v1.0.0/icon-font.min.css'


const FormInput = ({handleChange, label, ...otherProps}) => {
    return(
        <div className="form-input-container">
            <input className="form-input" placeholder={label} onChange = {handleChange} {...otherProps}/>
            <span className="focus-form-input"></span>
            <span className="symbol-form-input">
                <span className={"lnr lnr-"+label.replace(" ","").toLowerCase()}></span>
            </span>
        </div>
    )
}

export default FormInput;