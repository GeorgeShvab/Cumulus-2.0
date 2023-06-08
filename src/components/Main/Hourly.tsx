import { FC, Fragment, useContext, useState } from 'react'
import { HourWeather } from '../../../types'
import HourCard from './HourCard'
import { getDayOfWeek, getMonth } from '../../../utils/date'
import { convertPressure, convertSpeed } from '../../../utils/convert'
import { settingsContext } from '@/app/settingsContext'
import { capitalizeLetter } from '../../../utils/capitalizeLetter'
import { translatePressureUnit, translateSpeedUnit } from '../../../utils/translate'

const isNewDay = (prev: number, curr: number): boolean => {
  if (!prev) {
    return true
  } else if (new Date(prev).toLocaleDateString() !== new Date(curr).toLocaleDateString()) {
    return true
  } else {
    return false
  }
}

interface Props {
  hours: HourWeather[]
}

const DateCard: FC<HourWeather> = ({ dt }) => {
  return (
    <div className="rounded-lg p-1.5 py-2 xl:p-3 bg-white shadow-sm flex flex-col gap-6 xl:gap-8">
      <div className="flex-0">
        <p className="text-center">{getDayOfWeek(new Date(dt * 1000).getDay())}</p>
      </div>
      <div className="flex-1">
        <h4 className="text-5xl text-center font-semibold mb-2">{new Date(dt * 1000).getDate()}</h4>
        <p className="text-center text-sm text-neutral-400">
          {capitalizeLetter(getMonth(new Date(dt * 1000).getMonth()) || '')}
        </p>
      </div>
    </div>
  )
}

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

const Hourly: FC<Props> = ({ hours }) => {
  const { settings } = useContext(settingsContext)

  const [selectedHour, setSelectedHour] = useState<HourWeather>()

  return (
    <div className="h-[calc(100vh-98px)] overflow-auto pretty-scrollbar lg:pr-3">
      <div className="grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 xl:gap-3 pb-4 lg:pb-0 ">
        {hours.map((item, index) => (
          <Fragment key={item.dt}>
            {isNewDay(hours[index - 1]?.dt * 1000, item.dt * 1000) ? <DateCard {...item} /> : null}
            <HourCard
              settings={settings}
              onClick={() => setSelectedHour(selectedHour?.dt !== item.dt ? item : undefined)}
              {...item}
            />
          </Fragment>
        ))}
      </div>
      {selectedHour ? (
        <div className="lg:hidden sticky bottom-0 left-0 w-full">
          <div className="bg-white p-5 border rounded-lg">
            <HourCardPopupItem
              title="Швидкість вітру"
              value={convertSpeed({
                speed: selectedHour.wind_speed,
                to: settings.speedUnit,
              }).toFixed(1)}
              unit={translateSpeedUnit(settings.speedUnit)}
            />
            <HourCardPopupItem title="Азимут вітру" value={selectedHour.wind_deg} unit="O" />
            <HourCardPopupItem title="Вірогідність опадів" value={Math.round(selectedHour.pop * 100)} unit="%" />
            <HourCardPopupItem title="Хмарність" value={selectedHour.clouds} unit="%" />
            <HourCardPopupItem title="Вологість" value={selectedHour.humidity} unit="%" />
            <HourCardPopupItem
              title="Тиск"
              value={convertPressure({ pressure: selectedHour.pressure, to: settings.pressureUnit })}
              unit={translatePressureUnit(settings.pressureUnit)}
            />
          </div>
          <div className="h-2 bg-neutral-50" />
        </div>
      ) : null}
    </div>
  )
}

export default Hourly
