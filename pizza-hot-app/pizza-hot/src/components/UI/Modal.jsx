import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";
export function Modal({ children, open }) {
  const dialog = useRef();
  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [open]);
  return createPortal(
    <dialog ref={dialog} className="modal-box">
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
