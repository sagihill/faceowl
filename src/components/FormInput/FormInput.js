import React from 'react';

const FormInput = ({handleChange, label, ...otherProps}) => {
    return(
        <div className='group mb2'>
            {
                label ? (
                <label className={`db fw6 lh-copy f4`}>
                    {label}
                </label>
                ) :null
            }
            <input className='br1 shadow-3 pa2 input-reset ba bg-transparent hover-bg-near-black hover-white b--black-60 w-100' onChange = {handleChange} {...otherProps} />
        </div>
    )
}

export default FormInput;