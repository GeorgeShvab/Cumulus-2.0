'use client'

import { FC, useEffect, useState, useContext } from 'react'
import Search from './Search'
import { CurrentWeather } from '../../../types'
import WeatherIcon from '../WeatherIcon'
import { getDayOfWeek } from '../../../utils/date'
import { converTemperature } from '../../../utils/convert'
import { settingsContext } from '@/app/settingsContext'

const Sidebar: FC<CurrentWeather & { location: string; timeOffset: number }> = ({
  temp,
  weather,
  location,
  timeOffset,
  is_day,
}) => {
  let date = new Date(Date.now() + timeOffset).toUTCString()

  const { settings } = useContext(settingsContext)

  date = date.slice(17, date.length - 7)

  const [time, setTime] = useState(date)

  useEffect(() => {
    const interval = setInterval(() => {
      let date = new Date(Date.now() + timeOffset).toUTCString()

      date = date.slice(17, date.length - 7)

      setTime(date)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const description = weather[0].description

  return (
    <aside className="bg-white px-2 h-full w-full shadow-[0_0_5px_0_rgba(0,0,0,0.075)]">
      <div className="h-fit lg:min-h-screen flex flex-col">
        <div className="py-2">
          <Search />
        </div>
        <div className="w-full mb-4 px-10 lg:px-0">
          <div className="w-full aspect-square">
            <WeatherIcon code={weather[0].id} isDay={is_day} />
          </div>
        </div>
        <div className="px-8 mb-20 lg:mb-0">
          <div className="mt-[-20px] lg:mt-[-10px]">
            <h2 className="text-[5.5rem] font-light text-center leading-tight mb-2">
              {Math.round(converTemperature({ temp, to: settings.temperatureUnit }))}
              <sup>{settings.temperatureUnit === 'celsius' ? '°C' : '°F'}</sup>
            </h2>
            <p className="text-neutral-500 text-center">
              {description ? description.at(0)?.toUpperCase() + description.slice(1, description.length) : 'Ясно'}
            </p>
          </div>
        </div>
        <div className="py-6 mt-auto">
          <h2 className="text-xl text-center mb-1">{location}</h2>
          <p className="text-md text-center text-sm text-neutral-500">
            {getDayOfWeek(new Date(Date.now() + timeOffset).getUTCDay())}, {time}
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
