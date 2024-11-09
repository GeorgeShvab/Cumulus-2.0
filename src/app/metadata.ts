import { Metadata } from "next/types";

const metadata: Metadata = {
  title: `Прогноз погоди`,
  description: `Точний прогноз погоди на 7 днів вперед`,
  openGraph: {
    images: ["https://cumulus-2.vercel.app/logo.jpg"],
    title: `Прогноз погоди`,
    description: `Точний прогноз погоди на 7 днів вперед`,
    type: "website",
    url: "https://cumulus-2.vercel.app",
  },
};

export default metadata;
