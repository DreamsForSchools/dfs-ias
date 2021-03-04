import React from 'react';
import './Card.scss';


const Card = (props) => {
    if(props.item.tag === props.filterType || props.filterType === "All" ){
        if(props.viewType === "Programs"){
            return (
                <div className={"card-container"}>
                    <div className={"card-image"}>
                        <img src={props.item.logo} className={"program-image"}/>
                    </div>
                    <div className={"card-text"}>
                        <h2 className={'title'}>{props.item.name}</h2>
                    </div>
                </div>
            )
        } else return (
            <div className={"card-container"}>
                <div className={"card-image"}>
                    <img src={props.item.logo} className={"partner-image"}/>
                </div>
                <div className={"card-text"}>
                    <h2 className={'title'}>{props.item.name}</h2>
                </div>
            </div>
        )
    }else{
        return (null);
    }

}

export default Card;