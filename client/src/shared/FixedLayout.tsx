import React, { ReactNode } from "react";
import "./FixedLayout.css";

interface FixedLayoutProps {
  children: ReactNode;
}

export const FixedLayout = ({ children }: FixedLayoutProps) => {
  return <div className="parent">{children}</div>;
};
