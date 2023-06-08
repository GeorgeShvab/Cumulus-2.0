import { FC, useContext, useState } from 'react'
import { DayWeather } from '../../../types'
import { settingsContext } from '@/app/settingsContext'
import { getMonth } from '../../../utils/date'
import DayCard from './DayCard'
import Info from './Info'

interface Props {
  days: DayWeather[]
}

const Daily: FC<Props> = ({ days }) => {
  const { settings } = useContext(settingsContext)

  const [selectedDay, setSelectedDay] = useState<DayWeather>({ ...days[0] })

  const selectDay = (arg: number) => {
    setSelectedDay({
      ...(days.find((item) => item.dt === arg) || days[0]),
    })
  }

  return (
    <>
      <div className="grid gap-1.5 xl:gap-2 grid-cols-4 lg:grid-cols-7 flex-0 mb-9">
        {days.map((item) => (
          <DayCard
            key={item.dt}
            onClick={() => selectDay(item.dt)}
            choosed={item.dt === selectedDay.dt}
            unit={settings.temperatureUnit}
            {...item}
          />
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between flex-1 mb-5 items-center">
          <h2 className="text-sm lg:text-lg xl:text-xl font-medium lg:font-normal flex-1">
            {selectedDay.day}, {new Date(selectedDay.dt * 1000).getDate()}{' '}
            {getMonth(new Date(selectedDay.dt * 1000).getMonth())}
          </h2>
          <div className="flex gap-2 lg:gap-8">
            <p className="text-xs lg:text-sm xl:text-base">
              Схід сонця: {new Date(selectedDay.sunrise * 1000).toLocaleTimeString().slice(0, 5)}
            </p>
            <p className="text-xs lg:text-sm xl:text-base">
              Захід сонця: {new Date(selectedDay.sunset * 1000).toLocaleTimeString().slice(0, 5)}
            </p>
          </div>
        </div>
        <Info {...selectedDay} />
      </div>
    </>
  )
}

export default Daily
