'use client'

import { FC } from 'react'
import { Section } from '../../../types'

interface Props {
  section: Section
  setSection: (param: Section) => void
}

const Header: FC<Props> = ({ section, setSection }) => {
  return (
    <header className="py-4 lg:pt-5 lg:pb-7">
      <div className="flex gap-12 lg:gap-6 justify-center lg:justify-start">
        <button
          className={`font-semibold transition-colors duration-500 ${
            section === 'daily' ? 'text-neutral-600' : 'text-neutral-300'
          }`}
          onClick={() => setSection('daily')}
        >
          Щоденно
        </button>
        <button
          className={`font-semibold transition-colors duration-500 ${
            section === 'hourly' ? 'text-neutral-600' : 'text-neutral-300'
          }`}
          onClick={() => setSection('hourly')}
        >
          Щогодинно
        </button>
      </div>
    </header>
  )
}

export default Header
