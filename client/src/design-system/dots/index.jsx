import React from 'react';

const Dot = (props) => {
    return (
        <span style={{
            height: '1rem',
            width: '1rem',
            backgroundColor: props.color ? props.color : 'black',
            borderRadius: '50%',
            display: 'inline-block',
            margin: '0 0.2rem'
        }}/>
    )
}

export default Dot;