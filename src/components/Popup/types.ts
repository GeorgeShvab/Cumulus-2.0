import { ReactNode } from "react";

export type Position = "top" | "bottom" | "left" | "right";

export interface PopupProps {
  children: ReactNode;
  anchor: HTMLElement | undefined | null;
  pos: Position;
  show: boolean;
  posCorrection?: {
    top?: number;
    left?: number;
  };
}
