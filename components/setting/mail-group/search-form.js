import Button from 'components/common/Button'
import FormWrapper from 'components/common/search/form-wrapper'
import SearchInput from 'components/common/search/input'
import SearchRadios from 'components/common/search/radios'
import SearchSelect from 'components/common/search/select'
import tof from 'components/common/tof.json'
import { resetGrpCriteria, searchMailGroup, setGrpCriteria } from 'components/setting/action'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMgUser, getParamTypes } from 'src/actions/common'

const MailGroupSearchForm = () => {
  const dispatch = useDispatch()

  const { criteria, mgUsers } = useSelector((state) => {
    return {
      criteria: state.settingMgmt.get('grpCriteria')?.toJS(),
      mgUsers: state.common.get('mgUsers')?.toJS()
    }
  })

  useEffect(() => {
    dispatch(getMgUser())
  }, [])


  const onChange = (event, name) => {
    //console.log('event: ', event.target.value, name)
    dispatch(setGrpCriteria(name, event.target.value))
  }

  const onSearch = (e) => {
    e.preventDefault()
    dispatch(setGrpCriteria('page', 0))
    dispatch(searchMailGroup())
  }

  const reset = () => {
    dispatch(resetGrpCriteria())
    dispatch(searchMailGroup())
  }

  return (
    <FormWrapper onSearch={onSearch} reset={reset} gridCols='grid-cols-5'>
        <SearchInput name='name' label='群組名稱' onChange={onChange} value={criteria?.name} />
        <SearchSelect name='ownerId' label='系統使用者' onChange={onChange} options={mgUsers ?? []} value={criteria?.ownerId} />
        <SearchRadios name='enabled' label='Status' onChange={onChange} options={tof} value={criteria?.enabled} />
    </FormWrapper>
  )
}

export default MailGroupSearchForm
