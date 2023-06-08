import Alert from '@/components/Alert'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, useEffect, useRef, useState } from 'react'

const ErrorHandler: FC = () => {
  const [error, setError] = useState<'invalid_coordinates' | 'city_not_found'>()

  const params = useSearchParams()

  const time = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const paramsError = params.get('error')
    if (paramsError) {
      setError(paramsError as 'invalid_coordinates' | 'city_not_found')

      time.current = setTimeout(() => {
        setError(undefined)
      }, 7500)
    }

    return () => {
      clearTimeout(time.current)
    }
  }, [params])

  if (error) {
    if (error === 'city_not_found') {
      return <Alert>Населений пункт не знайдено</Alert>
    } else if (error === 'invalid_coordinates') {
      return <Alert>Координати невірні</Alert>
    } else {
      return null
    }
  } else {
    return null
  }
}

export default ErrorHandler
