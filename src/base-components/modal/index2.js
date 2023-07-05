import Button from 'components/common/Button'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import Portal from 'src/components/portal'
import { FiPlus, FiX } from 'react-icons/fi'
import Draggable from 'react-draggable'

/**
 * 原檔D-Board component 中的modal/modal-2.js
 *
 */
const Modal = ({
                 open,
                 setOpen,
                 title,
                 icon,
                 body,
                 openButton = undefined,
                 width,
                 height = 'h-fit',
                 withFooter = true,
                 target = 'widget',
                 headerBg = 'bg-teal-600',
                 footerChild
               }) => {
  const modalRef = useRef(null)
  const eventLogger = (e, data) => {
    console.log('Event: ', e)
    console.log('Data: ', data)
  }
  const hide = () => {
    setOpen(false)
  }

  const [currentHeight, setCurrentHeight] = useState()
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!modalRef || !modalRef.current) return false
      console.log(modalRef.current.contains(event.target))
      if (!open || modalRef.current.contains(event.target)) {
        return false
      }
      //setOpen(!open)
    }
    document.addEventListener('mousedown', handleClickOutside)
    if (open) {
      //document.body.style.overflow = 'hidden'
      //取得body的高度，判斷後改變Modal 的高度
      const clientHeight = document.getElementById(target)?.clientHeight
      if (clientHeight < 788 && modalRef.current) {
        setCurrentHeight(clientHeight)
      } else {
        setCurrentHeight(height)
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
      setCurrentHeight(0)
    }
  }, [open, modalRef.current, body, currentHeight])

  let [activeDrags, setActiveDrags] = useState(0)
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 })
  const [controlledPosition, setControlledPosition] = useState({ x: -400, y: 200 })
  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY
    })
  }
  const onStart = () => {
    setActiveDrags(++activeDrags)
  }

  const onStop = () => {
    setActiveDrags(--activeDrags)
  }
  const onDrop = (e) => {
    setActiveDrags(--activeDrags)
    if (e.target.classList.contains('drop-target')) {
      alert('Dropped!')
      e.target.classList.remove('hovered')
    }
  }

  return (
    <>
      {openButton}
      {open && (
        <Portal selector='#portal'>
          <div className='modal-backdrop fade-in' />
          <div className={`modal show`} data-background='light'>

              <Draggable
                handle='strong'
                onStart={onStart}
                onDrag={handleDrag}
                onStop={onStop}>
                <div
                  className={`relative lg:my-4 mx-auto ${width} ${height === 'h-full' ? 'h-5/6' : height} overflow-y-scroll`}
                  ref={modalRef}>
                <div className={`modal-content ${currentHeight}`}>
                  <strong>
                  <div className={`modal-header ${headerBg} text-white pt-2 pb-2 cursor-move`}>
                    <h3 className='text-xl font-semibold ml-auto'>{title}</h3>
                    <button
                      className='modal-close btn btn-transparent'
                      onClick={hide}>
                      <FiX size={18} className='stroke-current' />
                    </button>
                  </div>
                  </strong>
                  <div className='p-2 flex-auto overflow-y-scroll'>{body}</div>
                  {withFooter ? (
                    <div className='modal-footer space-x-2 justify-center pt-2 pb-2'>
                      <Button color='primary' label='關閉' onClick={hide} />
                      {footerChild}
                    </div>
                  ) : undefined}

                </div>

                {/*<div className="bg-white text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 border-0 rounded-lg shadow-lg relative flex w-full outline-none">
                    <div className="relative p-4 flex-auto">
                      <div className="flex items-start justify-start p-2 space-x-4">
                        <div className="flex flex-col w-full">
                          {body}
                        </div>
                      </div>
                    </div>
                  </div>*/}
                </div>
              </Draggable>

          </div>
        </Portal>
      )}
    </>
  )
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  //傳進來的主體結構
  body: PropTypes.element.isRequired,
  openButton: PropTypes.element,
  //決定及計算高度，在div中給個id, 以取得body的高度從而計算modal 高度。
  target: PropTypes.string,
  //tailwind顏色，default: bg-teal-500。通常對應開Modal的Button顏色,
  headerBg: PropTypes.string,
  footerChild: PropTypes.element
}

export default Modal
