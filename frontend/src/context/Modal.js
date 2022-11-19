import React, { useContext, useRef, useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import "./Modal.css";


const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();
  
  useEffect(() => {
    setValue(modalRef.current);
  }, [])
  

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  )
}

export default function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  
  if (!modalNode) return null;
  
  return ReactDOM.createPortal((
    <div id="modal">
      <div id="modal-background" onClick={onClose}>
        <div id="modal-content">
          {children}
        </div>
      </div>
    </div>
  ), modalNode)
}
