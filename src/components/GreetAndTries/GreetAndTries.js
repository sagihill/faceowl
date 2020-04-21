import React from 'react';
import './GreetAndTries.css';

const GreetAndTries = ({name,entries}) => {
	return (
		<div className="greet_and_tries-container">
			<div className='greet-name'>
				{`Dear ${name}`}
			</div>
			{ (Number(entries)===0) ? (	
				<div className='tries-hurray-container'>
					<div className='tries-container'>
						 Try finding faces in your pictures.
					</div>
					<div className='greet-hurray'>
						it is AMAZING!
					</div>
				</div>
			
			) : (
				<div className='tries-hurray-container'> 
					<div className='tries-container'>
						{`You have reached ${entries} tries already.`}
					</div>
					<div className='greet-hurray'>
						You Rock!
					</div>
				</div>
			)
			}
		</div>
	);
}

export default GreetAndTries;