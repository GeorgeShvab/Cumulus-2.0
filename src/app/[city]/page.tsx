import Sidebar from "@/components/Sidebar/Sidebar";
import Main from "@/components/Main/Index";
import { redirect } from "next/navigation";
import { headers } from "next/dist/client/components/headers";
import getWeather from "@/api/getWeather";
import geocode from "@/api/geocode";
import { capitalizeLetter } from "@/utils/capitalizeLetter";
import { CityPageProps } from "@/app/[city]/types";
export { default as generateMetadata } from "@/app/[city]/metadata";

export default async function Home(query: CityPageProps) {
  try {
    const coordinates = await geocode(decodeURI(query.params?.city));

    const location = capitalizeLetter(decodeURI(query.params?.city));

    const weather = await getWeather({
      latitude: coordinates.lat,
      longitude: coordinates.lon,
    });

    return (
      <main className="bg-neutral-50">
        <div className="lg:min-h-screen block lg:flex">
          <div className="flex-[0_0_330px] xl:flex-[0_0_370px]">
            <Sidebar
              location={capitalizeLetter(location)}
              timeOffset={weather.timezone_offset}
              {...weather.current}
            />
          </div>
          <div className="h-full flex-1 flex">
            <Main days={weather.daily} timeOffset={weather.timezone_offset} />
          </div>
        </div>
      </main>
    );
  } catch (e) {
    const referer = headers().get("referer");

    if (!referer) redirect("/");

    const prevUrl = new URL(referer);

    prevUrl.searchParams.delete("error");

    prevUrl.searchParams.append("error", "city_not_found");

    redirect(prevUrl.href);
  }
}
