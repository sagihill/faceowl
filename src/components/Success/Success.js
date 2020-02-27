import React from 'react';

class Success extends React.Component {
    componentDidMount() {
        const successSign = document.getElementById("success");
        successSign.scrollIntoView();
    }
	render() {
        return (
            <div id='success' className='f1 white mb1'>
			    <h1 className="mv3">Great Success!</h1>
		    </div>
        );
    }
}

export default Success;
