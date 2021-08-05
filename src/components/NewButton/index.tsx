import { ButtonHTMLAttributes } from "react";

import styles from "./styles.module.scss";

type NewButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function NewButton({ isOutlined = false, ...props }: NewButtonProps) {
  return (
    <button
      className={`${styles.newButton} ${isOutlined ? "outlined" : ""}`}
      {...props}
    />
  );
}
