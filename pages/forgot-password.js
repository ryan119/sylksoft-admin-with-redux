import Link from 'next/link'
import ForgotPassword from 'src/base-components/auth/forgot-password'
import CenteredForm from 'src/layouts/centered-form'


const Index = () => {
  return (
    <CenteredForm
      title="忘記密碼"
      subtitle="請輸入您的Email">
      <ForgotPassword message="感謝您提供的訊息，重設密碼連結將寄至您提供的Email信箱" />
      <div className="w-full mt-2">
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
