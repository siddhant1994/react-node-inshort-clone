import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CardList from "./CardList";
import Header from "./Header";
import SideBar from "./SideBar";

const Layout = (props) => {
    const [sideBar, setSidebar] = useState(false);

    return (
        <>
            <SideBar {...props} sideBar={sideBar} setSidebar={setSidebar} />
            <Header sideBar={sideBar} setSidebar={setSidebar} />
            <CardList {...props} />
        </>
    );
};

function App() {
    return (
        <Router>
            <Route path="/:language?/:category?" component={Layout}></Route>
        </Router>
    );
}

export default App;
