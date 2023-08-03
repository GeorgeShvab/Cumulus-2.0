import Sidebar from '@/components/Sidebar/Sidebar'
import Main from '@/components/Main/Index'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { headers } from 'next/dist/client/components/headers'
import { getWeather } from '../api'
import { capitalizeLetter } from '../../../utils/capitalizeLetter'

interface Query {
  searchParams: {
    latitude: string
    longitude: string
  }
}

export default async function Home(query: Query) {
  try {
    const weather = await getWeather({
      lat: Number(query.searchParams?.latitude),
      lon: Number(query.searchParams?.longitude),
    })

    const location = `${query.searchParams?.latitude}° ${query.searchParams?.longitude}°`

    return (
      <main className="bg-neutral-50">
        <div className="lg:min-h-screen block lg:flex">
          <div className="flex-[0_0_330px] xl:flex-[0_0_370px]">
            <Sidebar
              location={capitalizeLetter(location)}
              timeOffset={weather.timezone_offset * 1000}
              {...weather.current}
            />
          </div>
          <div className="h-full flex-1 flex">
            <Main days={weather.daily} timeOffset={weather.timezone_offset * 1000} />
          </div>
        </div>
      </main>
    )
  } catch (e) {
    const referer = headers().get('referer')

    if (!referer) redirect('/')

    const prevUrl = new URL(referer)

    prevUrl.searchParams.delete('error')

    prevUrl.searchParams.append('error', 'city_not_found')

    redirect(prevUrl.href)
  }
}

export async function generateMetadata(query: Query): Promise<Metadata> {
  return {
    title: `Погода в ${query.searchParams?.latitude}° ${query.searchParams?.longitude}°`,
    description: `Точний прогноз погоди на 7 днів вперед у ${query.searchParams.latitude}°, ${query.searchParams.longitude}°.`,
    openGraph: {
      images: ['/logo.jpg'],
      title: `Погода в ${query.searchParams?.latitude}° ${query.searchParams?.longitude}`,
      description: `Точний прогноз погоди на 7 днів вперед у ${query.searchParams.latitude}°, ${query.searchParams.longitude}°.`,
      type: 'website',
      url: `/coordinates?latitude=${query.searchParams?.latitude}&longitude=${query.searchParams?.longitude}`,
    },
  }
}
