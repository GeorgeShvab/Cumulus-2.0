import { FC, useContext } from 'react'
import { DayWeather } from '../../../types'
import { settingsContext } from '@/app/settingsContext'
import { translatePressureUnit, translateSpeedUnit } from '../../../utils/translate'
import { convertPressure, convertSpeed } from '../../../utils/convert'
import InfoCard from './InfoCard'
import HourlyWeather from './HourlyWeather'

const Info: FC<DayWeather & { timeOffset: number }> = ({
  wind_speed,
  wind_deg,
  clouds,
  humidity,
  pressure,
  pop,
  hourly,
  timeOffset,
}) => {
  const { settings } = useContext(settingsContext)

  return (
    <div className="h-full">
      {hourly && (
        <div className="lg:hidden mb-3">
          <HourlyWeather hourly={hourly} settings={settings} timeOffset={timeOffset} />
        </div>
      )}
      <div
        className={`grid grid-cols-2 ${
          hourly
            ? 'lg:grid-cols-5'
            : 'lg:grid-cols-3 lg:[&_.card-container]:px-8 lg:[&_.card-container]:py-6 lg:[&_.card-text]:translate-x-0 lg:[&_.card-text]:text-6xl lg:[&_.card-text]:translate-y-0 lg:[&_.card-text]:right-none lg:[&_.card-text]:bottom-none lg:[&_.card-text]:static'
        } grid-rows-2 lg:h-full gap-2 xl:gap-3 flex-inital pb-2 lg:pb-0`}
      >
        <InfoCard
          title="Швидкість вітру"
          value={convertSpeed({
            speed: wind_speed,
            to: settings.speedUnit,
          }).toFixed(1)}
          unit={translateSpeedUnit(settings.speedUnit)}
        />
        <InfoCard title="Азимут вітру" value={wind_deg} unit="O" />
        <InfoCard title="Вірогідність опадів" value={Math.round(pop * 100)} unit="%" />
        <InfoCard title="Хмарність" value={clouds} unit="%" />
        <InfoCard title="Вологість" value={humidity} unit="%" />
        <InfoCard
          title="Тиск"
          value={Math.round(convertPressure({ pressure, to: settings.pressureUnit }))}
          unit={translatePressureUnit(settings.pressureUnit)}
        />
        {hourly && (
          <div className="col-start-4 col-end-6 row-start-1 row-end-3 rounded-lg px-2 py-1 bg-white shadow-sm hidden lg:block">
            <HourlyWeather hourly={hourly} settings={settings} timeOffset={timeOffset} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Info
