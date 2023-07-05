import Button from 'components/common/Button'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import * as actions from 'src/actions/actionTypes'
import { createUser, updatePasswordBySelf } from 'src/actions/member'
import { TextInput } from 'src/base-components/form/text-input'
import SectionTitle from 'src/components/section-title'
import Widget from 'src/components/widget'
import { passwordValid, confirmPwValid } from 'components/member/passwd-rules'

const webUrl = process.env.NEXT_PUBLIC_APP_URL
const ChangePassword = ({inline=true}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const methods = useForm()

  const onSubmit = (values) => {

    const cb = () => {
      signOut({
        callbackUrl: `${webUrl}/login`,
        redirect: false
      }).then((props) => {
        dispatch({ type: actions.GET_MENU, payload: undefined})
        router.replace('/login')
      })
    }
    dispatch(updatePasswordBySelf(values, cb))
  }

  return (
    <>
      <SectionTitle title='' subtitle='變更密碼' />
      <Widget>
        <FormProvider {...methods}>
          <form>
            <TextInput name='userId' label='管理員帳號' placeholder='' inline={true} inputWidth='lg:w-3/6' autoComplete=""/>
            <TextInput type='password' name='oldPassword' label='輸入舊密碼' placeholder='請輸入至少6位' inline={true} inputWidth='lg:w-3/6' autoComplete="" valid={passwordValid}/>
            <TextInput type='password' name='newPassword' label='輸入新密碼' placeholder='請輸入至少6位' inline={true} inputWidth='lg:w-3/6' autoComplete="" valid={passwordValid}/>
            <TextInput type='password' name='confirmPassword' label='確認新密碼' placeholder='請輸入至少6位' inline={true} inputWidth='lg:w-3/6' autoComplete="" valid={confirmPwValid}/>
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

export default ChangePassword
