import './ReviewsIndex.css';
import ReviewTile from './ReviewTile';

export default function ReviewsIndex({ reviews, ratingSummaryText, ratingClass }) {
  const reviewTiles = reviews.map(review => {
    return <ReviewTile review={review} key={review.id} />
  })
  
  const reviewsSummary = (
    <h3 className={ratingClass}>
      {ratingSummaryText} <span>({reviews.length} reviews)</span>
    </h3>
  );

  return (
    <section className="reviews-index" id="reviews">
      <div className="reviews-index-main-column">
        <header>
          <h1>Customer Reviews</h1>
          <div className="reviews-header-summary">
            <h2>Overall Reviews:</h2>
            {reviewsSummary}
          </div>
        </header>
        <section className="reviews-index-column">
          <div className="reviews-index-column-left">
            <h1>Most helpful reviews</h1>
            {reviewTiles}
          </div>
          {/* <div className="reviews-index-column-right">
            <h1>Recently posted</h1>
            {reviews.map(review => JSON.stringify(review))}
          </div> */}
        </section>
      </div>
    </section>
  )
}