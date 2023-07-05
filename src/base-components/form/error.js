import React from 'react'
import {get} from 'react-hook-form'

const Error = ({errors, name}) => {
  return (
    <>
      { get(errors, name) ? <div className='form-error text-left text-red-500 text-xs'>{get(errors, name)?.message} </div> : undefined}
    </>
  )
}

export default Error
