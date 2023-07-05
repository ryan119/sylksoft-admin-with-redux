import Button from 'components/common/Button'
import { resetRptSPCriteria, searchRptSp, setRptSpCriteria } from 'components/report/action'
import { Chain, checkDate, checkOther } from 'components/report/helper'
import { defaultCriteria } from 'components/report/reducer'
import CommonSearchForm from 'components/report/search/common-search-form'
import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

const SpReportSearch = () => {
  const dispatch = useDispatch()
  const { criteria, spDataset } = useSelector((state) => {
    return {
      criteria: state.reportMgmt.get('spCrit')?.toJS(),
      spDataset: state.reportMgmt.get('spDataset')?.toJS()
    }
  }, shallowEqual)

  const onChange = (event, name) => {
    dispatch(setRptSpCriteria(name, event.target.value))
  }

  const reset = () => {
    let crit = null
    if (spDataset.length > 0) {
      crit = {
        dateStart: criteria.dateStart,
        dateEnd: criteria.dateEnd,
        frequency: criteria.frequency
      }
    } else {
      crit = { ...defaultCriteria }
    }

    dispatch(resetRptSPCriteria(crit))
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
    dispatch(searchRptSp())
    return 'next'
  }


  return (
    <form onSubmit={onSearch}>
    <div className='lg:grid grid-cols-4 gap-x-8 mb-4 text-base '>
      <CommonSearchForm criteria={criteria} onChange={onChange} type='SP' disabledX={spDataset.length > 0} />
      <div className='lg:flex text-center items-center lg:text-left'>
        <Button type='submit' label='查詢' color='primary' onClick={onSearch} />
        <Button label='清除' color='gray' onClick={reset} />
      </div>
    </div>
    </form>
  )
}

export default SpReportSearch
