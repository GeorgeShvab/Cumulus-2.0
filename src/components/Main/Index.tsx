"use client";

import { FC, useContext, useState } from "react";
import { DayWeather } from "@/types";
import { settingsContext } from "@/providers/SettingsProvider/SettingsProvider";
import DayCard from "@/components/Main/DayCard";
import Info from "@/components/Main/Info";
import moment from "moment";
import { capitalizeLetter } from "@/utils/capitalizeLetter";

const Main: FC<{
  days: DayWeather[];
  timeOffset: number;
}> = ({ days, timeOffset }) => {
  const { settings } = useContext(settingsContext);

  const [selectedDay, setSelectedDay] = useState<DayWeather>({ ...days[0] });

  const selectDay = (arg: number) => {
    setSelectedDay({
      ...(days.find((item) => item.dt === arg) || days[0]),
    });
  };

  const sunset = moment
    .unix(selectedDay.sunset + timeOffset)
    .utc()
    .format("HH:mm");

  const sunrise = moment
    .unix(selectedDay.sunrise + timeOffset)
    .utc()
    .format("HH:mm");

  const day = moment
    .unix(selectedDay.dt + timeOffset)
    .utc()
    .date();

  const dayOfWeek = capitalizeLetter(
    moment
      .unix(selectedDay.dt + timeOffset)
      .utc()
      .format("dddd")
  );

  const month = moment
    .unix(selectedDay.dt + timeOffset)
    .utc()
    .format("MMMM");

  return (
    <div className="px-2 lg:px-6 xl:px-10 lg:pb-4 flex-1 lg:min-h-screen py-8 lg:pb-4 pb-0 flex">
      <div className="flex flex-col flex-1">
        <div className="grid gap-1.5 md:gap-2 xl:gap-2 grid-cols-4 lg:grid-cols-7 flex-0 mb-9">
          {days.map((item) => (
            <DayCard
              key={item.dt}
              onClick={() => selectDay(item.dt)}
              choosed={item.dt === selectedDay.dt}
              unit={settings.temperatureUnit}
              timeOffset={timeOffset}
              {...item}
            />
          ))}
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between flex-1 mb-4 lg:mb-5 items-center md:p-0 px-1">
            <h2 className="text-sm lg:text-lg xl:text-xl font-medium lg:font-normal flex-1">
              {dayOfWeek}, {day} {month}
            </h2>
            <div className="flex gap-2 lg:gap-8">
              <p className="text-[11px] md:text-xs lg:text-sm xl:text-base">
                Схід сонця: {sunrise}
              </p>
              <p className="text-[11px] md:text-xs lg:text-sm xl:text-base">
                Захід сонця: {sunset}
              </p>
            </div>
          </div>

          <Info timeOffset={timeOffset} {...selectedDay} />
        </div>
      </div>
    </div>
  );
};

export default Main;
