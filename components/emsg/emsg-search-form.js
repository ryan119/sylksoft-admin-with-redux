import Button from 'components/common/Button'
import SearchCheckboxes from 'components/common/search/checkboxes'
import FormWrapper from 'components/common/search/form-wrapper'
import SearchInput from 'components/common/search/input'
import { resetEmsgCriteria, searchEmsg, setEmsgCriteria } from 'components/emsg/action'
import { dropRight } from 'lodash'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const EmsgSearchForm = () => {
  const dispatch = useDispatch()

  const { criteria, matchStatuses } = useSelector((state) => {
    return {
      criteria: state.emsgMgmt.get('criteria')?.toJS(),
      matchStatuses: state.common.get('matchStatuses')?.toJS()
    }
  })

  const onChange = (event, name) => {
    //console.log('event: ', event, name)
    dispatch(setEmsgCriteria(name, event.target.value))
  }

  const onCheckboxChange = (name, value) => {
    dispatch(setEmsgCriteria(name, value))
  }

  const onSearch = (e) => {
    e.preventDefault()
    dispatch(setEmsgCriteria('page', 0))
    dispatch(searchEmsg())
  }

  const reset = () => {
    dispatch(resetEmsgCriteria())
    dispatch(searchEmsg())
  }

  return (
    <FormWrapper onSearch={onSearch} reset={reset} gridCols='grid-cols-4'>
      <SearchInput name='subject' label='主旨' onChange={onChange} value={criteria?.subject} />
      <SearchInput name='content' label='電文內容' onChange={onChange} value={criteria?.content} />
      <SearchInput name='vesselName' label='船舶名稱' onChange={onChange} value={criteria?.vesselName} />
      <SearchCheckboxes name='matchStatuses' label='配對結果' onChange={onCheckboxChange} options={dropRight(matchStatuses)} values={criteria?.matchStatuses}>
        <div className='inline-flex items-center space-x-2'>
          <input
            id={`hasAttachment`}
            type='checkbox'
            value='true'
            name='hasAttachment'
            className='form-checkbox text-blue-500 h-4 w-4'
            onChange={(e) => onCheckboxChange('hasAttachment', e.target.checked)}
            checked={criteria?.hasAttachment === true}
          />
          <span>有附件</span>
        </div>
      </SearchCheckboxes>
      <SearchInput name='senderOrReceiver' label='寄/收件者' onChange={onChange} value={criteria?.senderOrReceiver} />
      <div className={`form-element`}>
        <div className='form-label'>收件日期</div>
        <div className={`form-element form-element-inline`}>
          <input
            name='yearStart'
            type='date'
            className='form-input w-full'
            placeholder=''
            onChange={(e) => onChange(e, 'yearStart')}
            value={criteria?.yearStart ?? ''}
          />
          <b>~</b>
          <input
            name='yearEnd'
            type='date'
            className='form-input w-full'
            placeholder=''
            onChange={(e) => onChange(e, 'yearEnd')}
            value={criteria?.yearEnd ?? ''}
          />
        </div>
      </div>
    </FormWrapper>
  )
}

export default EmsgSearchForm
