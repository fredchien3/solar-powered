import { longDate } from '../../../helpers';
import { ThumbsUp, ThumbsDown } from '../ReviewBox/ReviewBox';
import './ReviewTile.css';
import defaultAvatar from '../../default_avatar.jpg';
import { useSelector } from 'react-redux';

export default function ReviewTile({ review }) {
  const thumb = review.recommended ? <ThumbsUp size={40} /> : <ThumbsDown size={40} />
  const author = useSelector(state => state.users[review.authorId]);

  return (
    <article className="review-tile">
      <div className="review-tile-left">
        <header>
          <img src={defaultAvatar} alt="avatar" />
          <div className="review-tile-left-top-row">
            <a href={`/users/${author.id}/games`} id="review-author-username">{author.displayName}</a>
            <a href={`/users/${author.id}/games`}>{author.numOwnedGames} products in account</a>
          </div>
        </header>
        <a href={`/users/${author.id}/games`}>{author.numReviews} reviews</a>
      </div>
      <div className="review-tile-right">
        <header>
          {thumb}
          <div className="review-tile-header-summary">
            <h1>Recommended</h1>
            <span>122.7 hrs on record (61.2 hrs at review time)</span>
          </div>
        </header>
        <h1>Posted: {longDate(review.createdAt)}</h1>
        <p>{review.body}</p>
        <h2>Was this review helpful?</h2>
        <div className="review-vote-buttons-wrapper">
          <button className="light-blue-button">Yes</button>
          <button className="light-blue-button">No</button>
          <button className="light-blue-button">Funny</button>
          <button className="light-blue-button">Award</button>
        </div>
        <div className="review-vote-stats">
          <p>229 people found this review helpful</p>
          <p>11 people found this review funny</p>
        </div>
      </div>
    </article>
  )
}
