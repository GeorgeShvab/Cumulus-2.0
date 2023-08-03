import { FC } from 'react'
import { HourWeather, Settings } from '../../../types'
import { converTemperature } from '../../../utils/convert'
import WeatherIcon from '../WeatherIcon'

const HourCard: FC<HourWeather & { timeOffset: number; settings: Settings }> = ({
  weather,
  is_day,
  timeOffset,
  settings,
  temp,
  clouds,
  pop,
  humidity,
  dt,
}) => {
  return (
    <div className="px-2.5 py-0.5 text-xs gap-3 rounded lg:rounded-none bg-white shadow-sm lg:shadow-none items-center h-12 grid grid-rows-1 grid-cols-6">
      <div className="h-10">
        <WeatherIcon code={weather[0]?.id || 0} isDay={is_day} />
      </div>
      <span className="text-center font-medium md:text-sm text-[11px] lg:text-[12px] text-neutral-800">
        {new Date(dt * 1000 + timeOffset).toUTCString().slice(17, 22)}
      </span>
      <span className="text-center font-medium md:text-sm text-[11px] lg:text-[12px] text-neutral-800">
        {Math.round(converTemperature({ temp: temp, to: settings.temperatureUnit }))}°
      </span>
      <span className="text-center font-medium md:text-sm text-[11px] lg:text-[12px] text-neutral-800">
        {Math.round(humidity)}%
      </span>
      <span className="text-center font-medium md:text-sm text-[11px] lg:text-[12px] text-neutral-800">{clouds}%</span>
      <span className="text-center font-medium md:text-sm text-[11px] lg:text-[12px] text-neutral-800">
        {Math.round(pop * 100)}%
      </span>
    </div>
  )
}

const HourlyWeather: FC<{ hourly: HourWeather[]; settings: Settings; timeOffset: number }> = ({
  hourly,
  timeOffset,
  settings,
}) => {
  return (
    <div className="flex flex-col gap-1 md:gap-2.5 lg:gap-0">
      <div className="px-2.5 py-0.5 text-xs rounded lg:rounded-none bg-white shadow-sm lg:shadow-none gap-3 items-center h-12 grid grid-rows-1 grid-cols-6">
        <span className="text-center font-semibold text-[11px] md:text-sm lg:text-[13px]">Умови</span>
        <span className="text-center font-semibold text-[11px] md:text-sm lg:text-[13px]">Час</span>
        <span className="text-center font-semibold text-[11px] md:text-sm lg:text-[13px]">Темп.</span>
        <span className="text-center font-semibold text-[11px] md:text-sm lg:text-[13px]">Волог.</span>
        <span className="text-center font-semibold text-[11px] md:text-sm lg:text-[13px]">Хмар.</span>
        <span className="text-center font-semibold text-[11px] md:text-sm lg:text-[13px]">Опади</span>
      </div>
      {hourly.map((item) => (
        <HourCard key={item.dt} settings={settings} timeOffset={timeOffset} {...item} />
      ))}
    </div>
  )
}

export default HourlyWeather
