import { omit } from 'lodash'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import Select, { components } from 'react-select'
import Error from 'src/base-components/form/error'

export const InputOption = ({
                              getStyles,
                              Icon,
                              isDisabled,
                              isFocused,
                              isSelected,
                              children,
                              innerProps,
                              ...rest
                            }) => {
  const [isActive, setIsActive] = useState(false)
  const onMouseDown = () => setIsActive(true)
  const onMouseUp = () => setIsActive(false)
  const onMouseLeave = () => setIsActive(false)

  // styles
  let bg = 'transparent'
  if (isFocused) bg = '#eee'
  if (isActive) bg = '#B2D4FF'

  const style = {
    alignItems: 'center',
    backgroundColor: bg,
    color: 'inherit',
    display: 'flex '
  }
  console.log('rest:', rest)
  console.log('children: ', children)
  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style
  }

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <input type='checkbox' checked={isSelected} onChange={() => {
      }} />
      <p className='px-2'>{children}</p>
    </components.Option>
  )
}

const MutiSelect = ({
                      name,
                      label,
                      options = [],
                      optionsKey,
                      required,
                      rule,
                      defaultOption,
                      inline,
                      inputWidth = 'w-full',
                      labelWidth = 'w-32',
                      gapY = '',
                      ...props
                    }) => {
  const { register, control, getValues, setValue, formState: { errors } } = useFormContext()
  const { textName, valueName } = optionsKey
  rule = required && !props.disabled ? rule : omit(rule, ['required'])
  //console.log('getValues: ', getValues(name))
  return (
    <>
      <div className={`${inline ? 'lg:flex lg:flex-1' : ''} ${gapY}`}>
        <div className={`${inline ? `flex-none ${labelWidth}` : 'flex'}`}>
          <div className='flex-1 form-label'>{label}</div>
        </div>
        <div className={inputWidth}>
          <div className='w-full'>
            <div className='form-element'>
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <Select
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.id}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    options={options}
                    components={{
                      Option: InputOption
                    }}
                    {...field}
                  />
                )}
              />

              <Error errors={errors} name={name} />
            </div>
          </div>
        </div>
      </div>
    </>

  )
}


MutiSelect.propTypes = {
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

MutiSelect.defaultProps = {
  required: true,
  rule: { required: 'This field is required' },
  defaultOption: 'Please Select',
  optionsKey: { valueName: 'id', textName: 'label' },
  inline: false,
  options: []
}

export default MutiSelect
