import { omit } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { get, useFormContext } from 'react-hook-form'
import Error from 'src/base-components/form/error'

const CheckboxGroup = (
  {
    name,
    type,
    label,
    required,
    valid,
    readonly,
    placeholder,
    inline,
    options = [],
    inputWidth = 'w-full',
    labelWidth = 'w-32',
    children,
    ...props
  }
) => {
  const { register, getValues, formState: { errors } } = useFormContext()
  valid = (required && !props.disabled) ? valid : omit(valid, ['required'])
  return (
    <>
      <div className={`${inline ? 'lg:flex lg:flex-1' : ''}`}>
        <div className={`form-element ${inline ? `flex-none ${labelWidth}` : 'flex'}`}>
          <div className={`flex-1 form-label ${required ? 'required' : ''}`}>{label}</div>
        </div>
        <div className={`${inputWidth}`}>
          <div className='w-full'>
            <div className='form-element'>
              <div className='flex items-center justify-start space-x-2'>
                { options.map((option, idx) => {
                  return (
                    <div key={idx} className='inline-flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        name={name}
                        value={option.id}
                        className={`${get(errors, name) ? 'form-checkbox form-checkbox-invalid' : 'form-checkbox'} text-red-500 h-4 w-4 disabled:bg-gray-100`}
                        {...register(name, valid)}
                        {...props}
                      />
                      <span className={`${get(errors, name) ? 'text-red-500' : ''}`}>
                        {option.label}
                      </span>
                    </div>
                  )
                })}
              </div>
              <Error errors={errors} name={name} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

CheckboxGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  /**
   * 1.當有指定寬度時，該element的寬度為指定寬度
   * 2.沒指時就只會follow lg:w-3/6, 這裡會因為若form 用sweetalert彈出時，
   *   tailwind 在判斷lg時，不會依據彈出modal 的寬度而定，造成頁面破版
   */
  inputWidth: PropTypes.string
}

CheckboxGroup.defaultProps = {
  type: 'checkbox',
  required: true,
  valid: { required: 'This field is required' },
  placeholder: '',
  readonly: false,
  inline: true
}

export { CheckboxGroup }