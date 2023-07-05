import { useRouter } from 'next/router'
import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { forgotPassword } from 'src/actions/member'

import Validation from 'src/components/forms/validation'
import Alert from 'src/components/alerts'

const ForgotPassword = ({message = null}) => {
  //const [data, onSubmit] = useState(null)
  const router = useRouter()
  const dispatch = useDispatch()
  const onSubmit = (values) => {
    dispatch(forgotPassword(values, ()=> router.replace('/login')))
  }

  let items = [
    {
      label: 'Email',
      error: {required: '請輸入Email!'},
      name: 'email',
      type: 'email',
      placeholder: 'Enter you email'
    },
  ]
  return (
    <>
      <div className="flex flex-col">
        {/*{data && message && (
          <div className="w-full mb-4">
            <Alert
              color="bg-transparent border-green-500 text-green-500"
              borderLeft
              raised>
              {message}
            </Alert>
          </div>
        )}*/}
        <Validation items={items} onSubmit={onSubmit} submitLabel="送出" />
      </div>
    </>
  )
}

export default ForgotPassword
