import React from 'react';
import './FaceRecognitionImage.css';

const FaceRecognitionImage = ({ imageURL , box }) => {
	return (
		<div className='face_recognition_image-outer-container'>
			<div className='face_recognition_image-container'>
				{
					(imageURL!=='')? (
						<img className='face_recognition_image' id='inputimage' alt='' src = {imageURL} width='auto' height='auto'/>
					):null
				}
				<div className ='bounding-box' 
					style={{top: box.topRow , right: box.rightCol, bottom: box.bottomRow , left: box.leftCol}}>
				</div>
			</div>               
		</div>
	);
}

export default FaceRecognitionImage;