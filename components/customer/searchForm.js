import Button from 'components/common/Button'
import FormWrapper from 'components/common/search/form-wrapper'
import SearchInput from 'components/common/search/input'
import SearchRadios from 'components/common/search/radios'
import { resetCustomerCriteria, searchCustomer, setCustomerCriteria } from 'components/customer/action'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tof from '/components/common/tof.json'

const SearchCustomerForm = () => {
  const dispatch = useDispatch()

  const { criteria } = useSelector((state) => {
    return {
      criteria: state.customer.get('criteria')?.toJS()
    }
  })

  const onChange = (event, name) => {
    dispatch(setCustomerCriteria(name, event.target.value))
  }

  const onSearch = (e) => {
    e.preventDefault()
    dispatch(setCustomerCriteria('page', 0))
    dispatch(searchCustomer())
  }

  const reset = () => {
    dispatch(resetCustomerCriteria())
    dispatch(searchCustomer())
  }

  return (
      <FormWrapper onSearch={onSearch} reset={reset} gridCols='grid-cols-3'>
        <SearchInput name='country' label='Country' onChange={onChange} value={criteria?.country} />
        <SearchInput name='company' label='Company' onChange={onChange} value={criteria?.company} />
        <SearchInput name='name' label='Name' onChange={onChange} value={criteria?.name} />
        <SearchInput name='email' label='Email' onChange={onChange} value={criteria?.email} />
        <SearchRadios name='status' label='Status' onChange={onChange} options={tof} value={criteria?.status} />
      </FormWrapper>
  )
}

export default SearchCustomerForm
