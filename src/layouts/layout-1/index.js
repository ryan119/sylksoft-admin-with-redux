import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { ToastContainer, Zoom } from 'react-toastify'
import { getMenu } from 'src/actions/member'
import Spinner from 'src/base-components/spinner'
import { APP_TITLE } from 'src/conf'
import LeftSidebar1 from '../../../src/components/left-sidebar-1'
import Navbar1 from '../../../src/components/navbar-1'
import RightSidebar1 from '../../../src/components/right-sidebar-1'

const Layout1 = ({ children }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { config, palettes, loading } = useSelector((state) => {
    return {
      config: state.config.toJS(),
      palettes: state.palettes.toJS(),
      loading: state.common.get('loading'),
    }
  }, shallowEqual)

  const { layout, collapsed } = { ...config }
  let { background, navbar, leftSidebar, rightSidebar } = {
    ...palettes
  }

  const session = useSession()
  useEffect(() => {
    const roleIds = session?.data?.user?.roleIds
    if(roleIds) {
      dispatch(getMenu(roleIds))
    }
  }, [session])

  return (
    <>
      <ToastContainer
        transition={Zoom}
        position='top-center'
        autoClose={300}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        draggable
      />
      <Head>
        <title>{APP_TITLE}</title>
      </Head>
      <div
        data-layout={layout}
        data-collapsed={collapsed}
        data-background={background}
        data-navbar={navbar}
        data-left-sidebar={leftSidebar}
        data-right-sidebar={rightSidebar}
        className={`font-sans antialiased text-base disable-scrollbars ${background === 'dark' ? 'dark' : ''}`}
      >
        <RightSidebar1 />
        <div className='wrapper'>
          <LeftSidebar1 />
          <div className='main w-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white'>
            <Navbar1 />
            <div className='min-h-screen w-full p-4'>{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Layout1
