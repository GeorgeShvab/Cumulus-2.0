import { FC, useContext } from 'react'
import { DayWeather } from '../../../types'
import { settingsContext } from '@/app/settingsContext'
import { translatePressureUnit, translateSpeedUnit } from '../../../utils/translate'
import { convertPressure, convertSpeed } from '../../../utils/convert'

const InfoCard: FC<{ title: string; unit: string; value: string | number }> = ({ title, unit, value }) => {
  return (
    <div className="rounded-lg p-4 lg:py-6 lg:px-8 bg-white shadow-sm">
      <p className="text-neutral-400 mb-8 text-sm whitespace-nowrap">{title}</p>
      <p className="text-4xl lg:text-5xl xl:text-6xl">
        {value}
        <sup className="text-4xl lg:text-5xl xl:text-6xl">
          <span className="text-sm lg:text-lg xl:text-xl ml-1">{unit}</span>
        </sup>
      </p>
    </div>
  )
}

const Info: FC<DayWeather> = ({ wind_speed, wind_deg, clouds, humidity, pressure, pop }) => {
  const { settings } = useContext(settingsContext)

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 grid-rows-2 h-full gap-2 xl:gap-4 flex-inital pb-4 lg:pb-0">
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
    </div>
  )
}

export default Info
