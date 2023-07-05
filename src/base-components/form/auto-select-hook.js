/* eslint-disable no-use-before-define */
//import stylesForm from '/src/styles/scss/form.module.scss'
import autoStyles from '/src/styles/scss/use-autocomplete.module.scss'
import CloseIcon from '@material-ui/icons/Close'
import useAutocomplete from '@material-ui/lab/useAutocomplete'
import { find, get } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import Error from 'src/base-components/form/error'
import { OptionType1, OptionType2 } from './option-type'

const stylesForm = {}
//const autoStyles = {}
/**
 * 傳入陣列，沒有使用option key、value
 * 跟著 FormProvider 一起用
 * use-autocomplete.module.scss 主要樣式配合form.module.scss
 * @param props
 * @param callback, 選取後進行的動作
 * @returns {*}
 * @constructor
 */
const AutoSelectHook = (props) => {
  const {
    name,
    label,
    placeholder,
    options = [],
    valid,
    optionsKey,
    dataType,
    indexKey,
    defaultData,
    callback = null,
    required,
    display
  } = props
  //console.log('options: ', options)

  let idxKey = optionsKey[indexKey]
  const {
    control,
    register,
    setValue,
    trigger,
    watch,
    getValues,
    reset,
    formState: { errors }
  } = useFormContext()
  let defaultValue
  if (typeof defaultData === 'string') {
    defaultValue = find(options, c => c.id === defaultData)
  } else {
    defaultValue = defaultData
  }
  console.log('defaultValue: ', defaultValue)
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    getTagProps,
    value,
    setAnchorEl,
    focused
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    multiple: props.multiple,
    options: options,
    getOptionLabel: (option) => (dataType === 'object' ? option[idxKey] || '' : option || ''),
    getOptionSelected: (option, value) =>
      dataType === 'object' ? option[optionsKey.valueName] === value[optionsKey.valueName] : option === value,
    onChange: (e, data) => {
      setValue(props.name, data)
      trigger(name)
      //console.log('data', data, new Date().getDate())
      if (typeof callback === 'function') callback(data)
    },
    filterOptions: props?.onFilterOptions,
    defaultValue: defaultValue,
    onOpen: () => {
      if (typeof props.onOpen === 'function') {
        props.onOpen()
      }
    },
    onInputChange: props?.onInputChange
  })

  /* console.log('defaultData1: ', defaultData, 'value:', value)
   useEffect(() => {
     setValue(props.name, defaultData)
   }, [defaultData])*/

  const Tag = ({ label, onDelete, ...props }) => (
    <div {...props} className={autoStyles.inputTag}>
      <span>{label}</span>
      {props.readOnly ? undefined : <CloseIcon onClick={onDelete} />}
    </div>
  )

  return (
    <>
      <div className='lg:flex mb-4' {...getRootProps()}>
        <div className='w-32'>
          <div className='lg:w-full'>
            <div className={`form-element ${props.inline ? 'form-element-inline' : ''}`}>
              <div className='form-label'>{label}</div>
            </div>
          </div>
        </div>

        <div className={props.inputWidth ? props.inputWidth : 'lg:w-3/6'}>
          <div className='w-full'>
            <div className='form-element'>
              <div style={{ position: 'relative' }} className='w-full'>
                <div ref={setAnchorEl} className={`${autoStyles.inputWrapper}`} style={{ borderColor:'#6b7280'}}>
                  {props.multiple &&
                    value.map((option, index) => {
                      if (dataType === 'object') {
                        return (
                          <Tag
                            key={index}
                            label={option[idxKey]}
                            {...getTagProps({ index })}
                            readOnly={props.readonly}
                          />
                        )
                      } else {
                        return <Tag key={index} label={option} {...getTagProps({ index })} readOnly={props.readonly} />
                      }
                    })}
                  <input
                    style={{height:'34px'}}
                    className={get(errors, name) ? 'form-input form-input-invalid' : 'form-input'}
                    {...register(name, valid)}
                    {...getInputProps()}
                    readOnly={props.readonly} />
                </div>
                <Error errors={errors} name={name}/>
                {groupedOptions.length > 0 && !props.readonly ? (
                  <ul {...getListboxProps()} className={autoStyles.listBox}>
                    {groupedOptions.map((option, index) => (
                      <li key={index} {...getOptionProps({ option, index })}>
                        {dataType === 'object'
                          ? typeof props.getCustmerOptionType === 'function'
                            ? props.getCustmerOptionType({ option, index, getOptionProps, idxKey, optionsKey }) : (
                              <OptionType1
                                option={option}
                                index={index}
                                getOptionProps={getOptionProps}
                                idxKey={idxKey}
                                optionsKey={optionsKey} />
                            )
                          : (
                            <OptionType2
                              option={option}
                              index={index}
                              getOptionProps={getOptionProps}
                              optionsKey={optionsKey}
                            />
                          )}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

            </div>
            { get(errors, name) ? undefined : (<Help>{props.noteMsg}</Help>)}

          </div>
        </div>
      </div>
    </>
  )
}

AutoSelectHook.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  callback: PropTypes.func,
  /**
   * 1.當有指定寬度時，該element的寬度為指定寬度
   * 2.沒指時就只會follow lg:w-3/6, 這裡會因為若form 用sweetalert彈出時，
   *   tailwind 在判斷lg時，不會依據彈出modal 的寬度而定，造成頁面破版
   */
  inputWidth: PropTypes.string
}

AutoSelectHook.defaultProps = {
  multiple: true,
  placeholder: '',
  required: true,
  valid: { required: 'This filed is required' },
  optionsKey: { valueName: 'id', textName: 'label' },
  indexKey: 'valueName', //搜尋的形式
  dataType: 'string', //顯示的方式
  inline: true
}

const Help = props => <span className={autoStyles.help} {...props} />

export default AutoSelectHook
