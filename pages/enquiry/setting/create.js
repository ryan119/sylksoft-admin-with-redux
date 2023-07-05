import Button from 'components/common/Button'
import { createEnquiry } from 'components/setting/action'
import EnquiryForm from 'components/setting/enquiry/enquiry-form'
import { useRouter } from 'next/router'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Widget from 'src/base-components/role/widget'
import SectionTitle from 'src/components/section-title'

const CreateEnquirySetting = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const methods = useForm()

  const onSubmit = (values) => {
    const cb = () => {
      router.push('/enquiry/setting/list')
    }
    dispatch(createEnquiry(values, cb))
  }

  return (
    <>
      <SectionTitle title='' subtitle='新增船舶需求參數' />
      <Widget>
        <FormProvider {...methods}>
          <form>
            <EnquiryForm mode='add'/>
            <div className='flex justify-center mt-6'>
              <Button color='primary' label='儲存' onClick={methods.handleSubmit(onSubmit)} />
              <Button color='gray' label='回列表' onClick={() => router.push('/enquiry/setting/list')} />
            </div>
          </form>
        </FormProvider>
      </Widget>
    </>
  )
}

export default CreateEnquirySetting
