"use client";

import { FC, useEffect, useState, useContext } from "react";
import Search from "@/components/Sidebar/Search";
import WeatherIcon from "@/components/WeatherIcon/WeatherIcon";
import { converTemperature } from "@/utils/convert";
import { settingsContext } from "@/providers/SettingsProvider/SettingsProvider";
import moment from "moment";
import { capitalizeLetter } from "@/utils/capitalizeLetter";
import { SidebarProps } from "@/components/Sidebar/types";

const Sidebar: FC<SidebarProps> = ({
  temp,
  weather,
  location,
  timeOffset,
  is_day,
}) => {
  const date = moment().utc().add(timeOffset, "seconds").format("HH:mm");

  const { settings } = useContext(settingsContext);

  const [time, setTime] = useState(date);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = moment().utc().add(timeOffset, "seconds").format("HH:mm");

      setTime(date);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const desc = weather[0].description;

  const description = desc
    ? desc.at(0)?.toUpperCase() + desc.slice(1, desc.length)
    : "Ясно";

  return (
    <aside className="bg-white px-2 h-full w-full shadow-[0_0_5px_0_rgba(0,0,0,0.075)]">
      <div className="h-fit lg:min-h-screen flex flex-col">
        <div className="py-2">
          <Search />
        </div>
        <div className="w-full mb-4 px-10 lg:px-0">
          <div className="w-full aspect-square">
            <WeatherIcon
              title={description}
              code={weather[0].id}
              isDay={is_day}
            />
          </div>
        </div>
        <div className="px-8 mb-20 lg:mb-0">
          <div className="mt-[-20px] lg:mt-[-10px]">
            <h2 className="text-[5.5rem] font-light text-center leading-tight mb-2">
              {Math.round(
                converTemperature({ temp, to: settings.temperatureUnit })
              )}
              <sup>{settings.temperatureUnit === "celsius" ? "°C" : "°F"}</sup>
            </h2>
            <p className="text-neutral-500 text-center">{description}</p>
          </div>
        </div>
        <div className="py-6 mt-auto">
          <h2 className="text-xl text-center mb-1">{location}</h2>
          <p className="text-md text-center text-sm text-neutral-500">
            {capitalizeLetter(
              moment().utc().add(timeOffset, "seconds").format("dddd")
            )}
            , {time}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
