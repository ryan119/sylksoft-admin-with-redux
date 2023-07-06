import Button from 'components/common/Button'
import FormWrapper from 'components/common/search/form-wrapper'
import SearchInput from 'components/common/search/input'
import SearchRadios from 'components/common/search/radios'
import SearchSelect from 'components/common/search/select'
import tof from 'components/common/tof.json'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetUserCriteria, searchUser, setUserCriteria } from 'src/actions/member'

function UserSearchForm(props) {
  const dispatch = useDispatch()

  const { criteria } = useSelector((state) => {
    return {
      criteria: state.member.get('criteria')?.toJS()
    }
  })

  const onChange = (event, name) => {
    console.log('event: ', event.target.value, name)
    dispatch(setUserCriteria(name, event.target.value))
  }

  const onSearch = (e) => {
    e.preventDefault()
    dispatch(setUserCriteria('page', 0))
    dispatch(searchUser())
  }

  const reset = () => {
    dispatch(resetUserCriteria())
    dispatch(searchUser())
  }

  return (
    <>
    <FormWrapper onSearch={onSearch} reset={reset} gridCols='grid-cols-5'>
        <SearchInput name='userId' label='管理員帳號' onChange={onChange} value={criteria?.userId} />
        <SearchInput name='name' label='姓名' onChange={onChange} value={criteria?.name} />
        <SearchRadios name='enabled' label='Status' onChange={onChange} options={tof} value={criteria?.enabled} />
    </FormWrapper>
    </>
  )
}

export default UserSearchForm