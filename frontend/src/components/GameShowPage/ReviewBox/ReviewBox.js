import './ReviewBox.css';
import defaultAvatar from "../../default_avatar.jpg";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ReviewForm from './ReviewForm';

export default function ReviewBox({ game, currentUser }) {
  const useHasAlreadyReviewed = true;

  let reviewBox = (
    <>
      <h1>Write a review for {game.title}</h1>
      <p>Please describe what you liked or disliked about this game and whether you recommend it to others.</p>
      <p>Please remember to be polite and follow the Rules and Guidelines.</p>
      <div className="review-form-wrapper">
        <Link to={`/users/${currentUser.username}/games`}>
          <img src={defaultAvatar} alt="avatar" />
        </Link>
        <ReviewForm />
      </div>
    </>
  );
  if (useHasAlreadyReviewed) {
    reviewBox = (
      <>
        <h1>You reviewed this game on October 18, 2018</h1>
        <h2>1 person found your review helpful</h2>
        <div className="review-form-wrapper">
          <i className="fa-solid fa-flip-horizontal fa-thumbs-up" />
          <p>Your review is currently marked as publicly visible. You can edit this review, change your rating, and change the visibility setting if you wish. View your review</p>
        </div>
      </>
    )
  }
  return (
    <div className="review-form-component">
      <header>
        <span className="in-library-flag"><i className="fa-solid fa-bars" />In Library</span>
        {game.title} is already in your Solar library
      </header>
      <section className="review-form-main">
        {/* <div className="review-form-stats">
          Install Steam / Play Now / 367 hours on record
        </div> */}
        {reviewBox}
      </section>
    </div>
  )
}