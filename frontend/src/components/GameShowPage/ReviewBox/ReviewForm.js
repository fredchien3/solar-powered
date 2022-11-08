import './ReviewForm.css';

export default function ReviewForm() {
  return (
    <div className="review-form-right">
      <textarea className="review-form-text"></textarea>
      <div className='review-form-options'>
        <span>
          <button className="light-blue-button review-form-options-button">
            <i className="fa-solid fa-flip-horizontal fa-thumbs-up" />
            Yes
          </button>
          <button className="light-blue-button review-form-options-button">
            <i className="fa-solid fa-flip-horizontal fa-thumbs-down" />
            No
          </button>
        </span>
        <button className="post-review-button">Post review</button>
      </div>
    </div>
  )
}