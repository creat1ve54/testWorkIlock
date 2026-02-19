import React, { useEffect } from "react";
import { ITodoModal } from "../../type";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, title, className, children }: ITodoModal) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={`modal ${className}`}>
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          {title && <h2 className="modal__title">{title}</h2>}
          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Закрыть"
          >
            &times;
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root") || document.body,
  );
};

export default Modal;
