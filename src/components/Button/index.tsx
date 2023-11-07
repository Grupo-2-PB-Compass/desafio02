import styles from "./Button.module.css";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "submit";
  onClick?: () => void;
  className?: string;
}

export function Button(props: ButtonProps) {
  return (
    <button
      className={`${styles.searchButton} ${props.className}`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
