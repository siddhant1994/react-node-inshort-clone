const express = require("express");
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const app = express();
const PORT = process.env.PORT || 8081;
const path = require("path");
const DEFAULT_LANG = "en";
const BASE = `https://www.inshorts.com/{{lang}}/read/`;
const store_JSON = `store/store.json`;
const caching = {
    ts: 15 * 60 * 1000,
    sec: 900,
};

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));

if (process.env.NODE_ENV === "dev") {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });
}

let handler = (req, res) => {
    /**setting headers here */
    res.set("Cache-control", `public, max-age=${caching.sec}`);

    let url = BASE;
    let category = "all",
        language = DEFAULT_LANG;

    if (req.query.category) {
        category = req.query.category;
        url += req.query.category;
    }

    if (req.query.language) {
        language = req.query.language;
        url = url.replace(/{{lang}}/, req.query.language);
    } else {
        url = url.replace(/{{lang}}/, language);
    }

    let data = {};
    try {
        data = fs.readFileSync(path.join(__dirname, store_JSON), "utf-8");
        data = typeof data === "string" ? JSON.parse(data) : data;
    } catch (e) {
        // console.log(e);
    }

    if (
        data &&
        data[category] &&
        data[category][language] &&
        Date.now() - +data[category][language].timestamp < caching.ts
    ) {
        return res.send(data[category][language].collection);
    }

    request(url, function (error, response, html) {
        console.log("doing requests");
        if (error) return res && res.status(500).send(error);

        let $ = cheerio.load(html);
        let articles = [];

        $(".news-card").each(function (index, card) {
            let card_row = {
                title: $(card).find("[itemprop=headline]").text(),
                image: $(card).find(".news-card-image").css("background-image"),
                content: $(card).find("[itemprop=articleBody]").text(),
                author: $(card).find(".author").first().text(),
                date: $(card).find(".date").text(),
                time: $(card).find(".time").first().text(),
                read_more: $(card).find(".read-more").find("a").attr("href"),
                timestamp: Date.now(),
            };
            articles.push(card_row);
        });
        store(articles, category, language);

        return res && res.send(articles);
    });
};

let store = (collection, category = "all", language) => {
    let timestamp = Date.now();
    let object = {};
    object = {
        collection,
        timestamp,
    };
    let data = {};
    try {
        data = JSON.parse(
            fs.readFileSync(path.join(__dirname, store_JSON), "utf-8")
        );
    } catch (e) {
        // console.log(e);
    }

    if (!data[category]) data[category] = {};
    data[category][language] = {};
    data[category][language] = object;

    fs.writeFileSync(
        path.join(__dirname, store_JSON),
        JSON.stringify(data),
        "utf-8"
    );
};

app.get("/scrape", handler);

app.listen(PORT, () => {
    console.log("Magic happens on port " + PORT);
});

exports = module.exports = app;
