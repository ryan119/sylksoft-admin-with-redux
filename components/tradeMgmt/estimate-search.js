import Button from 'components/common/Button'
import FormWrapper from 'components/common/search/form-wrapper'
import { resetEstimateCriteria, searchEstimate, setEstimateCriteria } from 'components/tradeMgmt/action'
import CommonForm from 'components/tradeMgmt/common-params-form'
import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

const EstimateSearchForm = () => {
  const dispatch = useDispatch()
  const onChange = (event, name) => {
    dispatch(setEstimateCriteria(name, event.target.value))
  }

  const onSearch = (e) => {
    e.preventDefault()
    dispatch(setEstimateCriteria('page', 0))
    dispatch(searchEstimate())
  }

  const reset = () => {
    dispatch(resetEstimateCriteria())
    dispatch(searchEstimate())
  }

  const { criteria } = useSelector((state) => {
    return {
      criteria: state.tradeMgmt.get('estCriteria')?.toJS()
    }
  }, shallowEqual)

  return (
    <FormWrapper onSearch={onSearch} reset={reset} gridCols='grid-cols-4'>
      <CommonForm criteria={criteria} onChange={onChange} type='E' />
    </FormWrapper>
  )
}

export default EstimateSearchForm
