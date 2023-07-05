import {omit} from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { get, useFormContext } from 'react-hook-form'
import FormTitle from 'src/base-components/form/common/form-title'
import Error from 'src/base-components/form/error'


const Select = ({name, label, options = [], optionsKey, required, rule, defaultOption, inline=true, inputWidth, labelWidth='w-32', ...props}) => {
  const {register, getValues, formState: {errors}} = useFormContext()
  const {textName, valueName} = optionsKey
  rule = required && !props.disabled ? rule : omit(rule, ['required'])
  return (
    <>
      {inline ? (
        <div className='lg:flex lg:flex-1'>
          <FormTitle label={label} inline={inline} width={labelWidth} required={required} />
          <div className={inputWidth ? inputWidth : 'lg:w-3/6'}>
            <div className='w-full'>
              <div className='form-element relative'>
                <select
                  className={`${get(errors, name) ? 'form-select form-select-invalid' : 'form-select'} disabled:bg-gray-100`}
                  name={name}
                  {...register(name, rule)}
                  {...props}
                >
                  <option value='' disabled={props.readonly}>
                    {defaultOption}
                  </option>
                  {options.map((option, idx) => (
                    <option
                      key={idx}
                      disabled={props.readonly}
                      value={option[valueName]}
                    >
                      {option[textName]}
                    </option>
                  ))}
                </select>
                <Error errors={errors} name={name}/>
              </div>
            </div>
          </div>
        </div>
      ): (
        <div className={`form-element`}>
          <div className='form-element flex'>
            <div className={`flex-1 form-label ${required ? 'required' : ''}`}>{label}</div>
          </div>
          <select
            className={`${get(errors, name) ? 'form-select form-select-invalid' : 'form-select'} disabled:bg-gray-100`}
            name={name}
            {...register(name, rule)}
            {...props}
          >
            <option value='' disabled={props.readonly}>
              {defaultOption}
            </option>
            {options.map((option, idx) => (
              <option
                key={idx}
                disabled={props.readonly}
                value={option[valueName]}
              >
                {option[textName]}
              </option>
            ))}
          </select>
          <Error errors={errors} name={name}/>
        </div>
      )}
    </>

  )
}


Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  /**
   * 1.當有指定寬度時，該element的寬度為指定寬度
   * 2.沒指時就只會follow lg:w-3/6, 這裡會因為若form 用sweetalert彈出時，
   *   tailwind 在判斷lg時，不會依據彈出modal 的寬度而定，造成頁面破版
   */
  inputWidth: PropTypes.string
}

Select.defaultProps = {
  required: true,
  rule: {required: 'This field is required'},
  defaultOption: 'Please Select',
  optionsKey: {valueName: 'id', textName: 'label'},
  inline: false,
  inputWidth:null,
  options: []
}

export default Select
