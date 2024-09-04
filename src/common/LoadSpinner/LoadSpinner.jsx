import React from 'react';
import {RotatingLines} from "react-loader-spinner";
import './LoadSpinner.style.css'

const LoadSpinner = () => {
    return (
        <div className={'load-spinner'}>
            <RotatingLines
                visible={true}
                height="200"
                width="200"
                strokeColor="red"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default LoadSpinner;