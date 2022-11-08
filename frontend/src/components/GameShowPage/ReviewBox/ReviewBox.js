import './ReviewBox.css';
import defaultAvatar from "../../default_avatar.jpg";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ReviewForm from './ReviewForm';



export default function ReviewBox({ game, currentUser }) {
  const useHasAlreadyReviewed = false;

  const thumbsUp = (
    <div className="review-form-thumb thumbs-up">
      <i className="fa-solid fa-flip-horizontal fa-thumbs-up" />
    </div>
  )
  
  const thumbsDown = (
    <div className="review-form-thumb thumbs-down">
      <i className="fa-solid fa-flip-horizontal fa-thumbs-down" />
    </div>
  )

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
          {thumbsUp}
          <h3>Your review is publicly visible. You can edit this review and change your rating if you wish. <a href="#">View your review</a></h3>
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