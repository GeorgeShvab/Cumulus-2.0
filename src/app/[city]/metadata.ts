import { Metadata } from "next/types";
import { CityPageProps } from "@/app/[city]/types";
import { capitalizeLetter } from "@/utils/capitalizeLetter";

async function generateMetadata(query: CityPageProps): Promise<Metadata> {
  const location = capitalizeLetter(decodeURI(query.params?.city));

  return {
    title: `Погода в ${location}`,
    description: `Точний прогноз погоди на 7 днів вперед у ${location}.`,
    openGraph: {
      images: ["https://cumulus-2.vercel.app/logo.jpg"],
      title: `Погода в ${location}`,
      description: `Точний прогноз погоди на 7 днів вперед у ${location}.`,
      type: "website",
      url: `https://cumulus-2.vercel.app/${location}`,
    },
  };
}

export default generateMetadata;
