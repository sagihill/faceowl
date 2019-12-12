import React from 'react';
import './Rank.css';

const Rank = ({name,entries}) => {
	return (
		<div>
			<div className='white f3'>
				{`${name} , your current entry count is...`}
			</div>
			<div className='white f1'>
				{entries}
			</div>
			<p className ='f1'>
			</p>
		</div>
	);
}

export default Rank;