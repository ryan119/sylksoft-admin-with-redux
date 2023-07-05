import React from 'react'

const SearchRadios = ({ name, label, onChange, options = [], value}) => {
  return (
    <div className='form-element'>
      <div className='form-label'>{label}</div>
      <div className='flex items-center justify-start space-x-2'>
        {options.map((option, idx) => {
          return (
            <div key={idx} className='inline-flex items-center space-x-2'>
              <input
                type='radio'
                value={option.id}
                name='r1'
                className='form-radio text-blue-500 h-4 w-4'
                onChange={(e) => onChange(e, name)}
                checked={value===option.id.toString()}
              />
              <span>{option.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SearchRadios
