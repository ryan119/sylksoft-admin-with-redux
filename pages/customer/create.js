import Button from 'components/common/Button'
import { createCustomer } from 'components/customer/action'
import CustomerForm from 'components/customer/form/customer-form'
import ProfileForm from 'components/ship/profile/profileForm'
import { useRouter } from 'next/router'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Widget from 'src/base-components/role/widget'
import SectionTitle from 'src/components/section-title'
const CreateCustomer = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const methods = useForm()

  const onSubmit = (values) => {
    const cb = () => { router.push('/customer/list') }
    dispatch(createCustomer(values, cb))
  }

  return (
    <>
      <SectionTitle title='' subtitle='新增客戶資料' />
      <Widget>
        <FormProvider {...methods}>
          <form>
            <CustomerForm mode='add'/>
            <div className='flex justify-center mt-6'>
              <Button color='primary' label='儲存' onClick={methods.handleSubmit(onSubmit)} />
              <Button color='gray' label='回列表' onClick={() => router.push('/customer/list')}/>
            </div>
          </form>
        </FormProvider>
      </Widget>
    </>
  )
}

export default CreateCustomer
