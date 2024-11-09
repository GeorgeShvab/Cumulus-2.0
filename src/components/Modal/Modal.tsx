"use client";

import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "@/components/Modal/types";

const Modal: FC<ModalProps> = ({ children, onClose, show, duration = 500 }) => {
  const [hidden, setHidden] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (show) {
        setHidden(false);
        document.body.style.overflow = "hidden";
      } else {
        setTimeout(() => {
          setHidden(true);
        }, duration);
        document.body.style.overflow = "auto";
      }
    }
  }, [show]);

  if (!mounted) return null;

  return createPortal(
    <div className={`${hidden ? "invisible" : "visible"}`}>
      <div
        className={`fixed z-10 left-0 right-0 bottom-0 top-0 transition-opacity duration-500 bg-black/40 ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed z-20 w-fit right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 transition-opacity duration-500 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
