import React, { useEffect, useRef, useState } from "react";
import "./Header.css";

function Header({ setSidebar }) {
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
            <div onClick={() => setSidebar(true)}>
                <span>Menu</span>
            </div>
            <div className="logo__link">
                <img
                    alt="logo"
                    className="logo"
                    src="https://assets.inshorts.com/website_assets/images/logo_inshorts.png"
                />
            </div>
        </div>
    );
}

export default Header;
