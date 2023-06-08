'use client'

import { FC, useState } from 'react'
import { DayWeather, HourWeather } from '../../../types'
import Header from './Header'
import Daily from './Daily'
import Hourly from './Hourly'

const Main: FC<{
  days: DayWeather[]
  hours: HourWeather[]
}> = ({ days, hours }) => {
  const [section, setSection] = useState<'daily' | 'hourly'>('daily')

  return (
    <div className="px-2 lg:px-6 xl:px-10 lg:pb-4 lg:h-screen">
      <div className="h-full flex flex-col ">
        <Header section={section} setSection={setSection} />
        {section === 'daily' ? <Daily days={days} /> : <Hourly hours={hours} />}
      </div>
    </div>
  )
}

export default Main
