import { useState, useEffect } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Modal from "../../../contexts/Modal";
import { newsContent } from "./newsContent";
import "./NewsModal.css";

export default function NewsModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const close = (e) => {
      if(e.key === 'Escape'){
        setShowModal(false);
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  const handleClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  }

  const newsModalContent = (
    <div className="news-wrapper orange-line-top">
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