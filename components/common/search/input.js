import React from 'react'

const SearchInput = ({name, label, onChange, value='', disabled, readOnly=false, placeholder='Enter something...',type='text', ...props}) => {
  return (
    <div className={`form-element`}>
      <div className='form-label'>{label}</div>
      <input
        name={name}
        type={type}
        className='form-input w-full disabled:bg-gray-100'
        placeholder={placeholder}
        onChange={(e) => onChange(e, name)}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        {...props}
      />
    </div>
  )
}

export default SearchInput
