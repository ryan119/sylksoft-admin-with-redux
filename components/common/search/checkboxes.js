import { forEach, map } from 'lodash'
import React, { useEffect, useState } from 'react'

const SearchCheckboxes = ({ name, label, onChange, options = [], values=[], children=null }) => {
  const handleChange = (e, optionId) => {
    let selected = []
    if(values.includes(optionId)) {
      values.splice(values.indexOf(optionId), 1)
      onChange(name, values)
    }else {
      selected = [...values, optionId]
      onChange(name, selected)
    }
  }

  return (
    <div className='form-element'>
      <div className='form-label'>{label}</div>
      <div className='flex items-center justify-start space-x-2'>
        {options.map((option, idx) => {
          return (
            <div key={idx} className='inline-flex items-center space-x-2'>
              <input
                id={`matchStatus-${idx}`}
                type='checkbox'
                value={option.id}
                name={name}
                className='form-checkbox text-blue-500 h-4 w-4'
                onChange={(e) => handleChange(e, option.id)}
                checked={values.includes(option.id)}
              />
              <span>{option.label}</span>
            </div>
          )
        })}
        {children}
      </div>
    </div>
  )
}

export default SearchCheckboxes