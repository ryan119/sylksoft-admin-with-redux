import React from 'react'
const Button = ({label, type='button', onClick, color='primary', textSize='lg:text-base'}) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`btn btn-default ${themeColor[color]} text-white ${textSize} btn-rounded mr-2 text-sm`}>
        { label }
      </button>
    )
}

export const themeColor = {
  default: 'bg-blue-500 hover:bg-blue-600',
  primary: 'bg-teal-500 hover:bg-teal-600',
  gray: 'bg-gray-500 hover:bg-gray-600',
  red: 'bg-red-500 hover:bg-red-600',
  blue: 'bg-blue-800 hover:bg-blue-900',
}

export default Button
