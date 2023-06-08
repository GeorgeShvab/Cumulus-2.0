import { ChangeEvent, FC, useContext } from 'react'
import Modal from '../Modal'
import debounce from '../../../utils/debounce'
import { settingsContext } from '@/app/settingsContext'

const Button: FC<{
  children: string
  choosed: boolean
  onClick: () => void
  className?: string
}> = ({ children, choosed, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg h-[2.75rem] min-w-[2.75rem] px-2 whitespace-nowrap text-sm flex justify-center items-center hover:bg-neutral-100 transition-colors ${className} ${
        choosed ? 'bg-[#efefef] hover:bg-[#efefef]' : 'bg-neutral-50'
      }`}
    >
      {children}
    </button>
  )
}

const Settings: FC<{ onClose: () => void; show: boolean }> = ({ onClose, show }) => {
  const { settings, setSettings } = useContext(settingsContext)

  const setSpecificSettings = (name: string, value: string) => {
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleInput = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSpecificSettings('defaultLocation', e.target.value)
  }, 1000)

  return (
    <Modal onClose={onClose} show={show}>
      <div className="px-2 lg:px-0 w-screen sm:w-[30rem] lg:w-fit">
        <div className="bg-white p-5 lg:p-10 rounded-lg">
          <h2 className="text-center text-xl font-semibold mb-8 lg:mb-12">Налаштування</h2>
          <div>
            <div className="flex gap-8 lg:gap-16 justify-between items-center mb-5">
              <p className="text-sm lg:text-base">Одиниця температури</p>
              <div className="flex gap-1">
                <Button
                  onClick={() => setSpecificSettings('temperatureUnit', 'celsius')}
                  choosed={settings.temperatureUnit === 'celsius'}
                >
                  °C
                </Button>
                <Button
                  onClick={() => setSpecificSettings('temperatureUnit', 'fahrenheit')}
                  choosed={settings.temperatureUnit === 'fahrenheit'}
                >
                  °F
                </Button>
              </div>
            </div>
            <div className="flex gap-8 lg:gap-16 justify-between items-center mb-5">
              <p className="text-sm lg:text-base">Одиниця швидкості</p>
              <div className="flex gap-1">
                <Button onClick={() => setSpecificSettings('speedUnit', 'kmh')} choosed={settings.speedUnit === 'kmh'}>
                  км/год
                </Button>
                <Button onClick={() => setSpecificSettings('speedUnit', 'mph')} choosed={settings.speedUnit === 'mph'}>
                  миль/год
                </Button>
                <Button onClick={() => setSpecificSettings('speedUnit', 'ms')} choosed={settings.speedUnit === 'ms'}>
                  м/с
                </Button>
              </div>
            </div>
            <div className="flex gap-8 lg:gap-16 justify-between items-center mb-5">
              <p className="text-sm lg:text-base">Одиниця тиску</p>
              <div className="flex gap-1">
                <Button
                  onClick={() => setSpecificSettings('pressureUnit', 'hPa')}
                  choosed={settings.pressureUnit === 'hPa'}
                >
                  гПа
                </Button>
                <Button
                  onClick={() => setSpecificSettings('pressureUnit', 'mmHg')}
                  choosed={settings.pressureUnit === 'mmHg'}
                >
                  мм рт. ст.
                </Button>
              </div>
            </div>
            <div className="flex gap-8 lg:gap-16 justify-between items-center">
              <p className="text-sm lg:text-base">Місто за замовчуванням</p>
              <div className="flex-1">
                <input
                  name="city"
                  className="bg-neutral-50 rounded-lg px-4 py-2 w-full text-sm hover:bg-neutral-100 focus:outline"
                  placeholder="Відсутнє"
                  defaultValue={settings.defaultLocation || ''}
                  onInput={handleInput}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Settings
