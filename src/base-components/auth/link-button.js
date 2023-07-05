import Button, { themeColor } from 'components/common/Button'
import { find } from 'lodash'
import { useRouter } from 'next/router'
import React from 'react'
import { FiPlus } from 'react-icons/fi'

const LinkedButton = ({ funcId, permissions, icon, color, textSize='lg:text-base' }) => {
  const router = useRouter()
  //console.log('props: ', permissions)
  //const func = find(permissions, (p) => p.resource === funcId)
  const func = permissions[funcId]
  return (
    <>
      {func && (
        <button
          className={`btn btn-default btn-rounded btn-icon ${themeColor[color]} text-white space-x-1 mr-1 ${textSize} text-sm`}
          onClick={() => {
            router.push(func?.url)
          }}
        >
          {icon}
          <span>{func?.name}</span>
        </button>
      )}
    </>
  )
}

export default LinkedButton
