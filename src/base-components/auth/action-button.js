import { useRouter } from 'next/router'
import React from 'react'
import { FiPlus } from 'react-icons/fi'

const ActionButton = ({ funcId, permissions, onClick, buttonColor, hoverColor }) => {
  const router = useRouter()
  //console.log('props: ', permissions)
  const func = permissions[funcId]
  return (
    <>
      {func && (
        <button
          className={`btn btn-default btn-rounded btn-icon ${buttonColor} hover:${hoverColor} text-white lg:text-base space-x-1 mr-1 text-sm`}
          onClick={() => onClick(func.url)}
        >
          {/*<FiPlus className='stroke-current text-white' size={16} />*/}
          <span>{func?.name}</span>
        </button>
      )}
    </>
  )
}

export default ActionButton
