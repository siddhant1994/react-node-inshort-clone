import React, { useEffect, useState } from "react";
import "./App.css";
import Cards from "./Cards";
import config from "./config";
function App() {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        window
            .fetch(`${config.base_url}scrape`)
            .then((response) => response.json())
            .then((articles) => setArticles(articles))
            .catch((e) => console.log(e));
    }, []);
    return (
        <div className="App">
            {articles.map((article, index) => {
                return <Cards article={article} key={index} />;
            })}
        </div>
    );
}

export default App;
