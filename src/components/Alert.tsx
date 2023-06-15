import { FC, ReactElement } from 'react'
import { createPortal } from 'react-dom'

const Alert: FC<{ type?: 'error' | 'success'; children: string | ReactElement }> = ({ children, type = 'error' }) => {
  return createPortal(
    <div
      className={`fixed top-8 right-1/2 translate-x-1/2 rounded-lg px-6 text-center py-3 text-white ${
        type === 'error' ? 'bg-red-400' : 'bg-green-400'
      }`}
      role="alert"
    >
      {children}
    </div>,
    document.body
  )
}

export default Alert
