import React, { useEffect, useState } from "react";
import "./SideBar.css";
import { useParams, Link } from "react-router-dom";
const langs = [
    {
        url: "/en/all",
        name: "English",
        code: "en",
    },
    {
        url: "/hi/all",
        name: "हिन्दी",
        code: "hi",
    },
];

const cats = [
    { code: "all", name: "All News" },
    { code: "india", name: "India" },
    { code: "business", name: "Business" },
    { code: "sports", name: "Sports" },
    { code: "world", name: "World" },
    { code: "politics", name: "Politics" },
    { code: "technology", name: "Technology" },
    { code: "startup", name: "Startup" },
    { code: "entertainment", name: "Entertainment" },
    { code: "miscellaneous", name: "Miscellaneous" },
    { code: "hatke", name: "Hatke" },
    { code: "science", name: "Science" },
    { code: "automobile", name: "Automobile" },
];

function SideBar({ sideBar, setSidebar }) {
    const params = useParams();

    const [langOptions] = useState(langs);
    const [catOptions] = useState(cats);

    const [language, setLanguage] = useState(params.language || "en");
    const [category, setCategory] = useState(params.category || "all");

    useEffect(() => {
        setSidebar(sideBar);
    }, [sideBar, setSidebar]);

    return (
        <>
            <div
                className="hide-on-med-and-up sidebar-bg"
                style={{ display: `${sideBar ? "block" : "none"}` }}
                onClick={() => {
                    setSidebar(false);
                }}
            >
                &nbsp;
            </div>

            <div
                className="sidebar open"
                style={{
                    overflowY: "scroll",
                    display: `${sideBar ? "block" : "none"}`,
                }}
            >
                <div className="lang-bar">
                    <div className="lang-selector clickable">
                        {langOptions.map((lang) => (
                            <Link
                                to={`/${lang.code}/${category}`}
                                key={lang.code}
                                onClick={(e) => {
                                    setLanguage(lang.code);
                                    setSidebar(false);
                                }}
                            >
                                <div
                                    className={`lang-${lang.code} ${
                                        language === lang.code ? `selected` : ""
                                    } `}
                                >
                                    {lang.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="category-header">Categories</div>
                    <ul className="category-list">
                        {catOptions.map((catopt) => (
                            <li
                                className={`active-category ${
                                    category === catopt.code ? `selected` : ""
                                }`}
                            >
                                <Link
                                    key={catopt.code}
                                    to={`/${language}/${catopt.code}`}
                                    onClick={() => {
                                        setCategory(catopt.code);
                                        setSidebar(false);
                                    }}
                                    className="category-link"
                                >
                                    {catopt.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default SideBar;
