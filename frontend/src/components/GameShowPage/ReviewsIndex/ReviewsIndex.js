import { useSelector } from 'react-redux';
import './ReviewsIndex.css';
import ReviewTile from './ReviewTile';

export default function ReviewsIndex({ gameId }) {
  const reviews = useSelector(state => {
    return Object.values(state.reviews).filter(review => review.gameId === gameId)
  })

  const reviewTiles = reviews.map(review => {
    return <ReviewTile review={review} key={review.id} />
  })
  
  return (
    <section className="reviews-index">
      <div className="reviews-index-main-column">
        <header>
          <h1>Customer Reviews</h1>
          <div className="reviews-header-summary">
            <h2>Overall Reviews:</h2>
            <h3>Overwhelmingly Positive <span>(100 reviews)</span></h3>
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