import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onInputClick, onButtonSubmit ,input, handleKeyUp}) => {
	return (
		<div className ='ma4 mt0'>
			<p className='light-yellow f4'>
				{'My Owl will detect faces in your pictures. Give it a try.'}
			</p>
			<div className='center'>
				<div className='bg-black-10 br2 ba b--black-10 form center pa4 shadow-5'>
					<input 
						className='f4 light-silver pa2 w-70 center' 
						type ='text' 
						value = {input}
						onClick = {onInputClick}
						onKeyUp = {handleKeyUp}
						onChange={onInputChange} />
					<button 
						className ='w-30 grow f4 link ph3 pv2 dib white-80 bg-near-black'
						onClick = {onButtonSubmit}
					>Detect</button> 
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;