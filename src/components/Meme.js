import React from "react";

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/1bij.jpg"
    });
    const [allMemes, setAllMemes] = React.useState([]);

    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes");
            const data = await res.json();
            setAllMemes(data.data.memes);
        }
        getMemes();
    }, []);

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomNumber].url;
        setMeme((prevMeme) => ({
            ...prevMeme,
            randomImage: url
        }));
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setMeme((prevMeme) => ({
            ...prevMeme,
            [name]: value
        }));
    }

    function handleDownload() {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = meme.randomImage;
        img.crossOrigin = "anonymous"; // To allow downloading from a different domain
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            ctx.font = "bold 36px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(meme.topText, canvas.width / 2, 50);
            ctx.fillText(meme.bottomText, canvas.width / 2, canvas.height - 50);

            // Convert canvas to image and trigger download
            const dataURL = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = dataURL;
            link.download = "meme.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button className="form--button" onClick={getMemeImage}>
                    Get a new meme image 🖼
                </button>
                {meme.randomImage && (
                    <button className="form--button" onClick={handleDownload}>
                        Download Image 📥
                    </button>
                )}
            </div>

            <div className="meme">
                <img src={meme.randomImage} className="meme--image" alt="Generated Meme" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>

            </div>
            <br/>

        </main>
    );
}