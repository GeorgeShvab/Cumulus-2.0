import Sidebar from "@/components/Sidebar/Sidebar";
import Main from "@/components/Main/Index";
import getWeather from "@/api/getWeather";
import { capitalizeLetter } from "@/utils/capitalizeLetter";
import getCity from "@/api/getCity";
export { default as metadata } from "@/app/metadata";

export default async function Home() {
  const coordinates = await getCity();

  const location = coordinates.city;

  const weather = await getWeather({
    latitude: coordinates.location.lat,
    longitude: coordinates.location.lon,
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
}
