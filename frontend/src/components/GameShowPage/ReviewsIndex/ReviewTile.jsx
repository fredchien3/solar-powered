import { longDate } from '../../../utils/formatDate';
import { ThumbsUp, ThumbsDown } from '../ReviewBox/ReviewBox';
import './ReviewTile.css';
import defaultAvatar from '../../default_avatar.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview } from '../../../store/reviews';
import { useState } from 'react';
import ReviewForm from '../ReviewBox/ReviewForm';
import { createReviewVote, deleteReviewVote, updateReviewVote } from '../../../store/reviewVotes';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function ReviewTile({ review }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [editing, setEditing] = useState(false);

  const thumb = review.recommended ? <ThumbsUp size={40} /> : <ThumbsDown size={40} />
  const author = useSelector(state => state.users[review.authorId]);
  const currentUser = useSelector(state => state.session.user) || {};

  const [helpfulCount, funnyCount] = useSelector(state => {
    const reviewVotes = Object.values(state.reviewVotes)
      .filter(reviewVote => reviewVote.reviewId === review.id);
    let helpfulCount = 0;
    let funnyCount = 0;
    reviewVotes.forEach(review => {
      if (review.value === "yes") helpfulCount += 1;
      if (review.value === "funny") funnyCount += 1;
    });
    return [helpfulCount, funnyCount];
  })

  let previousVote = useSelector(state => {
    return Object.values(state.reviewVotes).find(vote => {
      return vote.userId === currentUser.id && vote.reviewId === review.id;
    })
  }) || {};

  const handleVote = (value) => {
    if (currentUser.id) {
      if (previousVote.id && previousVote.value === value) {
        dispatch(deleteReviewVote(previousVote.id));
      } else if (previousVote.id) {
        const updatedVote = {...previousVote, value}
        dispatch(updateReviewVote(updatedVote));
      } else {
        const newVote = {value, reviewId: review.id};
        dispatch(createReviewVote(newVote));
      }
    } else {
      history.push('/login');
    }
  }

  const toggleEditing = () => {
    setEditing(e => !e);
  }

  const handleDelete = () => {
    dispatch(deleteReview(review.id));
  }

  const prevYes = previousVote.value === "yes";
  const prevNo = previousVote.value === "no";
  const prevFunny = previousVote.value === "funny";

  let reviewControls = (
    <>
      <h2>Was this review helpful?</h2>
      <div className="review-controls">
        <button
          className={prevYes ? "light-blue-button voted-yes": "light-blue-button"}
          onClick={() => handleVote("yes")}
        >
          <i className="fa-solid fa-flip-horizontal fa-thumbs-up" />
          Yes
        </button>
        <button
          className={prevNo ? "light-blue-button voted-no": "light-blue-button"}
          onClick={() => handleVote("no")}
        >
          <i className="fa-solid fa-flip-horizontal fa-thumbs-down" />
          No
        </button>
        <button
          className={prevFunny ? "light-blue-button voted-funny": "light-blue-button"}
          onClick={() => handleVote("funny")}
        >
          <i className="fa-regular fa-smile" />
          Funny
        </button>
      </div>
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

  let helpfulText;
  if (helpfulCount === 0) {
    helpfulText = <></>;
  } else if (helpfulCount === 1) {
    helpfulText = <p>{helpfulCount} person found this review helpful</p>;
  } else {
    helpfulText = <p>{helpfulCount} people found this review helpful</p>;
  }

  let funnyText;
  if (funnyCount === 0) {
    funnyText = <></>;
  } else if (funnyCount === 1) {
    funnyText = <p>{funnyCount} person found this review funny</p>;
  } else {
    funnyText = <p>{funnyCount} people found this review funny</p>;
  }

  return (
    <article className="review-tile blue-line-top" id={`review-by-author-${review.authorId}`}>
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
          {helpfulText}
          {funnyText}
        </div>
      </div>
    </article>
  )
}
