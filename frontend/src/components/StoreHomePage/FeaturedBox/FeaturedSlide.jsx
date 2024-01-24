import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function FeaturedSlide({ game, show }) {
  const history = useHistory();
  const [displayUrl, setDisplayUrl] = useState(game.mainImageUrl);

  const handleMouseEnter = (e) => {
    const url = new URL(e.target.src).pathname;
    setDisplayUrl(url);
  };

  const handleMouseLeave = () => {setDisplayUrl(game.mainImageUrl);console.log(game.mainImageUrl)};

  const goToShowPage = () => {history.push('/games/' + game.id)};

  const featuredImages = [];
  const screenshotDivs = [];

  for (let i = 0; i < 4; i++) {
    const url = game.imageUrls[i];

    featuredImages.push(
      <img
        key={url}
        src={url}
        alt={game.title + ' featured #' + (i + 1)}
        className={url === displayUrl ? "featured-image-show" : "featured-image-hide"}
      />
    );

    screenshotDivs.push(
      <div
        className="featured-screenshot-div"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        key={url}>
          <img src={url} alt={game.title + ' screenshot #' + (i + 1)} />
      </div>
    );
  }

  return (
    <section className={show ? "store-featured-carousel-slide" : "store-featured-carousel-slide slide-hide"} onClick={goToShowPage}>
      <figure style={{"backgroundImage": `url(${game.mainImageUrl})`}}>{featuredImages}</figure>
      <figcaption className="featured-description-box">
        <div className="featured-title">
          <h2>{game ? game.title : 'Loading...'}</h2>
        </div>
        <div className="featured-screenshots-wrapper">
          {screenshotDivs}
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