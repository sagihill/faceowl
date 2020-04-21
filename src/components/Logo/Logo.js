import React from 'react';
import Tilt from 'react-tilt';
import owl from '../../assets/owl.svg';
import './Logo.css';

const Logo = ({isButtonSubmitted}) => {
	return (
		<div className ='logo-container'>
			<Tilt className='tilt' options={{ max : 20 }}>
					 {
						(!isButtonSubmitted) ? (
							<img className='' alt='Logo' src={owl}/>
						) : (
							<img className='rolling-owl' alt='Logo' src={owl}/>
						)
					}	
			</Tilt>
		</div>
	);
}

export default Logo;