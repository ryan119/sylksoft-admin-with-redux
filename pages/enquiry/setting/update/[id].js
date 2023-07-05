import Button from 'components/common/Button'
import { getEnquiryInfo, removeInquiryData, updateEnquiry } from 'components/setting/action'
import EnquiryForm from 'components/setting/enquiry/enquiry-form'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Widget from 'src/base-components/role/widget'
import SectionTitle from 'src/components/section-title'

const UpdateEnquirySetting = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const methods = useForm()
  const enquiryId = router.query.id
  const enquiryInfo = useSelector(state => state.settingMgmt.get('enquiryInfo')?.toJS(), shallowEqual)

  const isMount = useRef(true)
  useEffect(() => {
    if (isMount.current === true) {
      dispatch(getEnquiryInfo(enquiryId))
    }
    return () => {
      dispatch(removeInquiryData())
      isMount.current = false
    }
  }, [])

  useEffect(() => {
    methods.reset({
      ...enquiryInfo,
      enabled: enquiryInfo?.enabled?.toString()
    })
  }, [enquiryInfo?.id])

  const onSubmit = (values) => {
    dispatch(updateEnquiry(values))
  }

  return (
    <>
      <SectionTitle title='' subtitle='修改船舶需求參數' />
      <Widget>
        <FormProvider {...methods}>
          <form>
            <EnquiryForm mode='update' />
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

export default UpdateEnquirySetting
