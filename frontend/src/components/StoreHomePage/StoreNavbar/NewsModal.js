import { useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Modal from "../../../context/Modal";

export default function NewsModal() {
  const [showModal, setShowModal] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  }
  
  const newsModalContent = (
    <div>
      <h1>Hello World</h1>
      <p>lorem ipsum</p>
    </div>
  )

  return (
    <>
      <Link to="/news" onClick={handleClick}>
        News
      </Link>
      {showModal && <Modal onClose={() => setShowModal(false)} children={newsModalContent}/>}
    </>
  )
}