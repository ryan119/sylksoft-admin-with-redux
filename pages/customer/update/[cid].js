import Button from 'components/common/Button'
import { getCustomer, removeCustomerData, updateCustomer } from 'components/customer/action'
import CustomerForm from 'components/customer/form/customer-form'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import SectionTitle from 'src/components/section-title'

const UpdateCustomer = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const methods = useForm()

  const customerId = router.query.cid
  const { customerInfo } = useSelector((state) => {
    return {
      customerInfo: state.customer.get('customerInfo')?.toJS()
    }
  }, shallowEqual)

  const isMount = useRef(true)
  useEffect(() => {
    if (isMount.current === true) {
      dispatch(getCustomer(customerId))
    }
    return () => {
      //console.log('remove: ', new Date().getTime())
      dispatch(removeCustomerData())
      isMount.current = false
    }
  }, [])

  useEffect(() => {
    methods.reset({
      ...customerInfo,
      status: customerInfo?.status?.toString()
    })
  }, [customerInfo?.id])

  const onSubmit = (values) => {
    dispatch(updateCustomer(values))
  }

  return (
    <>
    <SectionTitle title='' subtitle='修改客戶資料' />
    <div className='py-4 w-full bg-gray-50'>
      <FormProvider {...methods}>
        <form>
          <CustomerForm data={customerInfo} />
          <div className='flex justify-center mt-6'>
            <Button color='primary' label='儲存' onClick={methods.handleSubmit(onSubmit)} />
            <Button color='gray' label='回列表' onClick={() => router.push('/customer/list')} />
          </div>
        </form>
      </FormProvider>
    </div>
    </>
  )
}

export default UpdateCustomer
