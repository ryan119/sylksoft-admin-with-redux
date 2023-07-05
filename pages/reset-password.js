import Link from 'next/link'
import ResetPassword from 'src/base-components/auth/reset-password'
import CenteredForm from 'src/layouts/centered-form'

const Index = () => {
  return (
    <CenteredForm
      title="重置密碼"
      subtitle="請輸入新密碼">

      <ResetPassword message="Thanks for your message. We'll get back to you as soon as possible" />

      <div className="flex flex-row w-full mt-3"/>
      <div className="flex flex-row w-full">
        <span>
          <Link href="/login">
            <a className="link">返回登入頁</a>
          </Link>
        </span>
      </div>
    </CenteredForm>
  )
}

export default Index
