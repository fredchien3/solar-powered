import { longDate } from '../../../helpers';
import { ThumbsUp, ThumbsDown } from '../ReviewBox/ReviewBox';
import './ReviewTile.css';
import defaultAvatar from '../../default_avatar.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview } from '../../../store/reviews';
import { useState } from 'react';
import ReviewForm from '../ReviewBox/ReviewForm';

export default function ReviewTile({ review }) {
  const dispatch = useDispatch();
  
  const [editing, setEditing] = useState(false);
  
  const thumb = review.recommended ? <ThumbsUp size={40} /> : <ThumbsDown size={40} />
  const author = useSelector(state => state.users[review.authorId]);
  const currentUser = useSelector(state => state.session.user);
  
  const toggleEditing = () => {
    setEditing(e => !e);
  }
  
  const handleDelete = () => {
    dispatch(deleteReview(review.id));
  }
  
  let reviewControls = (
    <>
      {/* <h2>Was this review helpful?</h2>
      <div className="review-controls">
        <button className="light-blue-button">Yes</button>
        <button className="light-blue-button">No</button>
        <button className="light-blue-button">Funny</button>
        <button className="light-blue-button">Award</button>
      </div> */}
    </>
  )
  if (review.authorId === currentUser.id) {
    reviewControls = (
      <>
        <h2>Owner Controls</h2>
        <div className="review-controls">
          <button className="light-blue-button" onClick={toggleEditing}>
            {editing ?  <></> : <i className="fa-solid fa-pen-to-square" />}
            {editing ? "Cancel" : "Edit Review"}
          </button>
          <button className="light-blue-button" onClick={handleDelete}>
            <i className="fa-regular fa-circle-xmark" />
            Delete
          </button>
        </div>
      </>
    )
  }

  const hasBeenUpdated = review.updatedAt !== review.createdAt;
  const updatedAt = <h1>Updated: {longDate(review.updatedAt)}</h1>
  let reviewTileRight = (
    <>
      <header>
        {thumb}
        <div className="review-tile-header-summary">
          <h1>Recommended</h1>
          <span>100 hrs on record (50 hrs at review time)</span>
        </div>
      </header>
      <h1>Posted: {longDate(review.createdAt)}</h1>
      {hasBeenUpdated && updatedAt}
      <p>{review.body}</p>
    </>
  );
  if (editing) reviewTileRight = (
    <ReviewForm review={review} setEditing={setEditing} />
  )
  
  return (
    <article className="review-tile" id={`review-by-author-${review.authorId}`}>
      <div className="review-tile-left">
        <header>
          <img src={defaultAvatar} alt="avatar" />
          <div className="review-tile-left-top-row">
            <a href={`/users/${author.username}/games`} id="review-author-username">{author.displayName}</a>
            <a href={`/users/${author.username}/games`}>{author.numOwnedGames} products in account</a>
          </div>
        </header>
        <a href={`/users/${author.username}/games`}>{author.numReviews} reviews</a>
      </div>
      <div className="review-tile-right">
        {reviewTileRight}
        {reviewControls}
        <div className="review-vote-stats">
          {/* <p>3 people found this review helpful</p>
          <p>2 people found this review funny</p> */}
        </div>
      </div>
    </article>
  )
}
