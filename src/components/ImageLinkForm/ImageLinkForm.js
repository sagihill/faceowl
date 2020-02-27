import React from 'react';
import './ImageLinkForm.css';
import {Checkmark} from 'react-checkmark';

const ImageLinkForm = ({onInputChange,onInputFocus,onInputBlur, onButtonSubmit, onButtonClick ,input, handleKeyUp, OnImageUpload, isImageLoaded}) => {
	return (
		<div className ='ma4 mt0'>
			<p className='light-yellow f4 mt4 mb3'>
				{'My Owl will detect faces in your pictures. Give it a shot!'}
			</p>
				<div className='flex flex-row bg-black-10 br2 ba b--black-10 form center pa3 shadow-5'>
					<div className="inputs flex flex-column w-75">
						<input 
							className='flex f5 light-silver pa2 w-75 center mb3' 
							type = 'text' 
							value = {input}
							onFocus = {onInputFocus}
							onKeyUp = {handleKeyUp}
							onChange = {onInputChange} />
						<div className="flex flex-row upload-btn-wrapper center grow dib pointer">
							<button className="btn f5 ph3 pv2 dib white-80 bg-near-black pointer">Browse for Image</button>
							<input onClick={onButtonClick} className='upload-input pointer ' type="file" accept="image/*" placeholder="Browse" onChange={OnImageUpload}/>
							{isImageLoaded ? (
								<div className="pa2">
									<Checkmark size={40}/>
								</div>
							):null
							}
						</div>
					</div>
					<div className="h-50">
						<button
							onBlur = {onInputBlur}
							className ='grow f4 link ph5 pv4 dib white-80 bg-near-black'
							onClick = {onButtonSubmit}
						>Detect
						</button> 
					</div>
				</div>
		</div>
	);
}

export default ImageLinkForm;