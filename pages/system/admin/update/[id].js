import Button from 'components/common/Button'
import ResetPasswordModal from 'components/member/reset-password-modal'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getRoles } from 'src/actions/common'
import { createUser, getUserInfo, removeUserData, updateUser } from 'src/actions/member'
import Modal from 'src/base-components/modal/index2'
import SectionTitle from 'src/components/section-title'
import Widget from 'src/components/widget'
import MemberForm from 'components/member/form'

const MemberUpdate = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const methods = useForm()
  const [showModal, setShowModal] = useState(false)

  const userId = router.query.id
  useEffect(() => {
    dispatch(getRoles())
    dispatch(getUserInfo(userId))
    return () => {
      dispatch(removeUserData())
    }
  },[])

  const userInfo = useSelector(state => state.member.get('userInfo')?.toJS(),shallowEqual)
  useEffect(() => {
    methods.reset({
      ...userInfo,
      enabled: userInfo?.enabled.toString(),
    })
  },[userId, userInfo?.userId])
  const onSubmit = (values) => {
    //const cb = () => { router.push('/system/admin/list') }
    dispatch(updateUser(values))
  }


  const show = () => { setShowModal(true) }
  const hide = () => { setShowModal(false)}

  return (
    <>
      <SectionTitle title='' subtitle='修改使用者' />
      <Widget>
        <FormProvider {...methods}>
          <form>
            <MemberForm mode='edit'/>
            <div className='flex items-center justify-center'>
              <Button color='primary' label='儲存' onClick={methods.handleSubmit(onSubmit)} />
              <Button color='gray' label='回列表' onClick={() => router.push('/system/admin/list')}/>
              <Button color='primary' label='重設密碼' onClick={show}/>
            </div>
          </form>
        </FormProvider>
        <Modal
          width='w-3/5'
          body={(<ResetPasswordModal onCancel={hide} userId={userInfo?.userId}/>)}
          setOpen={setShowModal}
          title='重設密碼'
          open={showModal}
          withFooter={false}
        />

      </Widget>
    </>
  )
}

export default MemberUpdate
