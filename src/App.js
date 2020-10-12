import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CardList from "./CardList";
import Header from "./Header";
function App() {
    return (
        <Router>
            <Route path="/:language?/:category?">
                <Header />
                {/* side bar  */}
                <div className="App">
                    <CardList />
                </div>
            </Route>
        </Router>
    );
}

export default App;
