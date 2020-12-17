import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function ViewBtn(props) {
    return (
        <a href={props.link} className="view-btn" role="button" tabIndex="0">
            View
        </a>
    );
}

export function SaveBtn(props) {
    return (
        <a href="#" className="save-btn" role="button" tabIndex="0">
            Save
        </a>
    );
}