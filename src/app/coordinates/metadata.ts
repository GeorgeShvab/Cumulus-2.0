import { Metadata } from "next/types";
import { CoordinatesPageProps } from "@/app/coordinates/types";

async function generateMetadata({
  searchParams,
}: CoordinatesPageProps): Promise<Metadata> {
  return {
    title: `Погода в ${searchParams?.latitude}° ${searchParams?.longitude}°`,
    description: `Точний прогноз погоди на 7 днів вперед у ${searchParams.latitude}°, ${searchParams.longitude}°.`,
    openGraph: {
      images: ["https://cumulus-2.vercel.app/logo.jpg"],
      title: `Погода в ${searchParams?.latitude}° ${searchParams?.longitude}`,
      description: `Точний прогноз погоди на 7 днів вперед у ${searchParams.latitude}°, ${searchParams.longitude}°.`,
      type: "website",
      url: `https://cumulus-2.vercel.app/coordinates?latitude=${searchParams?.latitude}&longitude=${searchParams?.longitude}`,
    },
  };
}

export default generateMetadata;
