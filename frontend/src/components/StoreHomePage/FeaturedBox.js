export default function FeaturedBox() {
  return (
    <section className="store-featured-box">
      <figure>picture</figure>
      <figcaption className="featured-description-box">
        <div className="featured-title">
          <h2>Game Title</h2>
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
          <p>Free to Play</p>
        </div>
      </figcaption>
    </section>
  )
}