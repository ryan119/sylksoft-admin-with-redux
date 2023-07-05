import { getSession, SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import Router, { useRouter, withRouter } from 'next/router'
import NProgress from 'nprogress'
import { Component } from 'react'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { WEB_HOST } from 'src/conf'
import 'src/css/animate.css'
import 'src/css/components/buttons.css'
import 'src/css/components/datepicker.css'
import 'src/css/components/dropdowns.css'
import 'src/css/components/forms.css'
import 'src/css/components/left-sidebar-1/styles-lg.css'
import 'src/css/components/left-sidebar-1/styles-sm.css'
import 'src/css/components/modals.css'
import 'src/css/components/navbar.css'
import 'src/css/components/nprogress.css'
import 'src/css/components/recharts.css'
import 'src/css/components/right-sidebar.css'
import 'src/css/components/sliders.css'
import 'src/css/components/steps.css'
import 'src/css/components/tables.css'
import 'src/css/components/tabs.css'
import 'src/css/components/user-widgets/widget-2.css'
import 'src/css/components/user-widgets/widget-4.css'
import 'src/css/layouts/layout-1.css'
import 'src/css/main.css'
import 'src/base-components/spinner/spinner.css'
import 'src/css/tailwind.css'

import Layout from 'src/layouts'
import { wrapper } from 'src/store/createStore'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const router = useRouter()
  //console.log('app session: ', props.pageProps?.session?.user)
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
      </Head>
      <Provider store={store}>
        <SessionProvider session={props.pageProps.session}>
        <Layout>
          <Component {...props} />
        </Layout>
        </SessionProvider>
      </Provider>
    </>
  )
}

App.getInitialProps = wrapper.getInitialAppProps(store => async (context) => {
  const { ctx, router } = context

  //console.log('isServer: ', !!ctx.req, typeof window === 'undefined', !['/login', '/500', '/reset-password', '/forgot-password'].includes(ctx.pathname))
  const redirectUrl = `${WEB_HOST}/login`


  if (!!ctx.req && !(['/login', '/500', '/reset-password', '/forgot-password'].includes(ctx.pathname))) {
    const session = await getSession(context)
    const authData = session?.user
    console.log('authData:', authData)
    const isExpire = !authData?.expireTime || new Date().getTime() >= new Date(authData?.expireTime).getTime()
    if (!authData || isExpire) {
      ctx.res.writeHead(302, {
        Location: redirectUrl,
        'Content-Type': 'text/html; charset=utf-8'
      })
      ctx.res.end()
    }

  }


  return {
    pageProps: {
      ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {}),
      pathname: ctx.pathname
      //session: session
    }
  }
})

export default withRouter(App)
