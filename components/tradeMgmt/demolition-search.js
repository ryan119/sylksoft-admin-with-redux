import FormWrapper from 'components/common/search/form-wrapper'
import {
  resetDemoCriteria,
  searchDemolition,
  setDemoCriteria,
} from 'components/tradeMgmt/action'
import CommonForm from 'components/tradeMgmt/common-params-form'
import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

function DemolitionSearch(props) {
  const dispatch = useDispatch()
  const onChange = (event, name) => {
    dispatch(setDemoCriteria(name, event.target.value))
  }
  const onCheckboxChange = (event, name) => {
    dispatch(setDemoCriteria(name, event.target.checked))
  }

  const onSearch = (e) => {
    e.preventDefault()
    dispatch(setDemoCriteria('page', 0))
    dispatch(searchDemolition())
  }

  const reset = () => {
    dispatch(resetDemoCriteria())
    dispatch(searchDemolition())
  }

  const { criteria } = useSelector((state) => {
    return {
      criteria: state.tradeMgmt.get('demoCrit')?.toJS()
    }
  }, shallowEqual)

  return (
    <FormWrapper onSearch={onSearch} reset={reset} gridCols='grid-cols-4'>
      <CommonForm
        criteria={criteria}
        onChange={onChange}
        type='T' />
    </FormWrapper>
  )
}

export default DemolitionSearch