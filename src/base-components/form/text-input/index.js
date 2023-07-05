import { omit } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { get, useFormContext } from 'react-hook-form'
import Error from 'src/base-components/form/error'

const TextInput = (
  {
    name,
    type,
    label,
    required,
    valid,
    readonly,
    placeholder,
    inline,
    inputWidth = 'w-full',
    labelWidth = 'w-32',
    children,
    ...props
  }
) => {
  const { register, formState: { errors } } = useFormContext()
  valid = (required && !props.disabled) ? valid : omit(valid, ['required'])
  return (
    <>
      <div className={`${inline ? 'lg:flex lg:flex-1' : ''}`}>
        <div className={`form-element ${inline ? `flex-none ${labelWidth}` : 'flex'}`}>
          <div className={`flex-1 form-label ${required ? 'required' :''}`}>{label}</div>
        </div>
        <div className={`${inputWidth}`}>
          <div className='w-full'>
            <div className='form-element'>
              <div className="inline-flex items-center space-x-2">
              <input
                name={name}
                type={type}
                className={`w-full ${get(errors, name) ? 'form-input form-input-invalid ' : 'form-input'} disabled:bg-gray-100`}
                placeholder={placeholder}
                readOnly={readonly}
                {...register(name, valid)}
                {...props}
              />
              {children}
              </div>
              <Error errors={errors} name={name} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  /**
   * 1.當有指定寬度時，該element的寬度為指定寬度
   * 2.沒指時就只會follow lg:w-3/6, 這裡會因為若form 用sweetalert彈出時，
   *   tailwind 在判斷lg時，不會依據彈出modal 的寬度而定，造成頁面破版
   */
  inputWidth: PropTypes.string,
  //只有當外層grid-cols-1時，才考慮是否用inline
  inline: PropTypes.bool,
  //若欄位上有link action需外部傳入時
  children: PropTypes.element || undefined
}

TextInput.defaultProps = {
  type: 'text',
  required: true,
  valid: { required: 'This field is required' },
  placeholder: '',
  readonly: false,
  inline: false,
  children: undefined
}

export { TextInput }
