import React from 'react';
import './Card.scss';

export const Mars = () => {
    return (
        <div>
            <h4>Mars is cool</h4>
        </div>
    )

}

const Card = (props) => {
    return (
        <div className={"card-container"}>
            <img src={props.item.logo} />
            <h2 style={{marginBottom: '1rem', color: props.item.color}}>{props.item.name}</h2>
        </div>
    )
}

export default Card;