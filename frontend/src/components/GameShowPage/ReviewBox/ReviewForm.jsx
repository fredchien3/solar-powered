import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview, updateReview } from '../../../store/reviews';
import './ReviewForm.css';

export default function ReviewForm({ game, review, setEditing }) {
  const dispatch = useDispatch();
  
  const [body, setBody] = useState(review ? review.body : '');
  const [recommended, setRecommended] = useState(review ? review.recommended : null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (body.length === 0) {
      alert('Please describe what you liked or disliked about this game and whether you recommend it to others.\nPlease remember to be polite and follow the Rules and Guidelines.')
    } else if (recommended === null) {
      alert(`Would you recommend ${game.title} to others?`)
    } else if (review) {
      const updatedReview = {...review, body, recommended};
      dispatch(updateReview(updatedReview));
      setEditing(false);
    } else {
      const newReview = {body, recommended, gameId: game.id};
      dispatch(createReview(newReview));
    }
  }
  
  return (
    <form className={review ? "review-form-update" : "review-form-right"} onSubmit={handleSubmit}>
      <textarea
        className="review-form-text"
        onChange={e => setBody(e.target.value)}
        value={body}
      />
      <div className="review-form-options">
        <span>
          <button
            className="light-blue-button review-form-options-button"
            disabled={recommended === true}
            onClick={() => setRecommended(true)}
          >
            <i className="fa-solid fa-flip-horizontal fa-thumbs-up" />
            Yes
          </button>
          <button
            className="light-blue-button review-form-options-button"
            disabled={recommended === false}
            onClick={() => setRecommended(false)}
          >
            <i className="fa-solid fa-flip-horizontal fa-thumbs-down" />
            No
          </button>
        </span>
        <button type="submit" className="post-review-button">{review ? "Save Changes" : "Post review"}</button>
      </div>
    </form>
  )
}