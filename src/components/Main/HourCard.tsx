import { FC, useRef, useState } from 'react'
import WeatherIcon from '../WeatherIcon'
import { HourWeather, Settings } from '../../../types'
import { converTemperature, convertPressure, convertSpeed } from '../../../utils/convert'
import Popup from '../Popup'
import { translatePressureUnit, translateSpeedUnit } from '../../../utils/translate'

const HourCardPopupItem: FC<{ value: string | number; unit: string; title: string }> = ({ unit, title, value }) => {
  return (
    <div className="flex justify-between gap-10 mb-3 last:mb-0">
      <p className="text-sm whitespace-nowrap">{title}</p>
      <p className="text-sm whitespace-nowrap">
        {value}
        <sup className="text-sm">
          <span className="text-[0.6rem]">{unit}</span>
        </sup>
      </p>
    </div>
  )
}

const HourCard: FC<HourWeather & { settings: Settings; onClick?: () => void; dateOffset: number }> = ({
  weather,
  dt,
  temp,
  is_day,
  settings,
  pop,
  clouds,
  wind_deg,
  wind_speed,
  humidity,
  pressure,
  onClick,
  dateOffset,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const anchor = useRef<HTMLDivElement>(null)

  return (
    <div
      className={`rounded-lg p-1.5 py-2 xl:p-3 shadow-sm transition-all relative hover:bg-neutral-100 ${
        isHovered ? 'border lg:border-none bg-neutral-100' : 'bg-white'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={anchor}
      role="button"
      onClick={onClick}
    >
      <Popup anchor={anchor.current} show={isHovered} pos="bottom">
        <div className="bg-white p-5 shadow-lg border rounded-lg hidden lg:block">
          <HourCardPopupItem
            title="Швидкість вітру"
            value={convertSpeed({
              speed: wind_speed,
              to: settings.speedUnit,
            }).toFixed(1)}
            unit={translateSpeedUnit(settings.speedUnit)}
          />
          <HourCardPopupItem title="Азимут вітру" value={wind_deg} unit="O" />
          <HourCardPopupItem title="Вірогідність опадів" value={Math.round(pop * 100)} unit="%" />
          <HourCardPopupItem title="Хмарність" value={clouds} unit="%" />
          <HourCardPopupItem title="Вологість" value={humidity} unit="%" />
          <HourCardPopupItem
            title="Тиск"
            value={convertPressure({ pressure, to: settings.pressureUnit })}
            unit={translatePressureUnit(settings.pressureUnit)}
          />
        </div>
      </Popup>
      <h5 className="text-center text-sm mb-1">{new Date(dt * 1000 + dateOffset).toUTCString().slice(17, 22)}</h5>
      <div className="">
        <WeatherIcon code={weather[0]?.id || 0} isDay={is_day} />
      </div>
      <p className="font-semibold text-center text-xl text-neutral-600">
        {Math.round(converTemperature({ temp, to: settings.temperatureUnit }))}°
      </p>
    </div>
  )
}

export default HourCard
