import Button from 'components/common/Button'
import FormWrapper from 'components/common/search/form-wrapper'
import { resetRptEvCriteria, searchRptEv, setRptEvCriteria } from 'components/report/action'
import { Chain, checkDate, checkOther } from 'components/report/helper'
import { defaultCriteria } from 'components/report/reducer'
import CommonSearchForm from 'components/report/search/common-search-form'
import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

const EvReportSearch = () => {
  const dispatch = useDispatch()
  const { criteria, datasets } = useSelector((state) => {
    return {
      criteria: state.reportMgmt.get('evCrit')?.toJS(),
      datasets: state.reportMgmt.get('evDataset')?.toJS()
    }
  }, shallowEqual)

  const onChange = (event, name) => {
    dispatch(setRptEvCriteria(name, event.target.value))
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

    dispatch(resetRptEvCriteria(crit))
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
    dispatch(searchRptEv())
    return 'next'
  }


  return (
    <FormWrapper onSearch={onSearch} reset={reset} gridCols='grid-cols-4'>
      <CommonSearchForm criteria={criteria} onChange={onChange} type='EV' disabledX={datasets.length > 0} />
    </FormWrapper>
  )
}

export default EvReportSearch
