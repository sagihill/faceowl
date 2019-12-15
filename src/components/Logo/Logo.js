import React from 'react';
import Tilt from 'react-tilt';
import owl from './Logo.png';
import './Logo.css';

const Logo = () => {
	return (
		<div className ='center ma3 mt0'>
			<Tilt options={{ max : 20 }} style={{ height: 200, width: 200 }} >
 				<div className="Tilt-inner pa2">
 					<img alt='Logo' src={owl}/>
 				</div>
			</Tilt>
		</div>
	);
}

export default Logo;