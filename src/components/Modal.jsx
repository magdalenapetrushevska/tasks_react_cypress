import './Modal.css';

function Modal({ children, onClose }) {
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <dialog className="modal" open data-cy="modal">
        {children}
      </dialog>
    </>
  );
}

export default Modal;
