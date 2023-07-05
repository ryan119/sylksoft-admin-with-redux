import CheckIcon from '@material-ui/icons/Check'
import { filter } from 'lodash'
import React from 'react'

const OptionType1 = ({getOptionProps, option, optionsKey, index, idxKey}) => {
  return (
    <>
      {idxKey === optionsKey.valueName ? (
        <>
          <span style={{minWidth:'40%'}}>{option[optionsKey.valueName]} </span>
          <span style={{minWidth: '60%'}}>({option[optionsKey.textName]})</span>
        </>
      ) : (
        <>
          <span style={{width: '70%'}}>{option[optionsKey.textName]} </span>
          <span style={{width: '30%'}}>({option[optionsKey.valueName]})</span>
        </>
      )}
      <CheckIcon fontSize="small"/>
    </>
  )
}

const OptionType2 = ({getOptionProps, option, optionsKey, index}) => {
  return (
    <>
      <span>{option}</span>
      <CheckIcon fontSize="small"/>
    </>
  )
}

const StaffOptionType = ({getOptionProps, option, optionsKey, index, idxKey}) => {
  return (
    <>
      {idxKey === optionsKey.valueName ? (
        <><span style={{width: '30%'}}>{option[optionsKey.valueName]} </span>
          <span style={{width: '70%'}}>({option[optionsKey.textName]})</span></>
      ) : (
        <>
          <span style={{width: '20%'}}>{option[optionsKey.textName]} </span>
          <span style={{width: '35%'}}>{option.englishName} </span>
          <span style={{width: '10%'}}>({option.enabled === true ? 'enabled': 'disabled'})</span>
        </>
      )}
      <CheckIcon fontSize="small"/>
    </>
  )
}


const getStaffOptionType= ({option, index, getOptionProps, idxKey, optionsKey}) => {
  return (
    <StaffOptionType
      option={option}
      index={index}
      getOptionProps={getOptionProps}
      idxKey={idxKey}
      optionsKey={optionsKey}
    />
  )
}

const staffFilterOptions= (options, state) => {
  const newOptions = filter(options, o => {
    return o.name.indexOf(state.inputValue) >　-1 || o.englishName.indexOf(state.inputValue) > -1
  })
  return newOptions
}



export { OptionType1, OptionType2, getStaffOptionType, staffFilterOptions }
