import React from "react";
import styles from './index.module.css'
import localFont from "next/font/local";
import cn from "classnames";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'muted';
}

const font = localFont({
  src: '../../assets/fonts/sf/bold.otf',
})

export function Button(props: Props) {
  const variantClass = props.variant === 'muted' ? styles.muted : styles.primary

  return (
    <button
      className={cn(font.className, styles.button, variantClass)}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
