import { omit } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { get, useFormContext } from 'react-hook-form'
import FormTitle from 'src/base-components/form/common/form-title'
import Error from 'src/base-components/form/error'

export const TextArea = (
  {
    name, type, label, required, valid, readonly, placeholder, disabled, inline, inputWidth, labelWidth='w-32', ...props
  }) => {
  const { register, formState: { errors } } = useFormContext()
  valid = required ? valid : omit(valid, ['required'])
  return (
    <div className='lg:flex lg:flex-1'>
      <FormTitle label={label} inline={inline} width={labelWidth} required={required}/>
      <div className={inputWidth ? inputWidth : 'lg:w-3/6'}>
        <div className='flex-1'>
          <div className='form-element'>
           <textarea
             className={`${errors[name] ? 'form-textarea form-textarea-invalid' : 'form-textarea'} disabled:bg-gray-100`}
             name={name}
             placeholder={placeholder}
             readOnly={readonly}
             disabled={disabled}
             {...props}
             {...register(name, valid)}
           />
            <Error errors={errors} name={name} />
          </div>

        </div>
      </div>
    </div>
  )
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  /**
   * 1.當有指定寬度時，該element的寬度為指定寬度
   * 2.沒指時就只會follow lg:w-3/6, 這裡會因為若form 用sweetalert彈出時，
   *   tailwind 在判斷lg時，不會依據彈出modal 的寬度而定，造成頁面破版
   */
  inputWidth: PropTypes.string
}

TextArea.defaultProps = {
  required: false,
  valid: { required: 'This field is required' },
  placeholder: '',
  readonly: false,
  inline: true
}
