import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'

const Index = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    dispatch({
      type: 'SET_CONFIG',
      config: {
        layout: 'layout-1',
        collapsed: false,
        rightSidebar: false,
        backdrop: false
      }
    })
    dispatch({
      type: 'SET_PALETTE',
      palette: {
        background: 'dark',
        leftSidebar: 'dark',
        navbar: 'dark'
      }
    })
    window.scrollTo(0, 0)
    router.push('/')
  }, [dispatch, router])
  return <div />
}
export default Index
