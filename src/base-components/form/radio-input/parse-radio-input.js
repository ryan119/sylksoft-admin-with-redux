import { omit } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { get, useFormContext } from 'react-hook-form'
import FormTitle from 'src/base-components/form/common/form-title'
import Error from 'src/base-components/form/error'

const ParseRadioInput = ({
                           name,
                           type,
                           label,
                           required,
                           valid,
                           readonly,
                           placeholder,
                           inline,
                           options = [],
                           children,
                           inputWidth = 'w-full',
                           labelWidth = 'w-32',
                           ...props
                         }) => {
  const { register, getValues, formState: { errors } } = useFormContext()
  valid = (required && !props.disabled) ? valid : omit(valid, ['required'])
  return (
    <>
      {inline ? (
        <div className='lg:flex lg:flex-1 lg:pr-4 mb-2'>
          <FormTitle label={label} inline={inline} required={required}/>
          <div className={props.inputWidth ? props.inputWidth : 'lg:w-3/6'}>
            <div className='w-full'>
              <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
                {options.map((option, idx) => {
                  return (
                    <label className='flex items-center justify-start space-x-2' key={idx}>
                      <input
                        type='radio'
                        value={option.id}
                        className={get(errors, name) ? 'form-radio form-radio-invalid' : 'form-radio'}
                        placeholder={placeholder}
                        {...register(name, valid)}
                        {...props}
                      />
                      <span
                        className={`${
                          get(errors, name) ? 'text-red-500' : ''
                        }`}>
                        {option.label}
                      </span>
                    </label>
                  )
                })}

              </div>
              <Error errors={errors} name={name} />
            </div>
          </div>
          {children && (
            <div className='lg:w-2/6 lg:px-4 lg:pb-0 pb-4'>
              {children}
            </div>
          )}
        </div>
      ) : (
        <div className={`form-element`}>
          <div className='flex'>
            <div className='flex-1 form-label'>{label}</div>
          </div>
          <div className='inline-flex items-center space-x-2'>
            {options.map((option, idx) => {
              return (
                <label className='flex items-center justify-start space-x-2' key={idx}>
                  <input
                    type='radio'
                    value={option.id}
                    className={get(errors, name) ? 'form-radio form-radio-invalid' : 'form-radio'}
                    placeholder={placeholder}
                    {...register(name, valid)}
                    {...props}
                  />
                  <span
                    className={`${
                      get(errors, name) ? 'text-red-500' : ''
                    }`}>
                        {option.label}
                      </span>
                </label>
              )
            })}
          </div>
          <Error errors={errors} name={name} />

        </div>
      )}

    </>
  )
}

ParseRadioInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  /**
   * 1.當有指定寬度時，該element的寬度為指定寬度
   * 2.沒指時就只會follow lg:w-3/6, 這裡會因為若form 用sweetalert彈出時，
   *   tailwind 在判斷lg時，不會依據彈出modal 的寬度而定，造成頁面破版
   */
  inputWidth: PropTypes.string
}

ParseRadioInput.defaultProps = {
  type: 'text',
  required: true,
  valid: { required: 'This field is required' },
  placeholder: '',
  readonly: false,
  inline: true
}

export { ParseRadioInput }
