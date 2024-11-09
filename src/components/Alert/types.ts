import { ReactNode } from "react";

export interface AlertProps {
  type?: "error" | "success";
  children: string | ReactNode;
}
