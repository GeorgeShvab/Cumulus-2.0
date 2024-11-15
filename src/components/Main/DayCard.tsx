import { FC } from "react";
import WeatherIcon from "@/components/WeatherIcon/WeatherIcon";
import { DayWeather } from "@/types";
import { converTemperature } from "@/utils/convert";
import moment from "moment";
import { capitalizeLetter } from "@/utils/capitalizeLetter";

interface Props extends DayWeather {
  onClick: () => void;
  className?: string;
  unit: "fahrenheit" | "celsius";
  choosed: boolean;
  timeOffset: number;
}

const DayCard: FC<Props> = ({
  temp,
  className,
  onClick,
  dt,
  unit,
  weather,
  choosed,
  timeOffset,
}) => {
  const utcDay = capitalizeLetter(
    moment
      .unix(dt + timeOffset)
      .utc()
      .format("dddd")
  );

  return (
    <div
      className={`rounded-lg bg-white p-1.5 py-2 xl:p-4 shadow-lg transition-all cursor-pointer ${
        choosed
          ? "scale-105 border shadow-2xl lg:shadow-lg lg:border-none lg:scale-100 lg:translate-y-[-10px]"
          : "lg:hover:translate-y-[-5px]"
      } ${className}`}
      onClick={onClick}
      role="button"
      aria-label={"Погода у " + utcDay}
    >
      <h3 className="text-center mb-1.5 xl:mb-0 font-semibold text-xs xl:text-sm">
        {utcDay}
      </h3>
      <div className="px-2 mb-1.5 xl:mb-0">
        <WeatherIcon
          title={weather[0].description}
          code={weather[0].id}
          isDay={true}
        />
      </div>
      <p className="font-semibold text-center text-xs xl:text-sm xl:text-base">
        {Math.round(converTemperature({ temp: temp.max, to: unit }))}°{" "}
        <span className="ml-1.5 xl:ml-3 text-neutral-300">
          {Math.round(converTemperature({ temp: temp.min, to: unit }))}°
        </span>
      </p>
    </div>
  );
};

export default DayCard;
