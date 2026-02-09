import {ReactNode} from "react";
import styles from './layout.module.css'
import {Metadata} from "next";
import './globals.css'
export const metadata: Metadata = {
  title: 'Converter',
  manifest: '/manifest.json',
  icons: [
    {
      url: '/icons/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      url: '/icons/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png',
    },
  ],
  description: 'Converter',
}

import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#F2F2F7',
}

export default function RootLayout({children}: { children: ReactNode }) {
  return (
    <html lang="en">
    <head>
      <title>Converter</title>
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"></link>
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png"></link>
    </head>
    <body className={styles.container}>
      {children}
    </body>
    </html>
  )
}
