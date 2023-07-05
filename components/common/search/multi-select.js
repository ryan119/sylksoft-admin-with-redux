import React, { createElement, useState } from 'react'
import Select, { components } from 'react-select'


const ValueContainer = ({ children, ...props }) => {
  const { getValue, hasValue } = props
  const nbValues = getValue().length
  const transChild = []
  if (nbValues > 1) {
    const el = createElement('p', {}, `已選${nbValues}個`)
    transChild.push(el)
  } else {
    transChild.push(children[0])
  }
  transChild.push(children[1])

  if (!hasValue || nbValues === 1) {
    return (
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    )
  }
  return (
    <components.ValueContainer {...props}>
      {transChild}
    </components.ValueContainer>
  )
}

const InputOption = ({
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

const MultiSelect = ({ name, label, onChange, options = [], value=[], disabled }) => {
  //console.log('value: ', value)
  return (
    <div className={`form-element`}>
      <div className='form-label'>{label}</div>
      <Select
        value={value}
        isDisabled={disabled}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.id}
        isMulti
        autoFocus={true}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        options={options}
        components={{
          Option: InputOption,
          ValueContainer: ValueContainer
        }}
        onChange={onChange}
      />
    </div>


  )
}

export default MultiSelect
