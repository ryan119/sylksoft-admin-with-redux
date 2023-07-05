import { useRouter } from 'next/router'
import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { resetPassword } from 'src/actions/member'
import Validation from 'src/components/forms/validation'
import Alert from 'src/components/alerts'

const ResetPassword = ({message = null}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { t } = router.query
  let items = [
    {
      label: 'New password',
      error: {
        required: 'New password is required',
        minLength: {
          value: 6,
          message: 'Your password should have at least 6 characters'
        },
      },
      name: 'new-password',
      type: 'password',
      placeholder: 'Enter your new password'
    },
    {
      label: 'Confirm new password',
      error: {
        required: 'Password confirmation is required',
        minLength: {
          value: 6,
          message: 'Your password should have at least 6 characters'
        },
      },
      name: 'confirm-new-password',
      type: 'password',
      placeholder: 'Enter your new password confirmation'
    },
  ]

  const onSubmit = (values) => {
    const postData = { password: values['new-password'], token: t}
    dispatch(resetPassword(postData, ()=> router.replace('/login')))
  }

  return (
    <>
      <div className="flex flex-col">
        <Validation items={items} onSubmit={onSubmit} />
      </div>
    </>
  )
}

export default ResetPassword
