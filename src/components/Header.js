import React from "react"

export default function Header() {
    return (
        <header className="header">
            <img
                src="/images/troll-face.png"
                className="header--image"
                alt="troll-face"
            />
            <h2 className="header--title">Memeify</h2>
            <p>Where memes come alive!</p>
      
        </header>
    )
}