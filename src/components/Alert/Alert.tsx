import { FC } from "react";
import { createPortal } from "react-dom";
import { AlertProps } from "@/components/Alert/types";

const Alert: FC<AlertProps> = ({ children, type = "error" }) => {
  return createPortal(
    <div
      className={`fixed top-8 right-1/2 translate-x-1/2 rounded-lg px-6 text-center py-3 text-white ${
        type === "error" ? "bg-red-400" : "bg-green-400"
      }`}
      role="alert"
    >
      {children}
    </div>,
    document.body
  );
};

export default Alert;
