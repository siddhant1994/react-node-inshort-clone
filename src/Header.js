import React, { useEffect, useRef, useState } from "react";
import "./Header.css";

function Header() {
    const [isSticky, setSticky] = useState(false);
    const ref = useRef(null);
    const handleScroll = () => {
        if (window.scrollY > 0) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", () => handleScroll);
        };
    }, []);

    return (
        <div className={`header ${isSticky ? "sticky" : ""}`} ref={ref}>
            <div>
                <span>Menu</span>
            </div>
            <a className="logo__link">
                <img
                    className="logo"
                    src="https://assets.inshorts.com/website_assets/images/logo_inshorts.png"
                />
            </a>
        </div>
    );
}

export default Header;
