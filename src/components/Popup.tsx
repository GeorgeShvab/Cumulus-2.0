import { FC, ReactElement, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type Position = 'top' | 'bottom' | 'left' | 'right'

interface Props {
  children: ReactElement
  anchor: HTMLElement | undefined | null
  pos: Position
  show: boolean
  duration?: number
  posCorrection?: {
    top?: number
    left?: number
  }
}

const Popup: FC<Props> = ({ children, anchor, pos, show, posCorrection, duration = 100 }) => {
  const container = useRef<HTMLDivElement>(null)

  const [popupPosition, setPopupPosiiton] = useState<{
    left: number
    top: number
  }>({ left: 0, top: 0 })

  const [position, setPosition] = useState<Position>(pos)

  useEffect(() => {
    if (anchor && container.current) {
      const acnhorPosition = anchor.getBoundingClientRect()

      const containerPosition = container.current.getBoundingClientRect()

      const contentPosition = { ...popupPosition }

      let pos = position

      if (pos === 'bottom') {
        contentPosition.left =
          acnhorPosition.left + (posCorrection?.left || 0) - (containerPosition.width / 2 - acnhorPosition.width / 2)
        contentPosition.top = acnhorPosition.bottom + (posCorrection?.top || 0)
      } else if (pos === 'top') {
        contentPosition.left =
          acnhorPosition.left + (posCorrection?.left || 0) - (containerPosition.width / 2 - acnhorPosition.width / 2)
        contentPosition.top = acnhorPosition.top + (posCorrection?.top || 0) - containerPosition.height
      } else if (pos === 'left') {
        contentPosition.left = acnhorPosition.left + (posCorrection?.left || 0) - containerPosition.width
        contentPosition.top =
          acnhorPosition.top + (posCorrection?.top || 0) - (containerPosition.height / 2 - acnhorPosition.height / 2)
      } else if (pos === 'right') {
        contentPosition.left = acnhorPosition.right + (posCorrection?.left || 0)
        contentPosition.top =
          acnhorPosition.top + (posCorrection?.top || 0) - (containerPosition.height / 2 - acnhorPosition.height / 2)
      }

      if (window.innerWidth) {
        if (contentPosition.left < 5) {
          contentPosition.left = acnhorPosition.right + (posCorrection?.left || 0)
          contentPosition.top =
            acnhorPosition.top + (posCorrection?.top || 0) - (containerPosition.height / 2 - acnhorPosition.height / 2)
        }

        if (contentPosition.left + containerPosition.width > document.body.clientWidth - 5) {
          contentPosition.left = acnhorPosition.left + (posCorrection?.left || 0) - containerPosition.width
          contentPosition.top =
            acnhorPosition.top + (posCorrection?.top || 0) - (containerPosition.height / 2 - acnhorPosition.height / 2)
        }

        if (contentPosition.top < 5) {
          contentPosition.left =
            acnhorPosition.left + (posCorrection?.left || 0) - (containerPosition.width / 2 - acnhorPosition.width / 2)
          contentPosition.top = acnhorPosition.bottom + (posCorrection?.top || 0)
        }

        if (contentPosition.top + containerPosition.height > document.body.clientHeight - 5) {
          contentPosition.left =
            acnhorPosition.left + (posCorrection?.left || 0) - (containerPosition.width / 2 - acnhorPosition.width / 2)
          contentPosition.top = acnhorPosition.top + (posCorrection?.top || 0) - containerPosition.height
        }
      }
      setPosition(pos)

      setPopupPosiiton(contentPosition)
    }
  }, [show])

  if (!show || !anchor) return null

  return createPortal(
    <div
      className={`absolute ${popupPosition.left === 0 ? 'invisible' : ''}`}
      style={{
        left: `${popupPosition.left}px`,
        top: `${popupPosition.top}px`,
      }}
      ref={container}
    >
      {children}
    </div>,
    document.body
  )
}

export default Popup
