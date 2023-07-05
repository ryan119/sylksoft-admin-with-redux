import React from 'react'

const SearchSelect = ({name, label, onChange, options=[], value, disabled}) => {
  return (
    <div className={`form-element`}>
      <div className='form-label'>{label}</div>
      <select className='form-select disabled:bg-gray-100'　onChange={(e) => onChange(e, name)} value={value ?? ''} disabled={disabled}>
        <option value=''>請選擇</option>
        { options?.map( (option, idx) => {
          return (<option key={idx} value={option?.id}>{option.label}</option>)
        })}
      </select>
    </div>
  )
}

export default SearchSelect
