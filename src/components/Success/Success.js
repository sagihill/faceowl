import React from 'react';
import './Success.style.css';

class Success extends React.Component {
    componentDidMount() {
        const successSign = document.getElementById("success");
        successSign.scrollIntoView();
    }
	render() {
        return (
            <div className='success-container'>
                <div id='success'>Great Success!</div>
            </div>
        );
    }
}

export default Success;
