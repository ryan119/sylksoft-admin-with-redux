import { useEffect, useRef } from 'react'
import Button from 'components/common/Button'
import { getMailGroupInfo, removeMailGroupData, updateMailGroup } from 'components/setting/action'
import MailGroupForm from 'components/setting/mail-group/mail-group-form'
import { useRouter } from 'next/router'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Widget from 'src/base-components/role/widget'
import SectionTitle from 'src/components/section-title'

const UpdateMailGroup = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const methods = useForm()
  const gId = router.query.id
  const mailGroupInfo = useSelector(state => state.settingMgmt.get('mailGroupInfo')?.toJS(), shallowEqual)

  const isMount = useRef(true)
  useEffect(() => {
    if (isMount.current === true) {
      dispatch(getMailGroupInfo(gId))
    }
    return () => {
      dispatch(removeMailGroupData())
      isMount.current = false
    }
  }, [])

  useEffect(() => {
    methods.reset({
      ...mailGroupInfo,
      enabled: mailGroupInfo?.enabled?.toString()
    })
  }, [mailGroupInfo?.id])

  const onSubmit = (values) => {
    dispatch(updateMailGroup(values))
  }
  return (
    <>
      <SectionTitle title='' subtitle='編輯收件群組' />
      <Widget>
        <FormProvider {...methods}>
          <form>
            <MailGroupForm mode='add' />
            <div className='flex justify-center mt-6'>
              <Button color='primary' label='儲存' onClick={methods.handleSubmit(onSubmit)} />
              <Button color='gray' label='回列表' onClick={() => router.push('/mail/group/list')} />
            </div>
          </form>
        </FormProvider>
      </Widget>
    </>
  )

}

export default UpdateMailGroup
