import { omit } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { get, useFormContext } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import FormTitle from 'src/base-components/form/common/form-title'
import Error from 'src/base-components/form/error'

const NumberTextFormat = (
  {
    name,
    type,
    label,
    required,
    valid,
    readonly,
    placeholder,
    inline,
    inputWidth,
    labelWidth = 'w-32',
    children,
    decimalScale=2,
    ...props
  }
) => {
  const { register, setValue,watch, getValues, formState: { errors } } = useFormContext()
  valid = (required && !props.disabled) ? valid : omit(valid, ['required'])
  return (
    <>
      {inline ? (
        <div className='lg:flex lg:flex-1'>
          <FormTitle label={label} inline={inline} width={labelWidth} required={required}/>
          <div className={inputWidth ? inputWidth : 'lg:w-3/6'}>
            <div className='flex-1'>
              <div className='form-element'>
                <NumericFormat
                  className={`${get(errors, name) ? 'form-input form-element-inline ' : 'form-input'} disabled:bg-gray-100`}
                  name={name}
                  value={getValues(name)}
                  onValueChange={(values) => {
                    setValue(name, values.value)
                  }}
                  thousandSeparator={true}
                  valueIsNumericString={true}
                  decimalScale={decimalScale}
                  {...props}
                  {...register(name, valid)}
                />
                <Error errors={errors} name={name} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`form-element`}>
          <div className='form-element flex'>
            <div className={`flex-1 form-label ${required ? 'required' : ''}`}>{label}</div>
          </div>
          <div className='inline-flex items-center space-x-2'>
            <NumericFormat
              className={`${get(errors, name) ? 'form-input form-element-inline ' : 'form-input'} disabled:bg-gray-100`}
              name={name}
              value={getValues(name)}
              onValueChange={(values) => {
                setValue(name, values.value)
              }}
              thousandSeparator={true}
              valueIsNumericString={true}
              decimalScale={decimalScale}
              {...props}
            />
            {children}
          </div>
          <Error errors={errors} name={name} />

        </div>
      )}

    </>
  )
}

NumberTextFormat.propTypes = {
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

NumberTextFormat.defaultProps = {
  type: 'text',
  required: true,
  valid: { required: 'This field is required' },
  placeholder: '',
  readonly: false,
  inline: false,
  children: undefined
}

export { NumberTextFormat }
