import { useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Modal from "../../../contexts/Modal";
import { newsContent } from "./newsContent";
import "./NewsModal.css";

export default function NewsModal() {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  }

  const newsModalContent = (
    <div className="news-wrapper neon-blue-line-top">
      <button
        className="x-news-modal"
        onClick={() => setShowModal(false)}
      >
        <i className="fa-solid fa-xmark" />
      </button>
      <div className="news-content">
        {newsContent}
      </div>
      <button
        className="close-news-modal"
        onClick={() => setShowModal(false)}
      >
        Close
      </button>
    </div>
  )

  return (
    <>
      <Link to="/news" onClick={handleClick}>
        News
      </Link>
      {showModal &&
      <Modal
        onClose={() => setShowModal(false)}

        children={newsModalContent}
      />}
    </>
  )
}