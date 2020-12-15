import React, { Component } from "react";
import Nav from "./components/Nav";
import Search from "./pages/Search";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Nav />
                <Search />
            </div>
        </BrowserRouter>
    );
}


export default App;
