import { useState } from 'react';
import './FeaturedBox.css'
import FeaturedSlide from './FeaturedSlide';

export default function FeaturedBox({ games }) {
  const numGames = games.length;
  const [index, setIndex] = useState(0);

  const cycleIndex = (n = 1) => {
    let newIndex = index + n;
    if (n > 0) {
      if (newIndex >= 5) newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = 4;
    } 
    setIndex(newIndex);
  }

  const featuredSlides = []
  const nubs = []
  for (let i = 0; i < numGames; i++) {
    const game = games[i];
    featuredSlides.push(
      <FeaturedSlide
        key={game}
        game={game}
        show={index === i ? true : false}
      />
    )

    nubs.push(
      <span id={"featured-carousel-nub-" + i}
        className={index === i ? "featured-carousel-nub nub-active" : "featured-carousel-nub"}
        onClick={() => setIndex(i)}
        key={i}
      />
    )
  }

  return (
    <div className="store-featured-carousel-container">
      <h1>Featured & recommended</h1>
      {featuredSlides}
      <div className="featured-carousel-nubs">
        {nubs}
      </div>
      <button onClick={() => cycleIndex(-1)} className="store-home-button button-left">
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button onClick={() => cycleIndex(1)} className="store-home-button button-right">
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  )
}