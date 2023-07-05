import PropTypes from 'prop-types'
import React, {useState, useEffect, useRef} from 'react'
import {useSelector, shallowEqual} from 'react-redux'
import Portal from 'src/components/portal'
import { FiPlus, FiX } from 'react-icons/fi'

/**
 * 原檔D-Board component 中的modal/modal-2.js
 *
 */
const Modal = ({open, setOpen, title, icon, body, openButton, width}) => {
  const modalRef = useRef(null)

  const show = () => {
    setOpen(true)
  }
  const hide = () => {
    setOpen(false)
  }

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

    if(open){
      document.body.style.overflow = 'hidden'
    }else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, modalRef])

  return (
    <>
      {openButton}
      {open && (
        <Portal selector="#portal">
          <div className='modal-backdrop fade-in'/>
          <div className={`modal show`}>
            <div
              className={`relative lg:my-4 mx-auto ${width}`}
              ref={modalRef}>
              <div className="bg-white text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 border-0 rounded-lg shadow-lg relative flex w-full outline-none">
                <div className="relative p-4 flex-auto">
                  <div className="flex items-start justify-start p-2 space-x-4">
                    <div className="flex-1  w-full">
                      {body}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  body: PropTypes.element.isRequired,
  openButton: PropTypes.element.isRequired,
}

export default Modal
