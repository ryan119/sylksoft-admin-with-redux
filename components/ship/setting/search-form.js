import Button from 'components/common/Button'
import FormWrapper from 'components/common/search/form-wrapper'
import SearchInput from 'components/common/search/input'
import SearchRadios from 'components/common/search/radios'
import SearchSelect from 'components/common/search/select'
import tof from 'components/common/tof.json'
import { resetParamCriteria, searchParams, setParamCriteria } from 'components/ship/action'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getParamTypes } from 'src/actions/common'

const SearchParamForm = () => {

  const dispatch = useDispatch()

  const { criteria, paramTypes } = useSelector((state) => {
    return {
      criteria: state.ship.get('paramCriteria')?.toJS(),
      paramTypes: state.common.get('paramTypes')?.toJS()
    }
  })

  useEffect(() => {
    dispatch(getParamTypes())
  }, [])


  const onChange = (event, name) => {
    console.log('event: ', event.target.value, name)
    dispatch(setParamCriteria(name, event.target.value))
  }

  const onSearch = (e) => {
    e.preventDefault()
    dispatch(setParamCriteria('page', 0))
    dispatch(searchParams())
  }

  const reset = () => {
    dispatch(resetParamCriteria())
    dispatch(searchParams())
  }

  return (
    <FormWrapper onSearch={onSearch} reset={reset} gridCols='grid-cols-5'>
        <SearchInput name='paramName' label='參數名稱' onChange={onChange} value={criteria?.paramName} />
        <SearchSelect name='type' label='參數類型' onChange={onChange} options={paramTypes} value={criteria?.type} />
        <SearchRadios name='enabled' label='Status' onChange={onChange} options={tof} value={criteria?.enabled} />
    </FormWrapper>
  )
}

export default SearchParamForm
