import React from "react";
import styles from './index.module.css'
import localFont from "next/font/local";
import cn from "classnames";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
}

const font = localFont({
  src: '../../assets/fonts/sf/bold.otf',
})

export function Button(props: Props) {
  return (
    <button
      className={cn(font.className, styles.button)}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
