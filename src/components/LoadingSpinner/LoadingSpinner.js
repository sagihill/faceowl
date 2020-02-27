import React from 'react';
import PropagateLoader from "react-spinners/PropagateLoader";

const LoadingSpinner = () => {
    return (
        <div className="sweet-loading">
            <PropagateLoader
            className='clip-loader'
            size={15}
            color={"#fbf1a9"}
            loading={true}
            />
        </div>
    )
}

export default LoadingSpinner;