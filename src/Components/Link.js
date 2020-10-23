import React from "react";

const Link = (props) => {
    
    return (
        <div className="container">
            <p>Your One time Link :</p>
            <h4>File Name: {props.name}</h4>
            <h4>{props.short_link}</h4>
        </div>
    );
}
export default Link;