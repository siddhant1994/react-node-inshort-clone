import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import config from "./config";
import { useParams } from "react-router-dom";
function CardList() {
    const params = useParams();
    const [articles, setArticles] = useState([]);
    const [language] = useState(params.language || "en");
    const [category] = useState(params.category || "");

    useEffect(() => {
        window
            .fetch(
                `${config.base_url}scrape?language=${language}&category=${category}`
            )
            .then((response) => response.json())
            .then((articles) => setArticles(articles))
            .catch((e) => console.log(e));
    }, [language, category]);

    return (
        <div className="card__container">
            {articles.map((article, index) => {
                return <Cards article={article} key={index} />;
            })}
        </div>
    );
}
export default CardList;
