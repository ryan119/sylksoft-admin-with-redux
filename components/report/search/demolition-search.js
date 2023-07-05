import Button from 'components/common/Button'
import FormWrapper from 'components/common/search/form-wrapper'
import { resetRptDemolitionCriteria, searchRptDemolition, setRptDemolitionCriteria } from 'components/report/action'
import { defaultCriteria } from 'components/report/reducer'
import CommonSearchForm from 'components/report/search/common-search-form'
import { Chain, checkDate, checkOther } from 'components/report/helper'
import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

const DemolitionSearch = () => {
  const dispatch = useDispatch()
  const { criteria, datasets } = useSelector((state) => {
    return {
      criteria: state.reportMgmt.get('demolitionCrit')?.toJS(),
      datasets: state.reportMgmt.get('demolitionDataset')?.toJS()
    }
  }, shallowEqual)

  const onChange = (event, name) => {
    dispatch(setRptDemolitionCriteria(name, event.target.value))
  }

  const reset = () => {
    let crit = null
    if (datasets.length > 0) {
      crit = {
        dateStart: criteria.dateStart,
        dateEnd: criteria.dateEnd,
        frequency: criteria.frequency
      }
    } else {
      crit = { ...defaultCriteria }
    }

    dispatch(resetRptDemolitionCriteria(crit))
  }

  const onSearch = (e) => {
    e.preventDefault()
    valid()
  }

  const valid = () => {
    const chains = [new Chain(checkDate), new Chain(checkOther), new Chain(excSearch)]
    chains[0].setNext(chains[1])
    chains[1].setNext(chains[2])
    return chains[0].passRequest(criteria)
  }

  const excSearch = function() {
    dispatch(searchRptDemolition())
    return 'next'
  }


  return (
    <FormWrapper onSearch={onSearch} reset={reset} gridCols='grid-cols-4'>
      <CommonSearchForm criteria={criteria} onChange={onChange} type='D' disabledX={datasets.length > 0} />
    </FormWrapper>
  )
}

export default DemolitionSearch
