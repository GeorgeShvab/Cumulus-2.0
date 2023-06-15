'use client'

'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { settingsContext, useSettingsContex } from './settingsContext'
import ErrorBoundary from './ErrorBoundary'
import Error from './error'
import ErrorHandler from './ErrorHandler'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const settingsState = useSettingsContex()

  return (
    <html lang="uk">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="icon/svg" href="/favicon.svg" />
        <script
          async
          defer
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBioDakkwvxdwJrZWYuYlrCE_gQm13H2HA&libraries=places"
        ></script>
      </head>

      <body className={inter.className + ' font-montserrat lg:h-screen lg:overflow-hidden'}>
        <settingsContext.Provider value={settingsState}>
          <ErrorBoundary fallback={<Error />}>
            <>
              <ErrorHandler />
              {children}
              <div id="portal" />
            </>
          </ErrorBoundary>
        </settingsContext.Provider>
      </body>
    </html>
  )
}
