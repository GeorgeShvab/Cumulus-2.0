import { FC } from 'react'

const InfoCard: FC<{ title: string; unit: string; value: string | number }> = ({ title, unit, value }) => {
  return (
    <div className="card-container rounded-lg p-4 md:py-6 md:px-5 lg:py-3 lg:px-4 xl:py-4 xl:px-6 bg-white shadow-sm relative">
      <p className="text-neutral-400 mb-8 text-sm lg:text-xs xl:text-sm whitespace-nowrap">{title}</p>
      <p className="card-text text-4xl lg:text-3xl xl:text-5xl lg:absolute lg:right-1/2 lg:bottom-[45%] lg:translate-x-1/2 lg:translate-y-1/2 w-fit">
        {value}
        <sup className="text-4xl lg:text-3xl xl:text-5xl">
          <span className="text-sm lg:text-lg xl:text-xl ml-1 lg:whitespace-nowrap">{unit}</span>
        </sup>
      </p>
    </div>
  )
}

export default InfoCard
