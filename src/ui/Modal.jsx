import React, { cloneElement, createContext, useContext, useState } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";




const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className='fixed top-[0] left-[0] w-full h-screen backdrop-filter backdrop-blur-sm [transition:all_0.5s]'>
      <div className='fixed bg-gray-50 top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 rounded-md  px-32 py-5 [transition:all_0.5s] '  ref={ref}>
        <button className="absolute top-5 right-20  sm:right-8 bg-none border-none p-1.5 rounded-sm transform translate-x-2 transition-all duration-200" onClick={close}>
          <HiXMark />
        </button>
        <div className='w-150 h-0.5 bg-gray-100 mb-2'></div>


        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;