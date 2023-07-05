import Button from 'components/common/Button'
import { createCustomer } from 'components/customer/action'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { getRoles } from 'src/actions/common'
import { createUser } from 'src/actions/member'
import SectionTitle from 'src/components/section-title'
import Widget from 'src/components/widget'
import MemberForm from 'components/member/form'

const MemberCreate = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRoles())
  },[])

  const methods = useForm()
  const onSubmit = (values) => {
    const cb = () => { router.push('/system/admin/list') }
    dispatch(createUser(values, cb))
  }
  return (
    <>
      <SectionTitle title='' subtitle='新增使用者' />
      <Widget>
        <FormProvider {...methods}>
          <form>
            <MemberForm mode='add'/>
            <div className='flex items-center justify-center'>
              <Button color='primary' label='儲存' onClick={methods.handleSubmit(onSubmit)} />
              <Button color='gray' label='回列表' onClick={() => router.push('/system/admin/list')}/>
            </div>
          </form>
        </FormProvider>
      </Widget>
    </>
  )
}

export default MemberCreate
