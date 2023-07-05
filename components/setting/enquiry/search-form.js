import Button from 'components/common/Button'
import FormWrapper from 'components/common/search/form-wrapper'
import SearchInput from 'components/common/search/input'
import SearchRadios from 'components/common/search/radios'
import SearchSelect from 'components/common/search/select'
import tof from 'components/common/tof.json'
import { resetEnquiryCriteria, searchEnquiry, setEnquiryCriteria } from 'components/setting/action'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEnquiryParamTypes, getParamTypes } from 'src/actions/common'

const SearchEnquiryForm = () => {
  const dispatch = useDispatch()

  const { criteria, paramTypes } = useSelector((state) => {
    return {
      criteria: state.settingMgmt.get('eqyCriteria')?.toJS(),
      paramTypes: state.common.get('enquiryParamTypes')?.toJS()
    }
  })

  useEffect(() => {
    dispatch(getEnquiryParamTypes())
  }, [])


  const onChange = (event, name) => {
    console.log('event: ', event.target.value, name)
    dispatch(setEnquiryCriteria(name, event.target.value))
  }

  const onSearch = (e) => {
    e.preventDefault()
    dispatch(setEnquiryCriteria('page', 0))
    dispatch(searchEnquiry())
  }

  const reset = () => {
    dispatch(resetEnquiryCriteria())
    dispatch(searchEnquiry())
  }

  return (
    <FormWrapper onSearch={onSearch} reset={reset} gridCols='grid-cols-5'>
        <SearchInput name='paramName' label='參數名稱' onChange={onChange} value={criteria?.paramName} />
        <SearchSelect name='type' label='參數類型' onChange={onChange} options={paramTypes} value={criteria?.type} />
        <SearchRadios name='enabled' label='Status' onChange={onChange} options={tof} value={criteria?.enabled} />
    </FormWrapper>
  )
}

export default SearchEnquiryForm
