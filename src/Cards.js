import React from "react";

function Cards({
    article: { title, time, author, content, date, image, read_more },
}) {
    return (
        <div className="">
            <div className="news-card z-depth-1">
                <div
                    className="news-card-image"
                    style={{
                        backgroundImage: image,
                    }}
                ></div>
                <div className="news-card-title news-right-box">
                    <a
                        className="clickable"
                        style={{ textDecoration: "underline" }}
                    >
                        <span>{title}</span>
                    </a>
                    <div className="news-card-author-time news-card-author-time-in-title">
                        <a>
                            <span className="short">short</span>
                        </a>
                        by <span className="author">{author}</span> /
                        <span className="time">{time}</span>
                        on <span clas="date">{date}</span>
                    </div>
                </div>
                <div className="news-card-content news-right-box">
                    <div>{content}</div>
                    <div className="news-card-author-time news-card-author-time-in-content">
                        <a>
                            <span className="short">short</span>
                        </a>
                        by <span className="author">{author}</span> /
                        <span
                            className="time"
                            content="2020-10-06T12:11:23.000Z"
                        >
                            {time}
                        </span>
                        on <span className="date">{date}</span>
                    </div>
                </div>

                <div className="news-card-footer news-right-box">
                    <div className="read-more">
                        read more
                        <a className="source" target="_blank" href={read_more}>
                            HERE
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cards;
