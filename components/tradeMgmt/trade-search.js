import Button from 'components/common/Button'
import FormWrapper from 'components/common/search/form-wrapper'
import { resetTradeCriteria, searchTrade, setTradeCriteria } from 'components/tradeMgmt/action'
import CommonForm from 'components/tradeMgmt/common-params-form'
import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

const TradeSearchForm = () => {
  const dispatch = useDispatch()
  const onChange = (event, name) => {
    dispatch(setTradeCriteria(name, event.target.value))
  }
  const onCheckboxChange = (event, name) => {
    dispatch(setTradeCriteria(name, event.target.checked))
  }

  const onSearch = (e) => {
    e.preventDefault()
    dispatch(setTradeCriteria('page', 0))
    dispatch(searchTrade())
  }

  const reset = () => {
    dispatch(resetTradeCriteria())
    dispatch(searchTrade())
  }

  const { criteria } = useSelector((state) => {
    return {
      criteria: state.tradeMgmt.get('traCriteria')?.toJS()
    }
  }, shallowEqual)

  return (
    <FormWrapper onSearch={onSearch} reset={reset} gridCols='grid-cols-4'>
      <CommonForm
        criteria={criteria}
        onChange={onChange}
        onCheckboxChange={onCheckboxChange}
        type='T' />
    </FormWrapper>
  )
}

export default TradeSearchForm
