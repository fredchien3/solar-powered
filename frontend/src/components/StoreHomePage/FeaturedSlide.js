import { useEffect, useState } from "react"

export default function FeaturedSlide({game, show}) {

  return (
    <section className={show ? "store-featured-carousel-slide" : "store-featured-carousel-slide slide-hide"}>
      <figure>picture</figure>
      <figcaption className="featured-description-box">
        <div className="featured-title">
          <h2>{game ? game.title : 'Loading...'}</h2>
        </div>
        <div className="featured-screenshots-wrapper">
          <div className="featured-screenshot">1</div>
          <div className="featured-screenshot">2</div>
          <div className="featured-screenshot">3</div>
          <div className="featured-screenshot">4</div>
        </div>
        <div className="featured-text-wrapper">
          <h3>Now Available</h3>
          <div>Top Seller</div>
        </div>
        <div className="price-line">
          <p>{game?.price > 0 ? '$' + game.price : 'Free to Play'}</p>
        </div>
      </figcaption>
    </section>
  )
}