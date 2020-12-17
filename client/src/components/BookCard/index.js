import React from "react";

export function Card(props) {
    return (
        <div className="card" >
            <img className="card-img-top" src={props.image} alt={props.alt} />
            <div className="card-title">
                {props.title}
            </div>
            <div className="card-subtitle">
                By: {props.author}
            </div>
            <div className="card-text">
                {props.description}
            </div>
            <a href={props.link} className="btn btm-primary">View</a>
        </div>
    );
}