import React from "react";
import './Header.css';

export default ({black}) => {
    return(
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg" />
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://i.postimg.cc/Njs36Wyn/Icono-Netflix.png" />
                </a>
            </div>
        </header>
    )
}