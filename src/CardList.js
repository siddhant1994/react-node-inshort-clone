import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import config from "./config";

function CardList(props) {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        let language = props.match.params.language || "en",
            category = props.match.params.category || "";

        window
            .fetch(
                `${config.base_url}scrape?language=${language}&category=${category}`
            )
            .then((response) => response.json())
            .then((articles) => setArticles(articles))
            .catch((e) => console.log(e));
    }, [props.match.params]);

    return (
        <div className="card__container">
            {articles && articles.length ? (
                articles.map((article, index) => {
                    return <Cards article={article} key={index} />;
                })
            ) : (
                <p>No articles found in {props.match.params.category}.</p>
            )}
        </div>
    );
}
export default CardList;
