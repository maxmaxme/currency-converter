import {ReactNode} from "react";
import styles from './layout.module.css'
import {Metadata} from "next";
import './globals.css'
export const metadata: Metadata = {
  title: 'Currency converter',
  themeColor: '#F2F2F7',
  viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover',
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
  description: 'Currency converter',
}

export default function RootLayout({children}: { children: ReactNode }) {
  return (
    <html lang="en">
    <head>
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"></link>
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png"></link>
    </head>
    <body className={styles.container}>
      {children}
    </body>
    </html>
  )
}
