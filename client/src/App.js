import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Search from "./pages/Search";
import Saved from "./pages/Saved"

function App() {
    return (
        <BrowserRouter>
            <div>
                <Nav />
                <Switch>
                    <Route exact path={["/", "/search"]}>
                        <Search />
                    </Route>
                    <Route exact path={["/", "/saved"]}>
                        <Saved />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}


export default App;
