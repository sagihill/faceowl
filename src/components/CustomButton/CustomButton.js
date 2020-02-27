import React from 'react';

const CustomButton = ({ children,...otherProps}) => {
    return (
        <button className={`mt2 b shadow-3 ph3 pv2 input-reset ba b--black white-80 bg-near-black grow pointer f4 dib` }{...otherProps} >
            {children}
        </button>
    )
}

export default CustomButton;