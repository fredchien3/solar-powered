import { ratingColor, ratingSummary } from '../../../utils/formatRating';
import './TabListInfo.css';

export default function TabListInfo({ game, active }) {
  const images = [];
  for (let i = 0; i < 4; i++) {
    const url = game.imageUrls[i];
    images.push(<img src={url} alt={game.title + ' panel ' + (i + 1)} key={url} />);
  }

  const ratingSummaryText = ratingSummary(game.averageScore);
  let ratingClass = ratingColor(game.averageScore);
  if (ratingClass === "no-rating") ratingClass = "no-rating-homepage"

  const allReviewsElement = <div>
    <span className={ratingClass}>
      {ratingSummaryText}
    </span>
    {game.numReviews > 0 ? <p>{`(${game.numReviews})`}</p> : <></>}
  </div>

  return (
    <div className={active ? "tab-list-info tab-active" : "tab-list-info "}>
      <h1>{game.title}</h1>
      <div className="tab-list-info-user-reviews">
        Overall user reviews:
        {allReviewsElement}
        {/* user tags row */}
      </div>
      {images}
    </div>
  )
}