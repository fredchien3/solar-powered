import { useState } from "react";
import "./GameShowCarousel.css";

export default function GameShowCarousel({ game }) {
  game.imageUrls ||= [];
  const numImages = game.imageUrls.length;
  const [index, setIndex] = useState(0);

  const cycleIndex = (n=1) => {
    let newIndex = index + n;
    if (n > 0) {
      if (newIndex >= numImages) newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = numImages - 1;
    }
    setIndex(newIndex);
  }

  const images = game.imageUrls.map((url, i) => {
    return <img
      src={url}
      className={index === i ? "game-show-carousel-image show-image-selected" : "game-show-carousel-image"}
      alt={game.title + ' image #' + (i+1)}
      key={i}
    />
  })
  
  const thumbs = game.imageUrls.map((url, i) => {
    return <img
      src={url}
      className={index === i ? "game-show-carousel-thumb show-thumb-selected" : "game-show-carousel-thumb"}
      alt={game.title + ' thumbnail #' + (i+1)}
      onClick={() => setIndex(i)}
      key={i}
    />
  })
  
  return (
    <div className="game-show-carousel-wrapper">
      <figure className="game-show-carousel-slides-wrapper">
        {images}
      </figure>
      <div className="game-show-carousel-thumbs-wrapper">
        {thumbs}
      </div>
      <button onClick={() => cycleIndex(-1)} className="game-show-carousel-button show-carousel-button-left">
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button onClick={() => cycleIndex(1)} className="game-show-carousel-button show-carousel-button-right">
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  )
}