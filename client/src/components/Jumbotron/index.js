import React from "react";

function Jumbotron({ children }) {
    return (
        <div
            style={{ height: 300, clear: "both", marginTop: 20, paddingTop: 120, textAlign: "center" }}
            className="jumbotron"
        >
            {children}
        </div>
    );
}

export default Jumbotron;
