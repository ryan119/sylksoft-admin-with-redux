import {signIn} from 'next-auth/react'
import React, {useState} from 'react'
import {useRouter} from 'next/router'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import Validation from '../forms/validation'
import Alert from '../alerts'
import axios from "axios";
import {setAuthData} from "../../actions/member";
import { toast } from 'react-toastify'

const Login = (props) => {
    const webUrl = process.env.NEXT_PUBLIC_APP_URL
    const dispatch = useDispatch()
    const router = useRouter()

    const [data, setData] = useState(null)
//    const [message, setMessage] = useState(msg && msg.msg === 'autherror'? '請重新登入' : null)

    //const {authData} = useSelector(state => state.member.authData)
    const message = props.message;

    const onSubmit = data => {
        console.log('data: ', data)
        const credential = { ...data, authType:"passwd"}
        signIn('credentials', {
            ...credential,
            callbackUrl: `${webUrl}/`,
            redirect: false,
        }).then(({ ok }) => {
            if(ok) {
                router.push('/')
            }else {
                toast.error('帳密錯誤，請重新登入')
            }
        })
    }

    let items = [
        {
            label: '帳號',
            error: {required: '請輸入正確帳號'},
            name: 'identity',
            type: 'text',
            placeholder: '請輸入帳號'
        },
        {
            label: '密碼',
            error: {
                required: '請輸入密碼',
                minLength: {
                    value: 4,
                    message: '密碼長度不得低於4'
                },
                maxLength: {
                    value: 8,
                    message: '密碼長度不得高於8'
                }
            },
            name: 'password',
            type: 'password',
            placeholder: '請輸入密碼'
        },
    ]
    return (
        <>

            <div className="flex flex-col">
                {message && (
                    <div className="w-full mb-4">
                        <Alert
                            color="bg-transparent border-green-500 text-green-500"
                            borderLeft
                            raised>
                            {message}
                        </Alert>
                    </div>
                )}
                <Validation items={items} onSubmit={onSubmit}/>
            </div>
        </>
    )
}

export default Login
