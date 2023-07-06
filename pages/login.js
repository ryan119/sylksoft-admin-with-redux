import Link from 'next/link'
import Login from 'src/base-components/auth/login'
import Layout from 'src/layouts/centered'
import CenteredForm from 'src/layouts/centered-form/index2'

const Index = () => {
  return (
    <Layout>
      <CenteredForm
        title=''
        subtitle='後台管理系統'>
        <Login />
        <div className='w-full mt-3 mb-6'>
        </div>
        <div className='w-full'>
          <span>
            <Link href='/forgot-password'>
              <a className='link'>忘記密碼?</a>
            </Link>
          </span>
        </div>
      </CenteredForm>
    </Layout>
  )
}


Index.getInitialProps = async (ctx) => {
  console.log('ctx..... ', ctx)
  return { leftSide: 'Test' }
}

export default Index

