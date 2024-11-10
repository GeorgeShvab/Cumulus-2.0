"use client";

import "@/app/globals.css";
import { Inter } from "next/font/google";
import {
  settingsContext,
  useSettingsContex,
} from "@/providers/SettingsProvider/SettingsProvider";
import ErrorBoundary from "@/app/ErrorBoundary";
import Error from "@/app/error";
import ErrorHandler from "@/app/ErrorHandler";
import moment from "moment";
import { Analytics } from "@vercel/analytics/react";

import "moment/min/locales";

const inter = Inter({ subsets: ["latin"] });

moment.updateLocale("uk", {
  months: [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
  ],
});

moment.locale("uk");

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settingsState = useSettingsContex();

  return (
    <html lang="uk">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="icon/svg" href="/favicon.svg" />
        <script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
        ></script>
      </head>

      <body
        className={
          inter.className +
          " font-montserrat lg:min-h-screen h-full bg-neutral-50"
        }
      >
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
  );
}
