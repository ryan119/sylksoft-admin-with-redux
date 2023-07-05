import React from 'react'
const FormTitle = ({ label, width='w-32', required=true}) => {
    return (
      <div className={`flex-none ${width}`}>
        <div className='lg:w-full'>
          <div className={`form-element lg:justify-start`}>
            <div className={`form-label lg:whitespace-normal whitespace-nowrap ${required === true? 'required' : ''}`}>{label}</div>
          </div>
        </div>
      </div>
    )
}

export default FormTitle
